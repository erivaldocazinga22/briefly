import { URL } from "node:url";
import { config } from "dotenv";
import { Client } from "pg";

config({ path: ".env" });

const DATABASE_URL = process.env.DATABASE_URL;

export async function ensureDatabaseExists() {
	if (!DATABASE_URL) {
		console.error("❌ ERRO: Variável DATABASE_URL não encontrada no .env");
		process.exit(1);
	}

	try {
		const dbUrl = new URL(DATABASE_URL);
		const dbName = dbUrl.pathname.replace("/", "");

		// 🔹 Conecta primeiro no banco padrão "postgres"
		dbUrl.pathname = "/postgres";

		const client = new Client({
			connectionString: dbUrl.toString(),
		});

		await client.connect();

		// 🔹 Verifica se o banco já existe
		const res = await client.query(
			"SELECT 1 FROM pg_database WHERE datname = $1",
			[dbName],
		);

		if (res.rowCount === 0) {
			console.log(`🛠️  Banco "${dbName}" não existe. Criando...`);
			await client.query(`CREATE DATABASE "${dbName}"`);
			console.log(`✅ Banco "${dbName}" criado com sucesso.`);
		} else {
			console.log(`✅ Banco "${dbName}" já existe.`);
		}

		await client.end();
	} catch (error) {
		console.error("❌ Erro ao verificar/criar banco:", error);
		process.exit(1);
	}
}

if (require.main === module) {
	ensureDatabaseExists().then(() => process.exit(0));
}
