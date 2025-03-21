import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TCountry } from "../../types";

type TPortsByCountriesFilters = {
	country?: string;
	limit?: number | null;
	page?: number | null;
};
export const useGetPortsCountriesBy = (
	filters: TPortsByCountriesFilters = {}
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
		...(filters.country && { country: filters.country }),
	};

	const queryParams = params ? new URLSearchParams(params) : "";

	const { data, isLoading: isLoadingPorts } = useApiQuery<TCountry[]>({
		queryKey: [
			"ports",
			{
				...params,
				pageIndex: pagination.pageIndex,
				pageSize: pagination.pageSize,
			},
		],
		requestURL: `/destinations/get?${queryParams}`,
		enabled: !!filters.country,
	});

	return {
		ports: data?.data,
		isLoadingPorts,
		pagination,
		setPagination,
		total_rows: data?.total_rows,
		total_pages: data?.total_pages,
		current_page: data?.current_page,
		limit: data?.limit,
	};
};
