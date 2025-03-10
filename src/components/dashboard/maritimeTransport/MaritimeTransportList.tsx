import { t } from "i18next";
import { useGetMaritimeTransports } from "../hooks/maritimeTransports/useGetMaritimeTransports";
import { MaritimeTransportsColumns } from "./MaritimeTransportColumns";
import { MaritimeTransportsDataTable } from "./MaritimeTransportDataTable";
import { useFiltersStore } from "@/state/filters.state";

export const MaritimeTransportsList = () => {
	const { warehouse_id, destination_id, shipping_line_id } = useFiltersStore();

	const {
		isLoadingMaritimeTransports,
		maritimeTransports,
		pagination,
		total_pages,
		setPagination,
	} = useGetMaritimeTransports({
		destination_id,
		shipping_line_id,
		warehouse_id,
		limit: 100,
		page: 0,
	});

	return (
		<div className="container h-auto sm:min-h-[calc(100vh-96px-40px)]">
			<div className="text-4xl font-bold w-fit mx-auto my-10">
				<span className="text-blue">{t("dashboard.Maritime transports")}</span>
			</div>

			<MaritimeTransportsDataTable
				columns={MaritimeTransportsColumns}
				data={maritimeTransports || []}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={isLoadingMaritimeTransports}
				pageCount={total_pages || 0}
			/>
		</div>
	);
};
