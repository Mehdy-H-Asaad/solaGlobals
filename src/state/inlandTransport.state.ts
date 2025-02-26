import { create } from "zustand";

type TFilters = {
	source_id?: string;
	warehouse_id?: string;
};

export type TInlandTransportsStore = {
	source_id?: string;
	warehouse_id?: string;
	setFilters: (filters: TFilters) => void;
};

export const useInlandTransportFiltersStore = create<TInlandTransportsStore>(
	set => ({
		source_id: "",
		warehouse_id: "",
		setFilters: (filters: TFilters) =>
			set(prev => ({
				...prev,
				...(filters.source_id && { source_id: filters.source_id }),
				...(filters.warehouse_id && { warehouse_id: filters.warehouse_id }),
			})),
	})
);
