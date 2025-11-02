"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface OverviewHeaderProps {
	interval: string;
	setInterval: (value: string) => void;
}

export function OverviewHeader({ interval, setInterval }: OverviewHeaderProps) {
	return (
		<header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
			<h1 className="text-2xl font-bold">Overview</h1>

			<div className="flex items-center gap-2">
				<span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
					Estatísticas
				</span>

				<Select value={interval} onValueChange={setInterval}>
					<SelectTrigger className="min-w-32 px-0 py-0 text-sm shadow-none text-neutral-500 border-none bg-transparent hover:bg-transparent dark:hover:bg-transparent dark:bg-transparent focus-visible:border-none">
						<SelectValue placeholder="Últimas 24 horas" />
					</SelectTrigger>

					<SelectContent>
						<SelectGroup>
							<SelectLabel>Intervalos</SelectLabel>
							<SelectItem value="24h">
								Últimas 24 horas
							</SelectItem>
							<SelectItem value="07days">
								Últimos 7 dias
							</SelectItem>
							<SelectItem value="15days">
								Últimos 15 dias
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</header>
	);
}
