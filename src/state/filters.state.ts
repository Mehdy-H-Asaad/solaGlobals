import { create } from "zustand";

type TFilters = {
	source_state?: string;
	source_city?: string;
	source_address?: string;
	source_zipcode?: string;
	warehouse_state?: string;
	warehouse_zipcode?: string;
	country?: string;
	port?: string;
	shipping_line_id?: number;
	destination_id?: number;
	warehouse_id?: number;
	destination_country?: string;
	destination_port?: string;
	source_id?: number;
};

export type TFiltersStore = {
	source_state?: string;
	source_city?: string;
	source_address?: string;
	source_zipcode?: string;
	warehouse_state?: string;
	warehouse_zipcode?: string;
	country?: string;
	port?: string;
	shipping_line_id?: number;
	destination_id?: number;
	warehouse_id?: number;
	destination_country?: string;
	destination_port?: string;
	source_id?: number;
	setFilters: (filters: TFilters) => void;
};

export const useFiltersStore = create<TFiltersStore>(set => ({
	setFilters: (filters: TFilters) =>
		set(prev => ({
			...prev,
			...(filters.source_state && { source_state: filters.source_state }),
			...(filters.source_city && { source_city: filters.source_city }),
			...(filters.warehouse_zipcode && {
				warehouse_zipcode: filters.warehouse_zipcode,
			}),
			...(filters.warehouse_state && {
				warehouse_state: filters.warehouse_state,
			}),
			...(filters.source_zipcode && {
				source_zipcode: filters.source_zipcode,
			}),
			...(filters.source_address && {
				source_address: filters.source_address,
			}),
			...(filters.country && {
				country: filters.country,
			}),
			...(filters.port && {
				port: filters.port,
			}),
			...(filters.destination_id && {
				destination_id: filters.destination_id,
			}),
			...(filters.warehouse_id && {
				warehouse_id: filters.warehouse_id,
			}),
			...(filters.shipping_line_id && {
				shipping_line_id: filters.shipping_line_id,
			}),
			...(filters.destination_country && {
				destination_country: filters.destination_country,
			}),
			...(filters.destination_port && {
				destination_port: filters.destination_port,
			}),
			...(filters.source_id && {
				source_id: filters.source_id,
			}),
		})),
}));
