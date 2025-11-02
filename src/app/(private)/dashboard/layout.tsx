import { Header } from "@/components/layout/header";

export default function PrivateDashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<Header />
			<main className="p-4">{children}</main>
		</div>
	);
}
