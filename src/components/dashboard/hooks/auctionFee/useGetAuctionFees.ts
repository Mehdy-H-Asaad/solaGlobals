import { useApiQuery } from "@/api/useApiQuery";
import { TAuctionFee } from "@/components/dashboard/types";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

export const useGetAuctionFees = (auction: "COPART" | "IAAI") => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const queryParams = {
		page: (pagination.pageIndex + 1).toString(),
		limit: pagination.pageSize.toString(),
		auction: auction,
	};

	const { data, isLoading: isLoadingAuctionFees } = useApiQuery<TAuctionFee[]>({
		queryKey: ["auctionFees", queryParams, auction],
		requestURL: `/auction-fees/get?${new URLSearchParams(queryParams)}`,
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
