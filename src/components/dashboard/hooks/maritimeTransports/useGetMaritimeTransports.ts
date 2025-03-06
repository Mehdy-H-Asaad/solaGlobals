import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TMaritimeTransports } from "../../types";

export type TMaritimeTransportsFilters = {
	shipping_line_id?: number;
	destination_id?: number;
	warehouse_id?: number;
	limit?: number | null;
	page?: number | null;
};

export const useGetMaritimeTransports = (
	filters: TMaritimeTransportsFilters = {}
) => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: filters.page || 0,
		pageSize: filters.limit || 10,
	});

	const params = {
		...(filters.page !== null && {
			page: (pagination.pageIndex + 1).toString(),
		}),
		...(filters.limit && {
			limit: pagination.pageSize.toString(),
		}),
		...(filters.shipping_line_id && {
			shipping_line_id: filters.shipping_line_id.toString(),
		}),
		...(filters.warehouse_id && {
			warehouse_id: filters.warehouse_id.toString(),
		}),
		...(filters.destination_id && {
			destination_id: filters.destination_id.toString(),
		}),
	};

	const queryParams = params ? new URLSearchParams(params) : "";

	const { data, isLoading: isLoadingMaritimeTransports } = useApiQuery<
		TMaritimeTransports[]
	>({
		queryKey: [
			"maritimeTransports",
			{
				...params,
				pageIndex: pagination.pageIndex,
				pageSize: pagination.pageSize,
			},
		],
		requestURL: `/maritime-transport/get?${queryParams}`,
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
