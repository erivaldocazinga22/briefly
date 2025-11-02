import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.url(),
	JWT_SECRET: z.cuid2(),
});

export const env = envSchema.parse(process.env);
