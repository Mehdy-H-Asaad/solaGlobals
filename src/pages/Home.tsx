import { Contact } from "@/components/Contact";
import { FAQs } from "@/components/FAQs";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Navbar } from "@/components/Navbar";
import { Welcome } from "@/components/Welcome";
import { ChooseUs } from "@/components/ChooseUs";

export const Home = () => {
	return (
		<>
			<Navbar />
			<Hero />
			<Welcome />
			<Services />
			<ChooseUs />
			<FAQs />
			<Contact />
			<Footer />
		</>
	);
};
