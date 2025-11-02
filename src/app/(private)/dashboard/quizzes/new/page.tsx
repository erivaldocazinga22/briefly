import { Card, CardContent } from "@/components/ui/card";

export default function NewQuizzePage() {
	return (
		<Card className="overflow-hidden rounded-md border-none shadow-xs border border-muted dark:border-muted p-0">
			<div className="h-3 bg-primary" />

			<CardContent className="p-6 space-y-4">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight text-foreground">
						Untitled form
					</h1>
					<p className="text-sm text-muted-foreground">
						Form description
					</p>
				</div>

				<hr className="border-border" />

				<div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
					Adicione perguntas ao formulário
				</div>
			</CardContent>
		</Card>
	);
}
