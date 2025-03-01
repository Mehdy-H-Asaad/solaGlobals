import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TMaritimeTransports } from "../../types";

export type TMaritimeTransportsFilters = {
	shipping_line_id?: number;
	destination_id?: number;
	warehouse_id?: number;
};

export const useGetMaritimeTransports = (
	filters: TMaritimeTransportsFilters = {}
) => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const queryParams = {
		page: (pagination.pageIndex + 1).toString(),
		limit: pagination.pageSize.toString(),
		...(filters.destination_id && {
			destination_id: filters.destination_id.toString(),
		}),
		...(filters.shipping_line_id && {
			shipping_line_id: filters.shipping_line_id.toString(),
		}),
		...(filters.warehouse_id && {
			warehouse_id: filters.warehouse_id.toString(),
		}),
	};

	const { data, isLoading: isLoadingMaritimeTransports } = useApiQuery<
		TMaritimeTransports[]
	>({
		queryKey: ["maritimeTransports", queryParams],
		requestURL: `/maritime-transport/get?${new URLSearchParams(queryParams)}`,
	});

	return {
		pagination,
		setPagination,
		maritimeTransports: data?.data,
		isLoadingMaritimeTransports,
		total_rows: data?.total_rows,
		total_pages: data?.total_pages,
		current_page: data?.current_page,
		limit: data?.limit,
	};
};
