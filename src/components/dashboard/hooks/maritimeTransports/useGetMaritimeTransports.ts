import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TMaritimeTransports } from "../../types";

export const useGetMaritimeTransports = () => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const queryParams = {
		page: (pagination.pageIndex + 1).toString(),
		limit: pagination.pageSize.toString(),
	};

	const { data, isLoading: isLoadingMaritimeTransports } = useApiQuery<
		TMaritimeTransports[]
	>({
		queryKey: ["maritimeTransports", queryParams],
		requestURL: `/maritime-transport/get?${new URLSearchParams(queryParams)}`,
	});

	return {
		pagination,
		setPagination,
		maritimeTransports: data?.data,
		isLoadingMaritimeTransports,
		total_rows: data?.total_rows,
		total_pages: data?.total_pages,
		current_page: data?.current_page,
		limit: data?.limit,
	};
};
