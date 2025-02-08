import { Contact } from "./components/Contact";
import { FAQs } from "./components/FAQs";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowWeWork } from "./components/HowWeWork";
import { Navbar } from "./components/Navbar";
import { Services } from "./components/Services";
import { Welcome } from "./components/Welcome";

function App() {
	return (
		<>
			<Navbar />
			<Hero />
			<Welcome />
			<HowWeWork />
			<Services />
			<FAQs />
			<Contact />
			<Footer />
		</>
	);
}

export default App;
