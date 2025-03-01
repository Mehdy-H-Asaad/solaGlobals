import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TSource } from "../../types";

type TSourceFilters = {
	source_state?: string;
	source_city?: string;
	source_address?: string;
	source_zipcode?: string;
};

export const useGetSources = (filters: TSourceFilters = {}) => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const queryParams = {
		page: (pagination.pageIndex + 1).toString(),
		limit: pagination.pageSize.toString(),
		...(filters.source_state && { source_state: filters.source_state }),
		...(filters.source_city && { source_city: filters.source_city }),
		...(filters.source_zipcode && { source_zipcode: filters.source_zipcode }),
		...(filters.source_address && { source_address: filters.source_address }),
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
