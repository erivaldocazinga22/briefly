"use server";

import { eq } from "drizzle-orm";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { db } from "@/core/database/drizzle";
import { authTokenTable } from "@/core/database/drizzle/schemas";
import {
	type ApiResponse,
	ResponseMapper,
} from "@/core/schemas/default.mappers";

export async function signOutAction(): Promise<ApiResponse<boolean>> {
	try {
		const storage = await cookies();
		const token = storage.get("briefly-auth.session-token");

		const decoded = jwtDecode(token.value);
		if (!decoded.sub) {
			return ResponseMapper.error("Precisa estar autenticado.");
		}
		const deleted = await db
			.delete(authTokenTable)
			.where(eq(authTokenTable.userId, decoded.sub));

		if (!deleted) {
			return ResponseMapper.error("Falha ao terminar a sessão.");
		}

		storage.delete("briefly-auth.session-token");

		return ResponseMapper.success(true, "Sessão terminada com sucesso.");
	} catch (error) {
		console.error("❌ Erro inesperado no login: ", error);
		return ResponseMapper.error("Erro ao fazer o login");
	}
}
