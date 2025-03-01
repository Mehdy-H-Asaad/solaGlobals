import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TInlandTransports } from "../../types";

type TFilters = {
	source_state?: string;
	source_city?: string;
	source_address?: string;
	source_zipcode?: string;
	warehouse_state?: string;
	warehouse_zipcode?: string;
};

export const useGetInlandTransports = (filters: TFilters = {}) => {
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
		...(filters.warehouse_zipcode && {
			warehouse_zipcode: filters.warehouse_zipcode,
		}),
		...(filters.warehouse_state && {
			warehouse_state: filters.warehouse_state,
		}),
		...(filters.source_address && { source_address: filters.source_address }),
	};

	console.log(queryParams);

	const { data, isLoading: isLoadingInlandTransports } = useApiQuery<
		TInlandTransports[]
	>({
		queryKey: ["inlandTransports", queryParams, filters],
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
