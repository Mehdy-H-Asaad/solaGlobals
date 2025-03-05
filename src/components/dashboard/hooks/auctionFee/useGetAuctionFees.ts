import { useApiQuery } from "@/api/useApiQuery";
import { TAuctionFee } from "@/components/dashboard/types";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

type TAuctionFeesFilters = {
	limit?: number | null;
	page?: number | null;
};

export const useGetAuctionFees = (
	filters: TAuctionFeesFilters = {},
	auction: "COPART" | "IAAI" | null
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
		auction: auction ? auction : "",
	};

	const queryParams = params ? new URLSearchParams(params) : "";

	const { data, isLoading: isLoadingAuctionFees } = useApiQuery<TAuctionFee[]>({
		queryKey: [
			"auctionFees",
			{
				...params,
				pageIndex: pagination.pageIndex,
				pageSize: pagination.pageSize,
			},
			,
			auction,
		],
		requestURL: `/auction-fees/get?${queryParams}`,
	});

	return {
		pagination,
		setPagination,
		auctionFees: data?.data,
		isLoadingAuctionFees,
		total_rows: data?.total_rows,
		total_pages: data?.total_pages,
		current_page: data?.current_page,
		limit: data?.limit,
	};
};
