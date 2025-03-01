import { useFiltersStore } from "@/state/filters.state";
import { useGetCountries } from "../hooks/countries/useGetCountries";
import Select from "react-select";
import { t } from "i18next";
export const FilterCountries = () => {
	const { countries } = useGetCountries();

	const filteredCountries = [
		...new Map(
			countries?.map(country => [
				country.country,
				{ label: country.country, value: country.country },
			])
		).values(),
	];

	const filteredPorts = [
		...new Map(
			countries?.map(country => [
				country.port,
				{ label: country.port, value: country.port },
			])
		).values(),
	];

	const { setFilters } = useFiltersStore();

	return (
		<div className="flex flex-col sm:flex-row-reverse gap-5 justify-end">
			<Select
				isSearchable={true}
				options={filteredCountries}
				className="w-full sm:basis-full md:basis-[calc((100%/3)-20px)] basic-single"
				classNamePrefix="select"
				name="country"
				placeholder={t("dashboard.country")}
				onChange={option => setFilters({ country: option?.value })}
			/>
			<Select
				isSearchable={true}
				options={filteredPorts}
				className="w-full sm:basis-full md:basis-[calc((100%/3)-20px)] basic-single"
				classNamePrefix="select"
				name="port"
				placeholder={t("dashboard.port")}
				onChange={option => setFilters({ port: option?.value })}
			/>
		</div>
	);
};
