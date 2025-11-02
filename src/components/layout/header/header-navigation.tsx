"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity } from "react";
import { cn } from "@/lib/utils";

const navlinks = [
	{
		label: "Perguntas",
		href: "/dashboard/quizzes/new",
	},
	{
		label: "Respostas",
		href: "/dashboard/quizzes/answers",
	},
	{
		label: "Definições",
		href: "/dashboard/quizzes/settings",
	},
];

export function HeaderNavigation() {
	const pathname = usePathname();
	return (
		<Activity mode={pathname.includes("/quizzes") ? "visible" : "hidden"}>
			<nav className="flex items-center gap-2">
				{navlinks.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className={cn(
							"text-sm flex flex-col items-center w-full",
							pathname === link.href && "text-primary",
						)}
					>
						<span className="py-2 px-4">{link.label}</span>
						{pathname === link.href && (
							<div className="h-1 w-full rounded-t-md bg-primary" />
						)}
					</Link>
				))}
			</nav>
		</Activity>
	);
}
