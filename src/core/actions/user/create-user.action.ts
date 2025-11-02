"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { db } from "@/core/database/drizzle";
import {
	type CreateUserValues,
	userTable,
} from "@/core/database/drizzle/schemas/drizzle-user-table.schema";

export async function createUserAction({
	name,
	email,
	password,
}: CreateUserValues) {
	await db.insert(userTable).values({
		name,
		email,
		password: await bcrypt.hash(password, 10),
	});

	revalidatePath("/");
}
