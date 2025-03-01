import { t } from "i18next";
import { z } from "zod";

export const CostSchema = z.object({
	amount: z.number().min(1, t("validation.estimateCost.bid")),
	auction: z.string().min(1, t("validation.estimateCost.auction")),
	source: z.number().min(1, t("validation.estimateCost.source")),
	warehouse: z.number().min(1, t("validation.estimateCost.warehouse")),
	shipping_line: z.number().min(1, t("validation.estimateCost.shippingLine")),
	shipping_type: z.number().min(1, t("validation.estimateCost.shippingType")),
	destination_country: z.string().min(1, t("validation.estimateCost.country")),
	destination_port: z.string().min(1, t("validation.estimateCost.port")),
	vin: z.string().min(17, t("vin")).optional().or(z.literal("")),
});
