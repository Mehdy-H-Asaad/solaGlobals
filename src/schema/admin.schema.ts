import { z } from "zod";

export const useAdminSchmea = () => {
	const adminSchema = z.object({
		username: z.string().min(1, "Username is required"),
		password: z.string().min(1, "Password is required"),
	});
	return { adminSchema };
};
