import { getSessionAction } from "./get-session";
import { signInAction } from "./sign-in.action";
import { signOutAction } from "./sign-out.action";

export const auth = {
	signIn: signInAction,
	signOut: signOutAction,
	session: getSessionAction,
};
