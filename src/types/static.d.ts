export type TNavLinks = {
	title: string;
	id: string;
	href?: string;
	key: number;
};

export type TChooseUs = {
	id: number;
	title: string;
	service: string;
};

export type TFAQs = {
	id: number;
	question: string;
	answer: string;
};

export type TContact = {
	id: number;
	label: string;
	type: string;
	primary: string;
	secondary: string;
	primaryHref: string;
	secondaryHref: string;
};

export type TServices = {
	id: number;
	title: string;
	description: string;
};

export type TWelcome = {
	id: number;
	title: string;
};
