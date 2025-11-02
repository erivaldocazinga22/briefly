export interface User {
	id: string;
	name: string;
	email: string;
	role: "manager" | "customer";
	status: boolean;
	createdAt: string;
	updatedAt?: string;
}
