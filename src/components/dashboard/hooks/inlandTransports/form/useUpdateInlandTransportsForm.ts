import { useState } from "react";
import { useGetDestinations } from "../../destination/useGetDestinations";
import { useGetSources } from "../../source/useGetSources";

export const useUpdateInlandTransportForm = () => {
	const [sourceSearch, setSourceSearch] = useState("");
	const [warehouseSearch, setWarehouseSearch] = useState("");
	const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
	const [isWarehouseDropdownOpen, setIsWarehouseDropdownOpen] = useState(false);

	const { sources, isLoadingSources } = useGetSources();
	const { destinations, isLoadingWarehouses } = useGetDestinations();

	const filteredSources = sources?.filter(source =>
		source.state.toLowerCase().includes(sourceSearch.toLowerCase())
	);

	const filteredDestinations = destinations?.filter(destination =>
		destination.state.toLowerCase().includes(warehouseSearch.toLowerCase())
	);

	const isValidSource = filteredSources?.some(
		source => source.state.toLowerCase() === sourceSearch.toLowerCase()
	);
	const isValidDestination = filteredDestinations?.some(
		destination =>
			destination.state.toLowerCase() === warehouseSearch.toLowerCase()
	);

	const isFormValid = isValidSource && isValidDestination;

	return {
		isLoadingSources,
		filteredDestinations,
		filteredSources,
		destinations,
		isFormValid,
		warehouseSearch,
		sourceSearch,
		isLoadingWarehouses,
		setSourceSearch,
		setWarehouseSearch,
		isSourceDropdownOpen,
		setIsSourceDropdownOpen,
		isWarehouseDropdownOpen,
		setIsWarehouseDropdownOpen,
		sources,
	};
};
