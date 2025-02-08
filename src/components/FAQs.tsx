import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import FAQsImg from "../assets/imgs/faqs.jpg";
import { faqsData } from "@/data";
export const FAQs = () => {
	return (
		<div className="py-20 bg-[#f1f5fa]" id="faq">
			<div className="container">
				<div className="text-4xl font-bold w-fit mx-auto mb-20">
					Frequently Asked<span className="text-blue "> Qquestions</span>
				</div>

				<div className="flex justify-center gap-20">
					<Accordion type="single" collapsible className="flex-1">
						<div className="flex flex-col gap-4">
							{faqsData.map(faq => (
								<AccordionItem key={faq.id} value={`item-${faq.id}`}>
									<AccordionTrigger className="hover:no-underline hover:text-blue text-lg font-[600]">
										{faq.question}
									</AccordionTrigger>
									<AccordionContent className="text-base">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</div>
					</Accordion>

					<img
						className="size-96 object-cover rounded-md flex-1"
						src={FAQsImg}
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};
