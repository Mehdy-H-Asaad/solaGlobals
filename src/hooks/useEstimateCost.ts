import { useApiMutation } from "@/api/useApiMutation";
import { CostSchema } from "@/schema/estimateCost.schema";
import { TCreateEstimateCostDTO, TGetEstimateCost } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useEstimateCost = () => {
	const {
		mutate: getEstimateCost,
		data: estimateCost,
		isPending: isGettingEstimateCost,
	} = useApiMutation<TGetEstimateCost, TCreateEstimateCostDTO>({
		axiosRequestMethod: "post",
		requestURL: "/estimate-cost",
	});

	const estimateCostSchema = CostSchema;

	const estimateCostForm = useForm<z.infer<typeof estimateCostSchema>>({
		resolver: zodResolver(estimateCostSchema),
		defaultValues: {
			amount: 0,
			auction: "",
			shipping_line: 0,
			shipping_type: 0,
			source: 0,
			vin: "",
			destination_country: "",
			destination_port: "",
			warehouse: 0,
		},
	});

	const onGetEstimateCost = (values: z.infer<typeof estimateCostSchema>) => {
		getEstimateCost(values);
	};

	return {
		onGetEstimateCost,
		estimateCostForm,
		isGettingEstimateCost,
		estimateCost,
	};
};
