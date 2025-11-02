import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/core/providers";

export const metadata: Metadata = {
	title: "Briefly",
	description: "Aplicação de briefings",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt" suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
