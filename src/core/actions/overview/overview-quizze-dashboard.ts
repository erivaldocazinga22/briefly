"use server";

import { db } from "@/core/database/drizzle";
import {
	type ApiResponse,
	ResponseMapper,
} from "@/core/schemas/default.mappers";

export type OverviewQuizzeDashboardResponse = {
	totals: {
		forms: number;
		activeForms: number;
		questions: number;
		answers: number;
	};
	quizzes: any[];
};

export async function overviewQuizzeDashboardAction(
	date?: string,
): Promise<ApiResponse<OverviewQuizzeDashboardResponse>> {
	try {
		const end = new Date();
		const start = date
			? new Date(date)
			: new Date(end.getTime() - 24 * 60 * 60 * 1000);

		const forms = await db.query.formTable.findMany({
			with: {
				responses: true,
				fields: true,
			},
		});

		// 🔹 Contar totals
		const totalForms = forms.length;
		const activeForms = forms.filter((f) => f.isActive).length;
		const totalQuestions = forms.reduce(
			(acc, f) => acc + f.fields.length,
			0,
		);
		const totalAnswers = forms.reduce(
			(acc, f) => acc + f.responses.length,
			0,
		);

		return ResponseMapper.success({
			totals: {
				forms: totalForms,
				activeForms,
				questions: totalQuestions,
				answers: totalAnswers,
			},
			quizzes: [],
		});
	} catch (error) {
		console.error("❌ Erro ao buscar overview de quizzes:", error);
		return ResponseMapper.error("Falha ao obter dados do dashboard");
	}
}
