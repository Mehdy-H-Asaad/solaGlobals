import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TShippingLine } from "../../types";

type TShippingLinesFilters = {
	limit?: number | null;
	page?: number | null;
};

export const useGetShippingLines = (filters: TShippingLinesFilters = {}) => {
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
	};

	const queryParams = params ? new URLSearchParams(params) : "";

	const { data, isLoading: isLoadingShippingLines } = useApiQuery<
		TShippingLine[]
	>({
		queryKey: [
			"shippingLines",
			{
				...params,
				pageIndex: pagination.pageIndex,
				pageSize: pagination.pageSize,
			},
		],
		requestURL: `/shipping-lines/get?${queryParams}`,
	});

	return {
		pagination,
		setPagination,
		shippingLines: data?.data,
		isLoadingShippingLines,
		total_rows: data?.total_rows,
		total_pages: data?.total_pages,
		current_page: data?.current_page,
		limit: data?.limit,
	};
};
