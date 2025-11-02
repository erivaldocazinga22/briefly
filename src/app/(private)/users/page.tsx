"use client";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { auth } from "@/core/actions/auth";

export default function UserPage() {
	return (
		<div>
			User
			<Link href="/">Home</Link>
			<Button
				type="button"
				onClick={async () => {
					const result = await auth.signOut();
					if (!result.success) {
						toast.error(result.error);
						return;
					}

					toast.success(result.message);
				}}
			>
				Logout
			</Button>
		</div>
	);
}
