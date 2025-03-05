import { useFiltersStore } from "@/state/filters.state";
import { useGetCountries } from "../hooks/countries/useGetCountries";
import Select from "react-select";
import { t } from "i18next";
export const FilterCountries = () => {
	const { countries } = useGetCountries({ page: null, limit: null });

	const filteredCountries = [
		{ label: "None", value: "" },
		...new Map(
			countries?.map(country => [
				country.country,
				{ label: country.country, value: country.country },
			])
		).values(),
	];

	const filteredPorts = [
		{ label: "None", value: "" },
		...new Map(
			countries?.map(country => [
				country.port,
				{ label: country.port, value: country.port },
			])
		).values(),
	];

	const { setFilters } = useFiltersStore();

	return (
		<div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
			<Select
				isSearchable={true}
				options={filteredCountries}
				className="w-full sm:basis-full md:basis-[calc((100%/3)-20px)] basic-single"
				classNamePrefix="select"
				name="country"
				placeholder={t("dashboard.country")}
				onChange={option => setFilters({ country: option?.value ?? "" })}
			/>
			<Select
				isSearchable={true}
				options={filteredPorts}
				className="w-full sm:basis-full md:basis-[calc((100%/3)-20px)] basic-single"
				classNamePrefix="select"
				name="port"
				placeholder={t("dashboard.port")}
				onChange={option => setFilters({ port: option?.value ?? "" })}
			/>
		</div>
	);
};
