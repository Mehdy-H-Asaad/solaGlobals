export type TAdmin = {
	username: string;
	id: number;
	token: string;
};

export type TAdminLoginDTO = {
	email: string;
	password: string;
};

export type TSendEmailDTO = {
	name: string;
	subject?: string;
	phone: string;
	email: string;
	message: string;
};
