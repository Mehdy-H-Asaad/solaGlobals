import Select from "react-select";
import { t } from "i18next";
import { useFiltersStore } from "@/state/filters.state";
import { useGetInlandTransports } from "../hooks/inlandTransports/useGetInlandTransports";

export const FilterInlandTransports = () => {
	const { inlandTransports } = useGetInlandTransports();

	const filteredSourceStates = [
		...new Map(
			inlandTransports?.map(source => [
				source.source_state,
				{ label: source.source_state, value: source.source_state },
			])
		).values(),
	];

	const filteredSourcesZipCode = [
		...new Map(
			inlandTransports?.map(source => [
				source.source_zipcode,
				{ label: source.source_zipcode, value: source.source_zipcode },
			])
		).values(),
	];

	const filteredSourcesAddress = [
		...new Map(
			inlandTransports?.map(source => [
				source.source_address,
				{ label: source.source_address, value: source.source_address },
			])
		).values(),
	];
	const filteredSourcesCities = [
		...new Map(
			inlandTransports?.map(source => [
				source.source_city,
				{ label: source.source_city, value: source.source_city },
			])
		).values(),
	];

	const filteredDestinationsStates = [
		...new Map(
			inlandTransports?.map(warehouse => [
				warehouse.warehouse_state,
				{ label: warehouse.warehouse_state, value: warehouse.warehouse_state },
			])
		).values(),
	];

	const filteredDestinationsZipcode = [
		...new Map(
			inlandTransports?.map(warehouse => [
				warehouse.source_zipcode,
				{ label: warehouse.source_zipcode, value: warehouse.source_zipcode },
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
				options={filteredDestinationsStates}
				className="w-full sm:basis-full md:basis-1/4 basic-single"
				classNamePrefix="select"
				name="warehouseStates"
				placeholder={t("dashboard.warehouseState")}
				onChange={option => setFilters({ warehouse_state: option?.value })}
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
			<Select
				isSearchable={true}
				options={filteredDestinationsZipcode}
				className="w-full sm:basis-full md:basis-1/4 basic-single"
				classNamePrefix="select"
				name="warehouseZipcode"
				placeholder={t("dashboard.warehouseZip")}
				onChange={option => setFilters({ source_zipcode: option?.value })}
			/>
		</div>
	);
};
