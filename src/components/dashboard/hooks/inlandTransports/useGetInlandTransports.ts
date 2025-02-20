import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TInlandTransports } from "../../types";
export const useGetInlandTransports = () => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const queryParams = {
		page: (pagination.pageIndex + 1).toString(),
		limit: pagination.pageSize.toString(),
	};

	const { data, isLoading: isLoadingInlandTransports } = useApiQuery<
		TInlandTransports[]
	>({
		queryKey: ["inlandTransports", queryParams],
		requestURL: `/inland-transport/get?${new URLSearchParams(queryParams)}`,
	});

	return {
		pagination,
		setPagination,
		inlandTransports: data?.data,
		isLoadingInlandTransports,
		total_rows: data?.total_rows,
		total_pages: data?.total_pages,
		current_page: data?.current_page,
		limit: data?.limit,
	};
};
