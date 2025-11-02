"use server";

import { eq } from "drizzle-orm";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { db } from "@/core/database/drizzle";
import { userTable } from "@/core/database/drizzle/schemas";
import {
	type ApiResponse,
	ResponseMapper,
} from "@/core/schemas/default.mappers";
import type { User } from "@/core/schemas/user.schema";

export async function getSessionAction(): Promise<ApiResponse<User>> {
	try {
		const storage = await cookies();
		const token = storage.get("briefly-auth.session-token");

		if (!token?.value) {
			return ResponseMapper.error("Precisa estar autenticado.");
		}

		const decoded = jwtDecode<{ sub: string }>(token.value);
		if (!decoded?.sub) {
			return ResponseMapper.error("Precisa estar autenticado.");
		}

		const [user] = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, decoded.sub));

		if (!user) {
			return ResponseMapper.error("Credenciais Inválidas");
		}

		return ResponseMapper.success({
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			status: !!user.status,
			createdAt: user.createdAt?.toISOString() ?? "",
			updatedAt: user.updatedAt?.toISOString() ?? "",
		});
	} catch (error) {
		console.error("❌ Erro inesperado no login: ", error);
		return ResponseMapper.error("Erro ao recuperar sessão");
	}
}
