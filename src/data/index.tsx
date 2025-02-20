import { AiOutlineSafety } from "react-icons/ai";
import { FaHandshakeSimple, FaArrowTrendUp, FaWhatsapp } from "react-icons/fa6";
import { GiTakeMyMoney, GiCarWheel } from "react-icons/gi";
import { GoChecklist } from "react-icons/go";
import { TbChecklist } from "react-icons/tb";

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
		type: "address",
		label: "Head Office",
		primary: "Al-Qusiba Street, Janzour, Tripoli",
		secondary: "416 Cardinal Dr, Statesboro, GA 30461",
	},
	{
		id: 2,
		type: "phone",
		label: "Phone",
		primary: "+218 91-4729090",
		secondary: "+1 (912) 275-5983",
	},
	{
		id: 3,
		type: "email",
		label: "Email",
		primary: "suoollibya2015@gmail.com",
	},
	{
		id: 4,
		type: "phone",
		label: FaWhatsapp,
		primary: "+218 91-4729090",
	},
];

export const faqsData = [
	{
		id: 1,
		question: "How does the online car bidding process work?",
		answer:
			"Users can browse a wide selection of vehicles listed on the platform, place bids in real-time auctions, and win vehicles if they have the highest bid.",
	},
	{
		id: 2,
		question: "Why ship using a shipping container?",
		answer:
			"Shipping containers are used because they are standardized, secure, cost-effective, and easy to transport by ship, train, or truck, making global trade efficient.",
	},
	{
		id: 3,
		question:
			"Can I transport a vehicle I purchased to another state or country?",
		answer:
			"Yes, we provide transportation services through our company, including international shipping.",
	},
	{
		id: 4,
		question: "Can I inspect the vehicle before bidding?",
		answer:
			"Yes, most platforms like Copart provide detailed vehicle descriptions, photos, and condition reports.",
	},
];
export const servicesData = [
	{
		id: 1,
		titel: "Search Inventory",
		description: "Explore our extensive inventory to find your perfect vehicle",
	},
	{
		id: 2,
		titel: "Dispatch",
		description: "We prepare and ship your vehicle to one of our warehouses.",
	},
	{
		id: 3,
		titel: "Customer Service",
		description: "24/7 by WhatsApp groups and emails",
	},
	{
		id: 4,
		titel: "Loading",
		description: "The product is safely loaded onto the container",
	},
	{
		id: 5,
		titel: "Delivery",
		description:
			"The product is promptly delivered to the customer’s specified address",
	},
];
export const chooseUsData = [
	{
		id: 1,
		icon: FaHandshakeSimple,
		title: "Trust",
		service: "Loyal and committed to our company always.",
	},
	{
		id: 2,
		icon: FaArrowTrendUp,
		title: "Continuous Improvement",
		service: "Ongoing enhancement of our team and offerings.",
	},
	{
		id: 3,
		icon: AiOutlineSafety,
		title: "Reliability",
		service: "Execute and uphold our responsibilities under all conditions.",
	},
	{
		id: 4,
		icon: TbChecklist,
		title: "Accountability",
		service: "Take ownership and responsibility for our actions and outcomes.",
	},
];
export const WelcomeIcons = [
	{
		id: 1,
		icon: GiTakeMyMoney,
		title: "Easy Financing",
	},
	{
		id: 2,
		icon: GiCarWheel,
		title: "All Brands Cars",
	},
	{
		id: 3,
		icon: GoChecklist,
		title: "Quality Services",
	},
];
