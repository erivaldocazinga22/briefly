import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/core/schemas/user.schema";
import { formatDate } from "@/lib/formats/format-date";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "id",
		header: () => <div className="text-center font-bold">Id</div>,
		cell: ({ row }) => {
			return (
				<div className="text-center">
					{String(row.index).padStart(2, "0")}
				</div>
			);
		},
	},
	{
		accessorKey: "name",
		header: () => <div className="font-bold">Usuário</div>,
		cell: ({ row }) => {
			const name = row.getValue("name") as string;
			return (
				<div className="flex items-center gap-2">
					<Avatar className="size-10">
						<AvatarFallback>
							{name
								.split(" ")
								.map((n) => n[0])
								.join("")
								.toUpperCase() || "U"}
						</AvatarFallback>
					</Avatar>
					<div>
						<span className="block">{name}</span>
						<span className="text-muted-foreground dark:text-muted text-sm">
							{row.original.email}
						</span>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "role",
		header: () => <div className="text-center font-bold">Role</div>,
		cell: ({ row }) => {
			return (
				<div className="text-center">
					<Badge
						className={cn(
							"rounded-sm text-xs bg-lime-500/20 text-lime-600 border border-lime-500/25",
							row.original.role === "customer" &&
								"bg-blue-500/20 text-blue-600 border border-blue-500/25",
						)}
					>
						{row.original.role.toUpperCase()}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: () => <div className="text-center font-bold">Status</div>,
		cell: ({ row }) => {
			return (
				<div className="text-center">
					<Badge
						className={cn(
							"rounded-sm bg-red-500/20 text-red-300 border border-red-500/25",
							row.original.status &&
								"bg-green-500/20 text-green-500 border border-green-500/25",
						)}
					>
						{row.original.status ? "Activo" : "Inativo"}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: () => <div className="font-bold ">Criado em</div>,
		cell: ({ row }) => {
			return <div>{formatDate(row.original.createdAt)}</div>;
		},
	},
	{
		accessorKey: "updatedAt",
		header: () => <div className="font-bold ">Actualizado em</div>,
		cell: ({ row }) => {
			return <div>{formatDate(row.original.updatedAt ?? "")}</div>;
		},
	},
];
