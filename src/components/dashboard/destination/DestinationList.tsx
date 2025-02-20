import { DestiantionColumns } from "./DestinationColumns";
import { DestinationDataTable } from "./DestinationDataTable";
import { useGetDestinations } from "../hooks/destination/useGetDestinations";

export const DestinationList = () => {
	const { destinations, isLoadingWarehouses, pagination, setPagination } =
		useGetDestinations();

	return (
		<div className="container">
			<div className="text-4xl font-bold w-fit mx-auto my-10">
				<span className="text-blue">Warehouses</span>
			</div>

			<DestinationDataTable
				columns={DestiantionColumns}
				data={destinations || []}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={isLoadingWarehouses}
			/>
		</div>
	);
};
