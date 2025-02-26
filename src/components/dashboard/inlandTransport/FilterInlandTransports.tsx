import Select from "react-select";
import { useGetDestinations } from "../hooks/destination/useGetDestinations";
import { useGetSources } from "../hooks/source/useGetSources";
import { t } from "i18next";
import { useInlandTransportFiltersStore } from "@/state/inlandTransport.state";

export const FilterInlandTransports = () => {
	const { destinations } = useGetDestinations();
	const { sources } = useGetSources();

	const formattedDestinations = destinations?.map(destination => ({
		label: destination.state,
		value: destination.id,
	}));
	const formattedSources = sources?.map(source => ({
		label: `${source.state} - ${source.city}`,
		value: source.id,
	}));

	const { setFilters } = useInlandTransportFiltersStore();

	return (
		<div className="flex flex-col md:flex-row  gap-10">
			<Select
				isSearchable={true}
				options={formattedSources}
				className="w-full md:w-40 basic-single"
				classNamePrefix="select"
				name="source"
				placeholder={t("dashboard.sourceState")}
				onChange={option => setFilters({ source_id: option?.value })}
			/>
			<Select
				isSearchable={true}
				options={formattedDestinations}
				className="w-full md:w-40 basic-single"
				classNamePrefix="select"
				name="destination"
				placeholder={t("dashboard.warehouseState")}
				onChange={option => setFilters({ warehouse_id: option?.value })}
			/>
		</div>
	);
};
