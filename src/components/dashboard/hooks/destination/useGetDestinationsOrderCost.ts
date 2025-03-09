import { useApiQuery } from "@/api/useApiQuery";
import { TDestination } from "../../types";

type TOrderCostFilters = {
	shipping_line_id?: number;
	destination_country?: string;
	destination_port?: string;
	source_id?: number;
};
export const useGetDestinationsOrderCost = (
	filters: TOrderCostFilters = {}
) => {
	const queryParams = {
		...(filters.destination_country && {
			destination_country: filters.destination_country,
		}),
		...(filters.destination_port && {
			destination_port: filters.destination_port,
		}),
		...(filters.shipping_line_id && {
			shipping_line_id: filters.shipping_line_id.toString(),
		}),
		...(filters.source_id && {
			source_id: filters.source_id.toString(),
		}),
	};

	const { data, isLoading } = useApiQuery<TDestination[]>({
		queryKey: ["orderCost", queryParams],
		requestURL: `/warehouses/get/order-by-cost?${new URLSearchParams(
			queryParams
		)}`,
		enabled: !!filters.source_id,
	});

	return {
		destinationsByOrderCost: data?.data,
		isLoadingDestinationsByOrderCost: isLoading,
	};
};
