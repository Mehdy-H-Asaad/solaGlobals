import { useTranslation } from "react-i18next";
import { z } from "zod";

export const useEstimateCostSchema = () => {
	const { t } = useTranslation();

	return z.object({
		amount: z.number().min(1, t("validation.estimateCost.bid")),
		auction: z.number().min(1, t("validation.estimateCost.auction")),
		source: z.number().min(1, t("validation.estimateCost.source")),
		warehouse: z.number().min(1, t("validation.estimateCost.warehouse")),
		shipping_line: z.number().min(1, t("validation.estimateCost.shippingLine")),
		shipping_type: z.number().min(1, t("validation.estimateCost.shippingType")),
		vin: z.string().min(17, t("vin")).optional().or(z.literal("")),
	});
};
