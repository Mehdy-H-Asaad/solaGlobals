import { z } from "zod";

export const shippingLineSchema = z.object({
	name: z.string(),
});
