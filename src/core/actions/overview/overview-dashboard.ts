"use server";

import { db } from "@/core/database/drizzle";
import { userTable } from "@/core/database/drizzle/schemas";
import {
	type ApiResponse,
	ResponseMapper,
} from "@/core/schemas/default.mappers";
import type { User } from "@/core/schemas/user.schema";

export type OverviewDashboardResponse = {
	totals: {
		users: number;
		activeUsers: number;
		answers: number;
		questions: number;
	};
	recentUsers: User[];
};

export async function overviewDashboardAction(
	date?: string,
): Promise<ApiResponse<OverviewDashboardResponse>> {
	try {
		const users = await db.select().from(userTable);
		const form = await db.query.formResponseTable.findMany({
			with: {
				answers: true,
				form: true,
			},
		});

		const end = new Date();
		const start = date ? new Date(date) : new Date();

		const recentUsers = users.filter((user) => {
			if (!user.createdAt) return false;
			const createdAt = new Date(user.createdAt);
			return createdAt >= start && createdAt <= end;
		});

		const answersCount = form.reduce((acc, current) => {
			return current.answers.length + acc;
		}, 0);

		return ResponseMapper.success({
			totals: {
				users: users.length,
				activeUsers: users.filter((u) => u.status).length,
				answers: answersCount,
				questions: form.length,
			},
			recentUsers: recentUsers.map((u) => ({
				id: u.id,
				name: u.name,
				email: u.email,
				role: u.role,
				status: u.status ? true : false,
				createdAt: u.createdAt?.toISOString() ?? "",
				updatedAt: u.updatedAt?.toISOString() ?? "",
			})),
		});
	} catch (error) {
		console.error("❌ Erro ao buscar overview:", error);
		return ResponseMapper.error("Falha ao obter dados do dashboard");
	}
}
