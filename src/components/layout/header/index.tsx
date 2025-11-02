import { Eye, Link2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { CustomizeColors } from "./customize-colors";
import { HeaderNavigation } from "./header-navigation";
import { HeaderUserMenu } from "./header-user-menu";

export function Header() {
	return (
		<header className="border-b bg-background/70 backdrop-blur flex flex-col items-center">
			<div className="container mx-auto h-16 flex items-center justify-between">
				<Link
					href="/dashboard"
					className="font-bold text-xl flex items-center gap-1"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="28"
						height="28"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-remove-formatting-square"
					>
						<title>Hello world</title>
						<rect width="18" height="18" x="3" y="3" rx="2" />
						<path d="M7 9V7h10v2" />
						<path d="M13 7 8 17" />
						<path d="M7 17h3" />
						<path d="m17 14-3 3" />
						<path d="m14 14 3 3" />
					</svg>
					<span>Briefy</span>
				</Link>

				<div className="flex items-center gap-3">
					<CustomizeColors />

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								className="size-10 rounded-full"
							>
								<Eye className="size-5 text-muted-foreground" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							Pré-visualizar
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								className="size-10 rounded-full"
							>
								<Link2 className="size-5 text-muted-foreground" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							Copiar link
						</TooltipContent>
					</Tooltip>

					<Button size="sm" className="font-medium">
						Publicar
					</Button>

					<HeaderUserMenu />
				</div>
			</div>

			<HeaderNavigation />
		</header>
	);
}
