import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import FAQsImg from "../assets/imgs/faqs.jpg";
import { faqsData } from "@/data";
import { motion } from "framer-motion";
import { useAnimationOptions } from "@/animation/animationOptions";
export const FAQs = () => {
	const { staggerVariants } = useAnimationOptions();

	return (
		<div className="py-20 bg-[#f1f5fa]" id="faq">
			<div className="container">
				<div className="text-4xl font-bold w-fit mx-auto mb-20 text-center lg:text-start">
					Frequently Asked<span className="text-blue "> Questions</span>
				</div>

				<div className="flex flex-col lg:flex-row justify-center gap-20">
					<Accordion type="single" collapsible className="flex-1">
						<div className="flex flex-col gap-4">
							{faqsData.map((faq, index) => (
								<motion.div
									variants={staggerVariants}
									initial="initial"
									whileInView="animate"
									custom={index}
								>
									<AccordionItem key={faq.id} value={`item-${faq.id}`}>
										<AccordionTrigger className="hover:no-underline hover:text-blue text-lg font-[600]">
											{faq.question}
										</AccordionTrigger>
										<AccordionContent className="text-base">
											{faq.answer}
										</AccordionContent>
									</AccordionItem>
								</motion.div>
							))}
						</div>
					</Accordion>

					<motion.img
						initial={{ opacity: 0, marginLeft: 60 }}
						whileInView={{ opacity: 1, marginLeft: 0 }}
						transition={{ duration: 0.5 }}
						className="size-96 object-cover rounded-md flex-1 mx-auto"
						src={FAQsImg}
						loading="lazy"
						alt="Not found"
					/>
				</div>
			</div>
		</div>
	);
};
