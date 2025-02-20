import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TShippingLine } from "../../types";

export const useGetShippingLines = () => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const queryParams = {
		page: (pagination.pageIndex + 1).toString(),
		limit: pagination.pageSize.toString(),
	};

	const { data, isLoading: isLoadingShippingLines } = useApiQuery<
		TShippingLine[]
	>({
		queryKey: ["shippingLines", queryParams],
		requestURL: `/shipping-lines/get?${new URLSearchParams(queryParams)}`,
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
