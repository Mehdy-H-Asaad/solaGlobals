import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TDestination } from "../../types";

export const useGetDestinations = () => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const queryParams = {
		page: (pagination.pageIndex + 1).toString(),
		limit: pagination.pageSize.toString(),
	};

	const { data, isLoading: isLoadingWarehouses } = useApiQuery<TDestination[]>({
		queryKey: ["warehouses", queryParams],
		requestURL: `/warehouses/get?${new URLSearchParams(queryParams)}`,
	});

	return {
		destinations: data?.data,
		isLoadingWarehouses,
		pagination,
		setPagination,
		total_rows: data?.total_rows,
		total_pages: data?.total_pages,
		current_page: data?.current_page,
		limit: data?.limit,
	};
};
