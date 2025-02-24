export type TSource = {
	id: string;
	state: string;
	city?: string;
	address?: string;
	zipcode?: string;
	totalPages?: number;
};
export type TInlandTransports = {
	id: number;
	source_id: number;
	source_state: string;
	source_city: string;
	source_address: string;
	source_zipcode: string;
	warehouse_id: number;
	warehouse_state: string;
	warehouse_zipcode: string;
	cost: number;
};
export type TMaritimeTransports = {
	id: number;
	warehouse_id: number;
	warehouse_state: string;
	warehouse_zipcode: string;
	shipping_line_id: number;
	shipping_line_name: string;
	cost: number;
};
export type TShippingLine = {
	id: number;
	name: string;
};
export type TUsers = {
	username: string;
	created_at: string;
};
export type TAuctionFee = {
	id: number;
	range_from: number;
	range_to: number;
	fee: number;
	auction: number;
};
export type TDestination = TSource;
export type TAdditionalFee = {
	additional_fee: number;
};

export type TCreateDestinationDTO = Omit<TSource, "id">;
export type TCreateSourceDTO = Omit<TSource, "id">;
export type TCreateInlandTransportDTO = Pick<
	TInlandTransports,
	"source_id" | "warehouse_id" | "cost"
>;
export type TCreateMaritimeTransportDTO = Pick<
	TMaritimeTransports,
	"shipping_line_id" | "warehouse_id" | "cost"
>;
export type TCreateShippingLineDTO = Pick<TShippingLine, "name">;
export type TCreateAdminDTO = {
	username: string;
	password: string;
};

export type TUpdateMaritimeTransportsDTO = TCreateMaritimeTransport;
export type TUpdateSourceDTO = Omit<TSource, "id">;
export type TUpdateDestinationDTO = Omit<TSource, "id">;
export type TUpdateInlandTransportsDTO = TCreateInlandTransportDTO;
export type TUpdateShippingLineDTO = TCreateShippingLineDTO;
export type TUpdateAuctionFeeDTO = Pick<TAuctionFee, "fee">;
export type TUpdateAdditionalFeeDTO = {
	additional_fee: number;
};
