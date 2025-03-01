import { t } from "i18next";
import { useFiltersStore } from "@/state/filters.state";
import { useGetCountries } from "../hooks/countries/useGetCountries";
import { CountriesDataTable } from "./CountriesDataTabe";
import { CountriesColumns } from "./CountriesColumns";

export const CountriesList = () => {
	const { country, port } = useFiltersStore();

	const {
		countries,
		isLoadingCountries,
		pagination,
		setPagination,
		total_pages,
	} = useGetCountries({ country, port });

	return (
		<div className="container h-auto sm:min-h-[calc(100vh-96px-40px)]">
			<div className="text-4xl font-bold w-fit mx-auto my-10">
				<span className="text-blue">{t("dashboard.destinations")}</span>
			</div>

			<CountriesDataTable
				columns={CountriesColumns}
				data={countries || []}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={isLoadingCountries}
				pageCount={total_pages || 0}
			/>
		</div>
	);
};
