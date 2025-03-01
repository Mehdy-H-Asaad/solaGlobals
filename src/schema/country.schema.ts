import { z } from "zod";

export const countrySchema = z.object({
	country: z.string().min(1, "Country is required"),
	port: z.string().min(1, "Country is required"),
});
