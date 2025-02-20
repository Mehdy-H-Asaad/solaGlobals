import { useState } from "react";
import { useGetDestinations } from "../../destination/useGetDestinations";
import { useGetShippingLines } from "../../shppingLines/useGetShippingLines";

export const useUpdateMaritimeTransportForm = () => {
	const [shippingLineSearch, setShippingLineSearch] = useState<string>("");
	const [warehouseSearch, setWarehouseSearch] = useState<string>("");
	const [isShippingLineDropdownOpen, setIsShippingLineDropdownOpen] =
		useState<boolean>(false);
	const [isWarehouseDropdownOpen, setIsWarehouseDropdownOpen] =
		useState<boolean>(false);

	const { shippingLines, isLoadingShippingLines } = useGetShippingLines();
	const { destinations, isLoadingWarehouses } = useGetDestinations();

	const filteredshippingLines = shippingLines?.filter(shippingLine =>
		shippingLine.name.toLowerCase().includes(shippingLineSearch.toLowerCase())
	);

	const filteredDestinations = destinations?.filter(destination =>
		destination.state.toLowerCase().includes(warehouseSearch.toLowerCase())
	);

	const isValidShippingLine = filteredshippingLines?.some(
		source => source.name.toLowerCase() === shippingLineSearch.toLowerCase()
	);
	const isValidDestination = filteredDestinations?.some(
		destination =>
			destination.state.toLowerCase() === warehouseSearch.toLowerCase()
	);

	const isFormValid = isValidShippingLine && isValidDestination;

	return {
		isLoadingShippingLines,
		filteredDestinations,
		filteredshippingLines,
		destinations,
		isFormValid,
		warehouseSearch,
		shippingLineSearch,
		isLoadingWarehouses,
		setShippingLineSearch,
		setWarehouseSearch,
		isShippingLineDropdownOpen,
		setIsShippingLineDropdownOpen,
		isWarehouseDropdownOpen,
		setIsWarehouseDropdownOpen,
		shippingLines,
	};
};
