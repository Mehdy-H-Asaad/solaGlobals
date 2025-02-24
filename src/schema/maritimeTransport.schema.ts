import { z } from "zod";

export const useMaritimeTransportSchema = () => {
	const maritimeTransportSchema = z.object({
		warehouse_id: z.number(),
		warehouse_state: z.string(),
		warehouse_zipcode: z.string(),
		shipping_line_id: z.number(),
		shipping_line_name: z.string(),
		cost: z.number(),
	});
	return { maritimeTransportSchema };
};
