import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/core/actions/auth";
import { HeaderUserMenuClient } from "./header-user-menu-client";

export async function HeaderUserMenu() {
	const result = await auth.session();

	if (!result.success) {
		return <Skeleton className="size-10 rounded-full" />;
	}

	return <HeaderUserMenuClient data={result.data} />;
}
