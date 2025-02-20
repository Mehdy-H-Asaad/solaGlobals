import { z } from "zod";

export const sourceSchema = z.object({
	state: z.string().min(1, "State is required"),
	city: z.string().optional(),
	address: z.string().optional(),
	zipcode: z.string().optional(),
});
