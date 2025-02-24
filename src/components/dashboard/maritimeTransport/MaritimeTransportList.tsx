import { t } from "i18next";
import { useGetMaritimeTransports } from "../hooks/maritimeTransports/useGetMaritimeTransports";
import { MaritimeTransportsColumns } from "./MaritimeTransportColumns";
import { MaritimeTransportsDataTable } from "./MaritimeTransportDataTable";

export const MaritimeTransportsList = () => {
	const {
		isLoadingMaritimeTransports,
		maritimeTransports,
		pagination,
		total_pages,
		setPagination,
	} = useGetMaritimeTransports();

	return (
		<div className="container">
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
