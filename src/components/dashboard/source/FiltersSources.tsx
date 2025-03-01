import { t } from "i18next";
import { useGetSources } from "../hooks/source/useGetSources";
import Select from "react-select";
import { useFiltersStore } from "@/state/filters.state";
export const FiltersSources = () => {
	const { sources } = useGetSources();

	const filteredSourceStates = [
		...new Map(
			sources?.map(source => [
				source.state,
				{ label: source.state, value: source.state },
			])
		).values(),
	];

	const filteredSourcesZipCode = [
		...new Map(
			sources?.map(source => [
				source.zipcode,
				{ label: source.zipcode, value: source.zipcode },
			])
		).values(),
	];

	const filteredSourcesAddress = [
		...new Map(
			sources?.map(source => [
				source.address,
				{ label: source.address, value: source.address },
			])
		).values(),
	];
	const filteredSourcesCities = [
		...new Map(
			sources?.map(source => [
				source.city,
				{ label: source.city, value: source.city },
			])
		).values(),
	];

	const { setFilters } = useFiltersStore();

	return (
		<div className="flex flex-col sm:flex-row-reverse gap-5 justify-end flex-wrap">
			<Select
				isSearchable={true}
				options={filteredSourceStates}
				className="w-full sm:basis-full md:basis-1/4 basic-single"
				classNamePrefix="select"
				name="sourceState"
				placeholder={t("dashboard.sourceState")}
				onChange={option => setFilters({ source_state: option?.value })}
			/>
			<Select
				isSearchable={true}
				options={filteredSourcesCities}
				className="w-full sm:basis-full md:basis-1/4 basic-single"
				classNamePrefix="select"
				name="sourceCity"
				placeholder={t("dashboard.sourceCity")}
				onChange={option => setFilters({ source_city: option?.value })}
			/>
			<Select
				isSearchable={true}
				options={filteredSourcesAddress}
				className="w-full sm:basis-full md:basis-1/4 basic-single"
				classNamePrefix="select"
				name="sourceAddress"
				placeholder={t("dashboard.sourceAddress")}
				onChange={option => setFilters({ source_address: option?.value })}
			/>
			<Select
				isSearchable={true}
				options={filteredSourcesZipCode}
				className="w-full sm:basis-full md:basis-1/4 basic-single"
				classNamePrefix="select"
				name="sourceZipcode"
				placeholder={t("dashboard.sourceZip")}
				onChange={option => setFilters({ source_zipcode: option?.value })}
			/>
		</div>
	);
};
