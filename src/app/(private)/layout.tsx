import type { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
	return <div>{children}</div>;
}
