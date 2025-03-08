export type TAdmin = {
	username: string;
	id: number;
	token: string;
};

export type TAdminLoginDTO = {
	username: string;
	password: string;
};

export type TSendEmailDTO = {
	name: string;
	subject?: string;
	phone: string;
	email: string;
	message: string;
};

export type TCreateEstimateCostDTO = {
	amount: number;
	auction: string;
	source: number;
	warehouse: number;
	shipping_line: number;
	shipping_type: number;
	vin?: string;
	destination_port: string;
	destination_country: string;
};

export type TGetEstimateCost = {
	manufacturer: string;
	country: string;
	year: number;
	amount: number;
	inland_transport_cost: number;
	maritime_transport_cost: number;
	auction_fee: number;
	company_fee: number;
	total_cost: number;
};
