import { z } from "zod";

export const useShippingLineSchema = () => {
	const shippingLineSchema = z.object({
		name: z.string(),
	});
	return { shippingLineSchema };
};
