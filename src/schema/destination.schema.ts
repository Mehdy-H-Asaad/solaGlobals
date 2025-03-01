import { t } from "i18next";
import { z } from "zod";

export const destinationSchema = z.object({
	state: z.string().min(1, t("validation.state")),
	city: z.string().optional(),
	address: z.string().optional(),
	zipcode: z.string().optional(),
});
