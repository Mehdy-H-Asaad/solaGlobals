import { InlandTransportsColumns } from "./InlandTransportsColumns";
import { InlandTransportsDataTable } from "./InlandTransportsDataTable";
import { useGetInlandTransports } from "../hooks/inlandTransports/useGetInlandTransports";
import { t } from "i18next";

export const InlandTransportsList = () => {
	const {
		inlandTransports,
		isLoadingInlandTransports,
		pagination,
		total_pages,
		setPagination,
	} = useGetInlandTransports();

	return (
		<div className="container">
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
