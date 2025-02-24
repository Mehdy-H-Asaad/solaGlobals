import { SourceColumns } from "./SourceColumns";
import { SourceDataTable } from "./SourceDataTable";
import { useGetSources } from "../hooks/source/useGetSources";
import { t } from "i18next";

export const SourceList = () => {
	const { isLoadingSources, pagination, total_pages, setPagination, sources } =
		useGetSources();

	return (
		<div className="container">
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
