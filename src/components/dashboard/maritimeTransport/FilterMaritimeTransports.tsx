import { useFiltersStore } from "@/state/filters.state";
import { useGetMaritimeTransports } from "../hooks/maritimeTransports/useGetMaritimeTransports";
import Select from "react-select";
import { t } from "i18next";
export const FilterMaritimeTransports = () => {
	const { maritimeTransports } = useGetMaritimeTransports();

	const filteredWarehouses = [
		...new Map(
			maritimeTransports?.map(maritimeTransport => [
				maritimeTransport.warehouse_id,
				{
					label: maritimeTransport.warehouse_state,
					value: maritimeTransport.warehouse_id,
				},
			])
		).values(),
	];

	const filteredShippingLines = [
		...new Map(
			maritimeTransports?.map(maritimeTransport => [
				maritimeTransport.shipping_line_id,
				{
					label: maritimeTransport.shipping_line_name,
					value: maritimeTransport.shipping_line_id,
				},
			])
		).values(),
	];

	const filteredDestinations = [
		...new Map(
			maritimeTransports?.map(maritimeTransport => [
				maritimeTransport.destination_id,
				{
					label: maritimeTransport.destination_country,
					value: maritimeTransport.destination_id,
				},
			])
		).values(),
	];

	const { setFilters } = useFiltersStore();

	return (
		<div className="flex flex-col sm:flex-row-reverse gap-5 justify-end flex-wrap">
			<Select
				isSearchable={true}
				options={filteredWarehouses}
				className="w-full sm:basis-full md:basis-1/4 basic-single"
				classNamePrefix="select"
				name="warehouse"
				placeholder={t("dashboard.warehouseState")}
				onChange={option => setFilters({ warehouse_id: option?.value })}
			/>
			<Select
				isSearchable={true}
				options={filteredShippingLines}
				className="w-full sm:basis-full md:basis-1/4 basic-single"
				classNamePrefix="select"
				name="shippingLine"
				placeholder={t("dashboard.shippingLine")}
				onChange={option => setFilters({ shipping_line_id: option?.value })}
			/>
			<Select
				isSearchable={true}
				options={filteredDestinations}
				className="w-full sm:basis-full md:basis-1/4 basic-single"
				classNamePrefix="select"
				name="destination"
				placeholder={t("dashboard.country")}
				onChange={option => setFilters({ destination_id: option?.value })}
			/>
		</div>
	);
};
