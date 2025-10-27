import { UserForm } from "@/components/forms/user-form";
import { user } from "@/core/actions/user";

export default async function Home() {
	const data = await user.findMany();
	return (
		<main>
			<div>Hello world!</div>
			<div>
				<div>
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</div>
				<div>
					<UserForm />
				</div>
			</div>
		</main>
	);
}
