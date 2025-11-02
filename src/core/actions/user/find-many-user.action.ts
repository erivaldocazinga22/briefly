"use server";

import { db } from "@/core/database/drizzle";
import { userTable } from "@/core/database/drizzle/schemas/drizzle-user-table.schema";
import {
	type ApiResponse,
	ResponseMapper,
} from "@/core/schemas/default.mappers";
import type { User } from "@/core/schemas/user.schema";

export async function findManyUserAction(): Promise<ApiResponse<User[]>> {
	try {
		const data = await db.select().from(userTable);

		if (!data) {
			return ResponseMapper.error("Falha ao buscar os usuários");
		}

		const users: User[] = data.map((item) => ({
			id: item.id,
			name: item.name,
			email: item.email,
			role: item.role,
			status: !!item.status,
			createdAt: item.createdAt?.toISOString() ?? "",
			updatedAt: item.updatedAt?.toISOString() ?? "",
		}));

		return ResponseMapper.success(users);
	} catch (error) {
		console.error("❌ Erro ao buscar usuários:", error);
		return ResponseMapper.error("Erro inesperado ao listar usuários");
	}
}
