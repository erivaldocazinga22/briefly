"use client";
import { BadgeQuestionMark, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/core/schemas/user.schema";

const navlinks = [
	{
		label: "Meus Formulários",
		icon: BadgeQuestionMark,
		href: "/dashboard/quizzes",
	},
];

interface HeaderUserMenuClientProps {
	data: User;
}

export function HeaderUserMenuClient({
	data: user,
}: HeaderUserMenuClientProps) {
	const handleSignOut = () => {
		console.log("logout");
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar
					className="size-10 cursor-pointer transition-transform hover:scale-105"
					title={user.name}
				>
					<AvatarFallback>
						{user.name
							?.split(" ")
							.map((n: string) => n[0])
							.join("")
							.toUpperCase() || "U"}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				className="w-56 shadow-md border-border/50"
			>
				<div className="px-3 py-2">
					<p className="text-sm font-medium truncate">
						{user.name || "Usuário"}
					</p>
					<p className="text-xs text-muted-foreground truncate">
						{user.email || "user@example.com"}
					</p>
				</div>

				<DropdownMenuSeparator />

				{navlinks.map(({ icon: Icon, label, href }) => (
					<DropdownMenuItem key={href} asChild>
						<Link
							href={href}
							className="flex items-center gap-2 w-full"
						>
							<Icon className="size-4 text-muted-foreground" />
							<span>{label}</span>
						</Link>
					</DropdownMenuItem>
				))}

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={handleSignOut}
					className="text-red-600 focus:text-red-700"
				>
					<LogOut className="size-4" />
					<span>Terminar sessão</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
