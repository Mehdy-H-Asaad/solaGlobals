import { useApiQuery } from "@/api/useApiQuery";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { TUsers } from "../../types";

export const useGetUsers = () => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const queryParams = {
		page: (pagination.pageIndex + 1).toString(),
		limit: pagination.pageSize.toString(),
	};

	const { data, isLoading: isLoadingUsers } = useApiQuery<TUsers[]>({
		queryKey: ["admin", queryParams],
		requestURL: `/users/get?${new URLSearchParams(queryParams)}`,
	});

	return {
		pagination,
		setPagination,
		users: data?.data,
		isLoadingUsers,
		total_rows: data?.total_rows,
		total_pages: data?.total_pages,
		current_page: data?.current_page,
		limit: data?.limit,
	};
};
