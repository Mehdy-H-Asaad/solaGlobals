import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import FAQsImg from "../assets/imgs/faqs.jpg";
import { motion } from "framer-motion";
import { useAnimationOptions } from "@/animation/animationOptions";
import { Trans, useTranslation } from "react-i18next";
export const FAQs = () => {
	const { staggerVariants } = useAnimationOptions();

	const { t } = useTranslation();

	const FAQsData = t("faqs.faqsData", { returnObjects: true }) as any[];

	return (
		<div className="py-20 bg-[#f1f5fa]" id="faq">
			<div className="container">
				<div className="text-4xl font-bold w-fit mx-auto mb-20 text-center lg:text-start">
					<Trans i18nKey={"faqs.title"}>
						<span className="text-blue "> Questions</span>
					</Trans>
				</div>

				<div className="flex rtl:flex-row-reverse flex-col lg:flex-row justify-center gap-20">
					<Accordion type="single" collapsible className="flex-1">
						<div className="flex flex-col gap-4">
							{FAQsData.map((faq, index) => (
								<motion.div
									viewport={{ once: true }}
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
						viewport={{ once: true }}
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
