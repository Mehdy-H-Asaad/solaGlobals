import { z } from "zod";

export const maritimeTransportSchema = z.object({
	warehouse_id: z.number().min(1, "Warehouse is required"),
	warehouse_state: z.string(),
	warehouse_zipcode: z.string(),
	shipping_line_id: z.number().min(1, "Shipping line is required"),
	shipping_line_name: z.string(),
	cost: z.number().min(1, "Cost is required"),
});
