import { z } from "zod";

export const useInlandTransports = () => {
	const InlandTransportsSchema = z.object({
		source_id: z.number(),
		source_state: z.string(),
		source_city: z.string(),
		source_address: z.string(),
		source_zipcode: z.string(),
		warehouse_id: z.number(),
		warehouse_state: z.string(),
		warehouse_zipcode: z.string(),
		cost: z.number(),
	});
	return { InlandTransportsSchema };
};
