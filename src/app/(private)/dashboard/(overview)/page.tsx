"use client";

import {
	BadgeQuestionMark,
	MessageCircleMore,
	UserStar,
	Users,
} from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import {
	OverviewCard,
	OverviewCardContent,
	OverviewCardIcon,
} from "@/components/layout/overview/overview-card";
import { OverviewHeader } from "@/components/layout/overview/overview-header";
import { RecentUserTable } from "@/components/table/recent-user";
import { overview } from "@/core/actions/overview";
import type { OverviewDashboardResponse } from "@/core/actions/overview/overview-dashboard";

const defaultData: OverviewDashboardResponse = {
	totals: {
		users: 0,
		activeUsers: 0,
		answers: 0,
		questions: 0,
	},
	recentUsers: [],
};

function getStartDateFromInterval(interval: string): string {
	const now = new Date();

	switch (interval) {
		case "24h":
			return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
		case "07days":
			return new Date(
				now.getTime() - 7 * 24 * 60 * 60 * 1000,
			).toISOString();
		case "15days":
			return new Date(
				now.getTime() - 15 * 24 * 60 * 60 * 1000,
			).toISOString();
		default:
			return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
	}
}

export default function OverviewPage() {
	const [interval, setInterval] = useQueryState("interval", {
		defaultValue: "24h",
	});
	const [data, setData] = useState<OverviewDashboardResponse>(defaultData);

	useEffect(() => {
		const fetchData = async () => {
			const startDateISO = getStartDateFromInterval(interval);
			const result = await overview.dashboard(startDateISO);
			setData(result.success ? result.data : defaultData);
		};

		fetchData();
	}, [interval]);

	return (
		<div className="container mx-auto py-8 space-y-10">
			<OverviewHeader interval={interval} setInterval={setInterval} />

			<section className="space-y-2">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
					{[
						{
							icon: Users,
							label: "Usuários Totais",
							value: data.totals.users,
						},
						{
							icon: UserStar,
							label: "Usuários Ativos",
							value: data.totals.activeUsers,
						},
						{
							icon: BadgeQuestionMark,
							label: "Total de Perguntas",
							value: data.totals.questions,
						},
						{
							icon: MessageCircleMore,
							label: "Total de Respostas",
							value: data.totals.answers,
						},
					].map((metric, idx) => (
						<OverviewCard key={metric.label}>
							<OverviewCardIcon
								icon={metric.icon}
								className={
									idx === 0
										? "text-green-600 bg-green-400/10"
										: idx === 1
											? "text-blue-600 bg-blue-400/10"
											: idx === 2
												? "text-violet-600 bg-violet-400/10"
												: "text-amber-600 bg-amber-400/10"
								}
							/>
							<OverviewCardContent
								title={metric.label}
								description={`Desde ${new Date(
									getStartDateFromInterval(interval),
								).toLocaleDateString()}`}
								value={metric.value ?? "-"}
							/>
						</OverviewCard>
					))}
				</div>
			</section>

			<RecentUserTable data={data.recentUsers} />
		</div>
	);
}
