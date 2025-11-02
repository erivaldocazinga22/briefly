"use client";

import { Check, Palette, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const THEME_KEY = "briefy-theme-color";
const BG_OPACITY_KEY = "briefy-theme-bg-opacity";

export function CustomizeColors() {
	const [openPalette, setOpenPalette] = useState(false);
	const [selectedColor, setSelectedColor] = useState("#D93025");
	const [bgOpacity, setBgOpacity] = useState(0.3);

	const colors = [
		{ label: "vermelho", color: "#D93025" },
		{ label: "roxo", color: "#9334E6" },
		{ label: "índigo", color: "#5E5CE6" },
		{ label: "azul forte", color: "#1A73E8" },
		{ label: "azul claro", color: "#00A3FF" },
		{ label: "ciano", color: "#00C4CC" },
		{ label: "laranja", color: "#FB6300" },
		{ label: "amarelo", color: "#F9AB00" },
		{ label: "teal", color: "#00897B" },
		{ label: "verde", color: "#34A853" },
		{ label: "cinza azulado", color: "#5F6368" },
		{ label: "cinza claro", color: "#9AA0A6" },
	];

	useEffect(() => {
		const savedColor = localStorage.getItem(THEME_KEY);
		const savedOpacity = localStorage.getItem(BG_OPACITY_KEY);
		if (savedColor) {
			setSelectedColor(savedColor);
			document.documentElement.style.setProperty("--primary", savedColor);
		}
		if (savedOpacity) {
			const parsed = parseFloat(savedOpacity);
			setBgOpacity(parsed);
			const rgba = hexToRgba(savedColor ?? "#D93025", parsed);
			document.documentElement.style.setProperty("--primary-bg", rgba);
		}
	}, []);

	const handleSelectColor = (color: string) => {
		setSelectedColor(color);
		localStorage.setItem(THEME_KEY, color);
		document.documentElement.style.setProperty("--primary", color);
		const rgba = hexToRgba(color, bgOpacity);
		document.documentElement.style.setProperty("--primary-bg", rgba);
	};

	const handleSelectOpacity = (opacity: number) => {
		setBgOpacity(opacity);
		localStorage.setItem(BG_OPACITY_KEY, opacity.toString());
		const rgba = hexToRgba(selectedColor, opacity);
		document.documentElement.style.setProperty("--primary-bg", rgba);
	};

	return (
		<Popover open={openPalette} onOpenChange={setOpenPalette}>
			<Tooltip>
				<TooltipTrigger asChild>
					<PopoverTrigger asChild>
						<Button
							variant="ghost"
							className="size-10 rounded-full"
						>
							<Palette className="size-5 text-muted-foreground" />
						</Button>
					</PopoverTrigger>
				</TooltipTrigger>
				<TooltipContent side="bottom">Personalizar tema</TooltipContent>
			</Tooltip>

			<PopoverContent align="end" className="p-0 w-[280px] shadow-md">
				{/* Header */}
				<div className="flex items-center justify-between px-4 py-2">
					<div className="flex items-center gap-2">
						<Palette className="size-4 text-primary" />
						<span className="font-semibold text-sm">Temas</span>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setOpenPalette(false)}
						className="size-7"
					>
						<X className="size-4 text-muted-foreground" />
					</Button>
				</div>

				<Separator />

				{/* Cores principais */}
				<div className="px-4 py-3 space-y-4">
					<span className="text-xs font-medium text-muted-foreground">
						Cores principais
					</span>

					<div className="grid grid-cols-6 gap-2 mt-4">
						{colors.map(({ label, color }) => {
							const isSelected = selectedColor === color;
							return (
								<Button
									key={color}
									size="icon"
									title={`${label} ${color}`}
									style={{ backgroundColor: color }}
									className={cn(
										"w-6 h-6 rounded-full flex items-center justify-center border border-muted-foreground/20 cursor-pointer hover:scale-110 transition-transform focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
										isSelected &&
											"ring-2 ring-offset-1 ring-primary",
									)}
									onClick={() => handleSelectColor(color)}
								>
									{isSelected && (
										<Check
											className="size-3"
											strokeWidth={4}
											style={{
												color: [
													"#F9AB00",
													"#00A3FF",
													"#9AA0A6",
												].includes(color)
													? "#000"
													: "#fff",
											}}
										/>
									)}
								</Button>
							);
						})}
					</div>
				</div>

				<Separator />

				{/* Opacidade do background */}
				<div className="px-4 py-3 space-y-4">
					<span className="text-xs font-medium text-muted-foreground">
						Opacidade do fundo
					</span>

					<div className="grid grid-cols-4 gap-2 mt-4">
						{[0.3, 0.5, 0.6, 0.8].map((opacity) => {
							const isActive = bgOpacity === opacity;
							const bg = hexToRgba(selectedColor, opacity);
							return (
								<Button
									key={opacity}
									size="icon"
									title={`${opacity * 100}%`}
									style={{ backgroundColor: bg }}
									className={cn(
										"w-6 h-6 rounded-full flex items-center justify-center border border-muted-foreground/20 hover:scale-110 transition-transform",
										isActive &&
											"ring-2 ring-offset-1 ring-primary",
									)}
									onClick={() => handleSelectOpacity(opacity)}
								>
									{isActive && (
										<Check
											className="size-3 text-white"
											strokeWidth={4}
										/>
									)}
								</Button>
							);
						})}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}

// util para converter hex → rgba
function hexToRgba(hex: string, alpha: number) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
