import { hash } from "bcrypt";
import { db } from "./drizzle";
import {
	authTokenTable,
	formFieldAnswerTable,
	formFieldTable,
	formResponseTable,
	formTable,
	userTable,
} from "./drizzle/schemas";

async function main() {
	console.log("🌱 Iniciando seed...");

	await db.delete(formFieldAnswerTable);
	await db.delete(formResponseTable);
	await db.delete(formFieldTable);
	await db.delete(formTable);
	await db.delete(authTokenTable);
	await db.delete(userTable);

	const [adminPassword, customerPassword] = await Promise.all([
		hash("password", 10),
		hash("password", 10),
	]);

	const users: (typeof userTable.$inferInsert)[] = [
		{
			name: "Eclipse Solutions",
			email: "eclipsesolutions2@gmail.com",
			password: adminPassword,
			role: "manager",
			status: true,
		},
		{
			name: "Briefy Test",
			email: "erivaldomalebo2206@gmail.com",
			password: customerPassword,
			role: "customer",
			status: true,
		},
	];

	const [managerUser, customerUser] = await db
		.insert(userTable)
		.values(users)
		.returning();

	console.log(
		"✅ Usuários criados:",
		managerUser.name,
		"&",
		customerUser.name,
	);
	console.log("🌿 Seed finalizado com sucesso!");
	process.exit(0);
}

main().catch((err) => {
	console.error("❌ Erro ao executar seed:", err);
	process.exit(1);
});
