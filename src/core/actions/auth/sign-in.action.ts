"use server";

import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { env } from "@/core/config/env.config";
import { db } from "@/core/database/drizzle";
import { authTokenTable, userTable } from "@/core/database/drizzle/schemas";
import {
	type SignInSchemaValues,
	signInSchema,
} from "@/core/schemas/auth/sign-in.schema";
import {
	type ApiResponse,
	ResponseMapper,
} from "@/core/schemas/default.mappers";

interface SignInResponse {
	role: "manager" | "customer";
	token: string;
}

export async function signInAction(
	data: SignInSchemaValues,
): Promise<ApiResponse<SignInResponse>> {
	const parsed = signInSchema.safeParse(data);
	if (!parsed.success) {
		return ResponseMapper.error("Dados inválidos.");
	}

	const email = parsed.data.email.toLowerCase().trim();

	try {
		const [user] = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, email))
			.limit(1);

		if (!user) {
			return ResponseMapper.error("Credenciais inválidas.");
		}

		if (!user.status) {
			return ResponseMapper.error("Conta desativada. Contate o suporte.");
		}

		const isValidPassword = await bcrypt.compare(
			parsed.data.password,
			user.password,
		);

		if (!isValidPassword) {
			return ResponseMapper.error("Credenciais inválidas.");
		}

		const expiresAt = dayjs().add(7, "days").unix();

		const [existingToken] = await db
			.select()
			.from(authTokenTable)
			.where(eq(authTokenTable.userId, user.id))
			.limit(1);

		if (existingToken) {
			await db
				.update(authTokenTable)
				.set({
					expiresAt,
					revoked: false,
				})
				.where(eq(authTokenTable.userId, user.id));
		} else {
			await db.insert(authTokenTable).values({
				userId: user.id,
				expiresAt,
				revoked: false,
			});
		}

		const token = jwt.sign(
			{
				sub: user.id,
				email: user.email,
				role: user.role,
			},
			env.JWT_SECRET,
			{
				expiresIn: "5h",
				issuer: "briefly-auth",
				audience: "briefly-users",
			},
		);

		// 🍪 Novo modo de manipular cookies em server actions
		const cookieStore = await cookies();
		cookieStore.set({
			name: "briefly-auth.session-token",
			value: token,
			maxAge: 60 * 60 * 5, // 5h
			path: "/",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});

		return ResponseMapper.success(
			{
				role: user.role,
				token,
			},
			"Login realizado com sucesso.",
		);
	} catch (error) {
		console.error("❌ Erro inesperado no login:", error);
		return ResponseMapper.error("Erro interno ao processar o login.");
	}
}
