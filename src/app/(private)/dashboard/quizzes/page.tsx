import {
	BookOpen,
	CheckCircle,
	ClipboardCheck,
	ClipboardList,
	HelpCircle,
	PlusCircle,
} from "lucide-react";
import Link from "next/link";
import {
	OverviewCard,
	OverviewCardContent,
	OverviewCardIcon,
} from "@/components/layout/overview/overview-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { overview } from "@/core/actions/overview";
import type { OverviewQuizzeDashboardResponse } from "@/core/actions/overview/overview-quizze-dashboard";

export default async function QuizzesPage() {
	const result = await overview.quizze();

	let data: OverviewQuizzeDashboardResponse = {
		totals: {
			forms: 0,
			activeForms: 0,
			questions: 0,
			answers: 0,
		},
		quizzes: [],
	};
	if (result.success) {
		data = result.data;
	}

	return (
		<div className="container mx-auto py-8 space-y-10">
			<header>
				<h1 className="text-2xl font-bold">Painel de Quizzes</h1>
				<p className="text-sm text-muted-foreground">
					Acompanhe o desempenho dos formulários, perguntas e
					respostas em tempo real.
				</p>
			</header>

			<section className="space-y-2">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
					{[
						{
							icon: ClipboardList,
							label: "Total de Formulários",
							value: data.totals.forms,
							color: "text-blue-600 bg-blue-400/10",
						},
						{
							icon: ClipboardCheck,
							label: "Formulários Ativos",
							value: data.totals.activeForms,
							color: "text-green-600 bg-green-400/10",
						},
						{
							icon: HelpCircle,
							label: "Total de Perguntas",
							value: data.totals.questions,
							color: "text-violet-600 bg-violet-400/10",
						},
						{
							icon: CheckCircle,
							label: "Respostas Recebidas",
							value: data.totals.answers,
							color: "text-amber-600 bg-amber-400/10",
						},
					].map((metric) => (
						<OverviewCard key={metric.label}>
							<OverviewCardIcon
								icon={metric.icon}
								className={metric.color}
							/>
							<OverviewCardContent
								title={metric.label}
								description=""
								value={metric.value ?? "-"}
							/>
						</OverviewCard>
					))}
				</div>
			</section>

			<div className="mt-4">
				{result.success &&
					(!data.quizzes.length ? (
						<Card className="border-dashed border-muted-foreground/30 shadow-none">
							<CardContent className="flex flex-col items-center justify-center py-20 text-center w-full">
								<BookOpen className="h-16 w-16 text-muted-foreground/40 mb-4" />
								<h3 className="font-semibold text-lg mb-2">
									Nenhum formulário cadastrado
								</h3>
								<p className="text-sm text-muted-foreground mb-6 max-w-xs">
									Crie seu primeiro formulário para aplicar
									quizzes e coletar respostas dos clientes.
								</p>

								<Button className="text-white" asChild>
									<Link href="/dashboard/quizzes/new">
										Criar formulário
									</Link>
								</Button>
							</CardContent>
						</Card>
					) : (
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
							<Button
								variant="secondary"
								className="h-full w-full group aspect-square rounded-xl border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 hover:border-primary/50 transition-all duration-200 flex flex-col gap-2 items-center justify-center cursor-pointer"
								asChild
							>
								<Link href="">
									<div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
										<PlusCircle className="h-5 w-5 text-primary" />
									</div>
									<span className="text-sm font-medium">
										Criar formulário
									</span>
								</Link>
							</Button>

							{data.quizzes.map((quizze) => (
								<div key={quizze}></div>
							))}
						</div>
					))}
			</div>
		</div>
	);
}
