import { SourceColumns } from "./SourceColumns";
import { SourceDataTable } from "./SourceDataTable";
import { useGetSources } from "../hooks/source/useGetSources";

export const SourceList = () => {
	const { isLoadingSources, pagination, setPagination, sources } =
		useGetSources();

	return (
		<div className="container">
			<div className="text-4xl font-bold w-fit mx-auto my-10">
				<span className="text-blue">Sources</span>
			</div>

			<SourceDataTable
				columns={SourceColumns}
				data={sources || []}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={isLoadingSources}
			/>
		</div>
	);
};
