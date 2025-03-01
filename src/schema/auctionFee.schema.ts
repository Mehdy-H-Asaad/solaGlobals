import { z } from "zod";

export const auctionFeeSchema = z.object({
	from: z.number(),
	to: z.number(),
	fee: z.number().min(1, "Fee is required"),
});
