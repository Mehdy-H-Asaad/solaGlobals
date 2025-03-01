import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TCountry } from "../../types";

export type TCountriesFilters = {
	country?: string;
	port?: string;
};

export const useGetCountries = (filters: TCountriesFilters = {}) => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const queryParams = {
		page: (pagination.pageIndex + 1).toString(),
		limit: pagination.pageSize.toString(),
		...(filters.country && { country: filters.country }),
		...(filters.port && { port: filters.port }),
	};

	const { data, isLoading: isLoadingCountries } = useApiQuery<TCountry[]>({
		queryKey: ["countries", queryParams],
		requestURL: `/destinations/get?${new URLSearchParams(queryParams)}`,
	});

	return {
		countries: data?.data,
		isLoadingCountries,
		pagination,
		setPagination,
		total_rows: data?.total_rows,
		total_pages: data?.total_pages,
		current_page: data?.current_page,
		limit: data?.limit,
	};
};
