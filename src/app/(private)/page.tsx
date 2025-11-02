import Link from "next/link";
import { UserForm } from "@/components/forms/user-form";
import { auth } from "@/core/actions/auth";
import { user } from "@/core/actions/user";

export default async function Home() {
	const data = await user.findMany();
	const session = await auth.session();
	return (
		<main>
			<div>Hello world!</div>
			<Link href="/users">Users</Link>
			<div>
				<div>
					<pre>{JSON.stringify(data, null, 2)}</pre>
					<div>
						<h1>
							User loged: {session.success && session.data.email}
						</h1>
						<pre>{JSON.stringify(session, null, 2)}</pre>
					</div>
				</div>
				<div>
					<UserForm />
				</div>
			</div>
		</main>
	);
}
