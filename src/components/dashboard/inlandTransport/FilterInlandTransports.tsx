import Select from "react-select";
import { t } from "i18next";
import { useFiltersStore } from "@/state/filters.state";
import { useGetInlandTransports } from "../hooks/inlandTransports/useGetInlandTransports";

export const FilterInlandTransports = () => {
	const { inlandTransports } = useGetInlandTransports();

	const filteredSourceStates = [
		{ label: "None", value: "" },
		...new Map(
			inlandTransports?.map(source => [
				source.source_state,
				{ label: source.source_state, value: source.source_state },
			])
		).values(),
	];

	const filteredSourcesZipCode = [
		{ label: "None", value: "" },
		...new Map(
			inlandTransports?.map(source => [
				source.source_zipcode,
				{ label: source.source_zipcode, value: source.source_zipcode },
			])
		).values(),
	];

	const filteredSourcesAddress = [
		{ label: "None", value: "" },
		...new Map(
			inlandTransports?.map(source => [
				source.source_address,
				{ label: source.source_address, value: source.source_address },
			])
		).values(),
	];
	const filteredSourcesCities = [
		{ label: "None", value: "" },
		...new Map(
			inlandTransports?.map(source => [
				source.source_city,
				{ label: source.source_city, value: source.source_city },
			])
		).values(),
	];

	const filteredDestinationsStates = [
		{ label: "None", value: "" },
		...new Map(
			inlandTransports?.map(warehouse => [
				warehouse.warehouse_state,
				{ label: warehouse.warehouse_state, value: warehouse.warehouse_state },
			])
		).values(),
	];

	const filteredDestinationsZipcode = [
		{ label: "None", value: "" },
		...new Map(
			inlandTransports?.map(warehouse => [
				warehouse.source_zipcode,
				{ label: warehouse.source_zipcode, value: warehouse.source_zipcode },
			])
		).values(),
	];

	const { setFilters } = useFiltersStore();

	return (
		<div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
			<Select
				isSearchable={true}
				options={filteredSourceStates}
				className="basic-single"
				classNamePrefix="select"
				name="sourceState"
				placeholder={t("dashboard.sourceState")}
				onChange={option => setFilters({ source_state: option?.value ?? "" })}
			/>
			<Select
				isSearchable={true}
				options={filteredSourcesCities}
				className="basic-single"
				classNamePrefix="select"
				name="sourceCity"
				placeholder={t("dashboard.sourceCity")}
				onChange={option => setFilters({ source_city: option?.value ?? "" })}
			/>
			<Select
				isSearchable={true}
				options={filteredSourcesAddress}
				className="basic-single"
				classNamePrefix="select"
				name="sourceAddress"
				placeholder={t("dashboard.sourceAddress")}
				onChange={option => setFilters({ source_address: option?.value ?? "" })}
			/>
			<Select
				isSearchable={true}
				options={filteredSourcesZipCode}
				className="basic-single"
				classNamePrefix="select"
				name="sourceZipcode"
				placeholder={t("dashboard.sourceZip")}
				onChange={option => setFilters({ source_zipcode: option?.value ?? "" })}
			/>
			<Select
				isSearchable={true}
				options={filteredDestinationsStates}
				className="basic-single"
				classNamePrefix="select"
				name="warehouseStates"
				placeholder={t("dashboard.warehouseState")}
				onChange={option =>
					setFilters({ warehouse_state: option?.value ?? "" })
				}
			/>

			<Select
				isSearchable={true}
				options={filteredDestinationsZipcode}
				className="basic-single"
				classNamePrefix="select"
				name="warehouseZipcode"
				placeholder={t("dashboard.warehouseZip")}
				onChange={option => setFilters({ source_zipcode: option?.value ?? "" })}
			/>
		</div>
	);
};
