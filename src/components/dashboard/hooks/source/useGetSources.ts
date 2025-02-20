import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TSource } from "../../types";

export const useGetSources = () => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const queryParams = {
		page: (pagination.pageIndex + 1).toString(),
		limit: pagination.pageSize.toString(),
	};

	const { data, isLoading: isLoadingSources } = useApiQuery<TSource[]>({
		queryKey: ["sources", queryParams],
		requestURL: `/sources/get?${new URLSearchParams(queryParams)}`,
	});

	return {
		pagination,
		setPagination,
		sources: data?.data,
		isLoadingSources,
		total_rows: data?.total_rows,
		total_pages: data?.total_pages,
		current_page: data?.current_page,
		limit: data?.limit,
	};
};
