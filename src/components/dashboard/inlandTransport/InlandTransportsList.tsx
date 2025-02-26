import { InlandTransportsColumns } from "./InlandTransportsColumns";
import { InlandTransportsDataTable } from "./InlandTransportsDataTable";
import { useGetInlandTransports } from "../hooks/inlandTransports/useGetInlandTransports";
import { t } from "i18next";
import { useInlandTransportFiltersStore } from "@/state/inlandTransport.state";

export const InlandTransportsList = () => {
	const { source_id, warehouse_id } = useInlandTransportFiltersStore();

	const {
		inlandTransports,
		isLoadingInlandTransports,
		pagination,
		total_pages,
		setPagination,
	} = useGetInlandTransports({ source_id, warehouse_id });

	return (
		<div className="container h-auto sm:min-h-[calc(100vh-96px-40px)]">
			<div className="text-4xl font-bold w-fit mx-auto my-10">
				<span className="text-blue">{t("dashboard.Inland transports")}</span>
			</div>

			<InlandTransportsDataTable
				columns={InlandTransportsColumns}
				data={inlandTransports || []}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={isLoadingInlandTransports}
				pageCount={total_pages || 0}
			/>
		</div>
	);
};
