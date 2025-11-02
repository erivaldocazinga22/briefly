"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextThemeProvider
			attribute="class"
			defaultTheme="ligth"
			enableSystem
			disableTransitionOnChange
			enableColorScheme
		>
			<NuqsAdapter>{children}</NuqsAdapter>
			<Toaster />
		</NextThemeProvider>
	);
}
