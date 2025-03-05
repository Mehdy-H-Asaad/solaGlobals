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
	limit?: number | null;
	page?: number | null;
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
	limit?: number | null;
	page?: number | null;
	setFilters: (filters: TFilters) => void;
};

export const useFiltersStore = create<TFiltersStore>(set => ({
	setFilters: (filters: TFilters) =>
		set(prev => ({
			...prev,
			...(filters.source_state !== undefined && {
				source_state: filters.source_state,
			}),
			...(filters.source_city !== undefined && {
				source_city: filters.source_city,
			}),
			...(filters.warehouse_zipcode !== undefined && {
				warehouse_zipcode: filters.warehouse_zipcode,
			}),
			...(filters.warehouse_state !== undefined && {
				warehouse_state: filters.warehouse_state,
			}),
			...(filters.source_zipcode !== undefined && {
				source_zipcode: filters.source_zipcode,
			}),
			...(filters.source_address !== undefined && {
				source_address: filters.source_address,
			}),
			...(filters.country !== undefined && {
				country: filters.country,
			}),
			...(filters.port !== undefined && {
				port: filters.port,
			}),
			...(filters.destination_id !== undefined && {
				destination_id: filters.destination_id,
			}),
			...(filters.warehouse_id !== undefined && {
				warehouse_id: filters.warehouse_id,
			}),
			...(filters.shipping_line_id !== undefined && {
				shipping_line_id: filters.shipping_line_id,
			}),
			...(filters.destination_country !== undefined && {
				destination_country: filters.destination_country,
			}),
			...(filters.destination_port !== undefined && {
				destination_port: filters.destination_port,
			}),
			...(filters.source_id !== undefined && {
				source_id: filters.source_id,
			}),
			// ...(filters.page && {
			// 	page: filters.page,
			// }),
			// ...(filters.limit && {
			// 	limit: filters.limit,
			// }),
		})),
}));
