import type React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface OverviewCardRootProps {
	children: React.ReactNode;
}

export function OverviewCardRoot({ children }: OverviewCardRootProps) {
	return (
		<Card className="p-4 border-4 shadow-xs">
			<CardContent className="flex gap-4 justify-between p-0">
				{children}
			</CardContent>
		</Card>
	);
}
