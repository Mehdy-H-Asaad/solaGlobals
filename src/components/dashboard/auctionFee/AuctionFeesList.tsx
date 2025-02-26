import { useGetAuctionFees } from "../hooks/auctionFee/useGetAuctionFees";
import { useAuctionFeeStore } from "../state/auctionFee.state";
import { AuctinFeeColumns } from "./AuctionFeesColumns";
import { AuctionFeeDataTable } from "./AuctionFeesDataTable";

export const AuctionFeesList = () => {
	const { auctionFee } = useAuctionFeeStore();
	const {
		auctionFees,
		isLoadingAuctionFees,
		pagination,
		setPagination,
		total_pages,
	} = useGetAuctionFees(auctionFee);

	return (
		<div className="container h-auto sm:min-h-[calc(100vh-96px-40px)]">
			<div className="text-4xl font-bold w-fit mx-auto my-10">
				<span className="text-blue capitalize">{auctionFee}</span>
			</div>

			<AuctionFeeDataTable
				columns={AuctinFeeColumns}
				data={auctionFees || []}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={isLoadingAuctionFees}
				pageCount={total_pages || 0}
			/>
		</div>
	);
};
