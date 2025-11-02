"use client";

import { useForm } from "react-hook-form";
import { user } from "@/core/actions/user";
import { Button } from "../ui/button";
import { Form, FormControl, FormField } from "../ui/form";
import { Input } from "../ui/input";

export function UserForm() {
	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: ""
		},
	});
	const onSubmit = async (data: any) => {
		await user.create(data);
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormControl>
							<Input type="text" placeholder="Nome" {...field} />
						</FormControl>
					)}
				/>
				<FormField
					name="email"
					control={form.control}
					render={({ field }) => (
						<FormControl>
							<Input
								type="email"
								placeholder="Email"
								autoComplete="email"
								{...field}
							/>
						</FormControl>
					)}
				/>
				<FormField
					name="password"
					control={form.control}
					render={({ field }) => (
						<FormControl>
							<Input
								type="password"
								placeholder="Password"
								{...field}
							/>
						</FormControl>
					)}
				/>
				<Button type="submit">Enviar</Button>
			</form>
		</Form>
	);
}
