import { t } from "i18next";
import { z } from "zod";

export const sourceSchema = z.object({
	state: z.string().min(1, t("validation.state")),
	city: z.string().min(1, t("validation.city")),
	address: z.string().min(1, t("validation.address")),
	zipcode: z.string().min(1, t("validation.zip")),
});
