"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GripVertical, PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const fieldSchema = z.object({
	label: z.string().min(1, "O campo deve ter um título"),
	type: z.enum([
		"text",
		"textarea",
		"number",
		"select",
		"checkbox",
		"radio",
		"date",
	]),
	isRequired: z.boolean().default(false),
	options: z.array(z.string()).optional(),
});

const formSchema = z.object({
	title: z.string().min(3, "Título obrigatório"),
	description: z.string().optional(),
	fields: z.array(fieldSchema).min(1, "Adicione pelo menos uma pergunta"),
});

type FormSchema = z.infer<typeof formSchema>;

export function QuizzeForm() {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			fields: [
				{
					label: "",
					type: "text",
					isRequired: false,
					options: [],
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "fields",
	});

	const onSubmit = async (data: FormSchema) => {
		console.log("📦 Dados do formulário:", data);
		// Aqui você pode enviar via fetch para sua API (drizzle insert)
		// await fetch('/api/forms', { method: 'POST', body: JSON.stringify(data) })
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* TÍTULO E DESCRIÇÃO */}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Título do formulário</FormLabel>
							<FormControl>
								<Input
									placeholder="Ex: Briefing de projeto"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrição</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Explique brevemente o objetivo deste formulário"
									rows={3}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* CAMPOS DINÂMICOS */}
				<div className="space-y-4">
					{fields.map((field, index) => (
						<Card
							key={field.id}
							className={cn("p-4 border", {
								"border-primary/40":
									form.formState.errors.fields?.[index],
							})}
						>
							<div className="flex items-start justify-between mb-4">
								<div className="flex items-center gap-2">
									<GripVertical className="text-muted-foreground h-5 w-5" />
									<span className="font-medium text-sm text-muted-foreground">
										Pergunta {index + 1}
									</span>
								</div>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => remove(index)}
									className="text-destructive hover:text-destructive"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>

							<div className="space-y-4">
								{/* LABEL */}
								<FormField
									control={form.control}
									name={`fields.${index}.label`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Título da pergunta
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Ex: Qual é o nome do cliente?"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* TIPO */}
								<FormField
									control={form.control}
									name={`fields.${index}.type`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tipo de campo</FormLabel>
											<FormControl>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
												>
													<SelectTrigger>
														<SelectValue placeholder="Selecione o tipo" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="text">
															Texto curto
														</SelectItem>
														<SelectItem value="textarea">
															Texto longo
														</SelectItem>
														<SelectItem value="number">
															Número
														</SelectItem>
														<SelectItem value="date">
															Data
														</SelectItem>
														<SelectItem value="select">
															Lista suspensa
														</SelectItem>
														<SelectItem value="checkbox">
															Múltipla escolha
														</SelectItem>
														<SelectItem value="radio">
															Opção única
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* OBRIGATÓRIO */}
								<FormField
									control={form.control}
									name={`fields.${index}.isRequired`}
									render={({ field }) => (
										<FormItem className="flex items-center justify-between border-t pt-2">
											<FormLabel>Obrigatório?</FormLabel>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={
														field.onChange
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</Card>
					))}
				</div>

				<Button
					type="button"
					variant="outline"
					className="w-full border-dashed"
					onClick={() =>
						append({
							label: "",
							type: "text",
							isRequired: false,
							options: [],
						})
					}
				>
					<PlusCircle className="h-4 w-4 mr-2" />
					Adicionar pergunta
				</Button>

				<Button type="submit" className="w-full">
					Salvar formulário
				</Button>
			</form>
		</Form>
	);
}
