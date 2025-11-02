import type React from "react";

export default function QuizzeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="max-w-3xl mx-auto py-8">{children}</div>;
}
