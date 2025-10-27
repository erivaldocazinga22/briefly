"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/core/database/drizzle";
import {
	type CreateUserValues,
	userTable,
} from "@/core/database/drizzle/schemas/drizzle-user-table.schema";

export async function createUserAction({ name, email }: CreateUserValues) {
	await db.insert(userTable).values({
		name,
		email,
	});

	revalidatePath("/");
}
