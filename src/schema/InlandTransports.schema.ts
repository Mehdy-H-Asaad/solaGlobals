import { z } from "zod";

export const InlandTransportsSchema = z.object({
	source_id: z.number().min(1, "Source is required"),
	source_state: z.string(),
	source_city: z.string(),
	source_address: z.string(),
	source_zipcode: z.string(),
	warehouse_id: z.number().min(1, "Warehouse is required"),
	warehouse_state: z.string(),
	warehouse_zipcode: z.string(),
	cost: z.number().min(1, "Cost is required"),
});
