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
	auction: number;
	source: number;
	warehouse: number;
	shipping_line: number;
	shipping_type: number;
	vin?: string;
};

export type TGetEstimateCost = {
	manufacturer: string;
	country: string;
	year: number;
	cost: number;
};
