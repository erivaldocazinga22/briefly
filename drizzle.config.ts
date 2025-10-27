import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { env } from "@/core/config/env.config";

config({ path: ".env" });

export default defineConfig({
	schema: "./src/core/database/drizzle/index.ts",
	out: "./src/core/database/drizzle/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
