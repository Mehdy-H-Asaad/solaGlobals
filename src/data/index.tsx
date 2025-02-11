import { AiOutlineSafety } from "react-icons/ai";
import { FaHandshakeSimple, FaArrowTrendUp } from "react-icons/fa6";
import { GiTakeMyMoney, GiCarWheel } from "react-icons/gi";
import { GoChecklist } from "react-icons/go";

export const navLinks = [
	{
		title: "Home",
		id: "#",
	},
	{
		title: "Work",
		id: "#work",
	},
	{
		title: "Services",
		id: "#services",
	},
	{
		title: "FAQs",
		id: "#faq",
	},
	{
		title: "Contact",
		id: "#contact",
	},
];
export const contactDetails = [
	{
		id: 1,
		contact: "Head Office",
		description: "Al-Qusiba Street, Janzour, Tripoli",
		secAddress: "416 cardinal dr statesboro, GA 30461",
	},
	{
		id: 2,
		contact: "Phone",
		href: "tel:+218 91-4729090",
		hrefTitle: "+218 91-4729090",
	},
	{
		id: 3,
		contact: "Email",
		href: "mailto:suoollibya2015@gmail.com",
		hrefTitle: "suoollibya2015@gmail.com",
	},
];
export const faqsData = [
	{
		id: 1,
		question: "Is it accessible?",
		answer: "Yes. It adheres to the WAI-ARIA design pattern.",
	},
	{
		id: 2,
		question: "Is it accessible?",
		answer: "Yes. It adheres to the WAI-ARIA design pattern.",
	},
	{
		id: 3,
		question: "Is it accessible?",
		answer: "Yes. It adheres to the WAI-ARIA design pattern.",
	},
	{
		id: 4,
		question: "Is it accessible?",
		answer: "Yes. It adheres to the WAI-ARIA design pattern.",
	},
];
export const howWeWorkData = [
	{
		id: 1,
		titel: "Search Inventory",
		description: "Explore our extensive inventory to find your perfect vehicle",
	},
	{
		id: 2,
		titel: "Dispatch",
		description:
			"We carefully prepare and ship your vehicle to one of our secure warehouses.",
	},
	{
		id: 3,
		titel: "Loading",
		description: "The product is safely loaded onto the transportation vehicle",
	},
	{
		id: 4,
		titel: "Delivery",
		description:
			"The product is promptly delivered to the customer’s specified address",
	},
];
export const servicesData = [
	{
		id: 1,
		icon: FaHandshakeSimple,
		title: "Trust",
		service: "Faithful and devoted to our company at all times.",
	},
	{
		id: 2,
		icon: FaArrowTrendUp,
		title: "Continuous Improvement",
		service: "Continuous improvement of our people and services.",
	},
	{
		id: 3,
		icon: AiOutlineSafety,
		title: "Reliability",
		service: "Perform and maintain our functions in all circumstances.",
	},
	{
		id: 4,
		icon: FaHandshakeSimple,
		title: "Trust",
		service: "Faithful and devoted to our company at all times.",
	},
];
export const icons = [
	{
		id: 1,
		icon: <GiTakeMyMoney size={28} />,
		title: "Easy Financing",
	},
	{
		id: 2,
		icon: <GiCarWheel size={28} />,
		title: "All Brands Cars",
	},
	{
		id: 3,
		icon: <GoChecklist size={28} />,
		title: "Quality Services",
	},
];
