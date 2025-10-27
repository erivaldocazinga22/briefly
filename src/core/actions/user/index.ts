import { createUserAction } from "./create-user.action";
import { deleteUserAction } from "./delete-user.action";
import { findManyUserAction } from "./find-many-user.action";

export const user = {
	findMany: findManyUserAction,
	create: createUserAction,
	delete: deleteUserAction,
};
