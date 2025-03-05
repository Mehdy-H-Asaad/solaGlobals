import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TSource } from "../../types";

type TSourceFilters = {
	source_state?: string;
	source_city?: string;
	source_address?: string;
	source_zipcode?: string;
	limit?: number | null;
	page?: number | null;
};

export const useGetSources = (filters: TSourceFilters = {}) => {
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
		...(filters.source_state && { source_state: filters.source_state }),
		...(filters.source_city && { source_city: filters.source_city }),
		...(filters.source_zipcode && { source_zipcode: filters.source_zipcode }),
		...(filters.source_address && { source_address: filters.source_address }),
	};

	const queryParams = params ? new URLSearchParams(params) : "";

	const { data, isLoading: isLoadingSources } = useApiQuery<TSource[]>({
		queryKey: [
			"sources",
			{
				...params,
				pageIndex: pagination.pageIndex,
				pageSize: pagination.pageSize,
			},
		],
		requestURL: `/sources/get?${queryParams}`,
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
