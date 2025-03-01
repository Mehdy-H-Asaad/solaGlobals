import { SourceColumns } from "./SourceColumns";
import { SourceDataTable } from "./SourceDataTable";
import { useGetSources } from "../hooks/source/useGetSources";
import { t } from "i18next";
import { useFiltersStore } from "@/state/filters.state";

export const SourceList = () => {
	const { source_city, source_address, source_state, source_zipcode } =
		useFiltersStore();

	const { isLoadingSources, pagination, total_pages, setPagination, sources } =
		useGetSources({
			source_address,
			source_city,
			source_state,
			source_zipcode,
		});

	return (
		<div className="container h-auto sm:min-h-[calc(100vh-96px-40px)]">
			<div className="text-4xl font-bold w-fit mx-auto my-10">
				<span className="text-blue">{t("dashboard.Sources")}</span>
			</div>

			<SourceDataTable
				columns={SourceColumns}
				data={sources || []}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={isLoadingSources}
				pageCount={total_pages || 0}
			/>
		</div>
	);
};
