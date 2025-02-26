import { DestiantionColumns } from "./DestinationColumns";
import { DestinationDataTable } from "./DestinationDataTable";
import { useGetDestinations } from "../hooks/destination/useGetDestinations";
import { t } from "i18next";

export const DestinationList = () => {
	const {
		destinations,
		isLoadingWarehouses,
		total_pages,
		pagination,
		setPagination,
	} = useGetDestinations();

	return (
		<div className="container h-auto sm:min-h-[calc(100vh-96px-40px)]">
			<div className="text-4xl font-bold w-fit mx-auto my-10">
				<span className="text-blue">{t("dashboard.Warehouses")}</span>
			</div>

			<DestinationDataTable
				columns={DestiantionColumns}
				data={destinations || []}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={isLoadingWarehouses}
				pageCount={total_pages || 0}
			/>
		</div>
	);
};
