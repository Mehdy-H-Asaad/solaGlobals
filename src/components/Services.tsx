import { useAnimationOptions } from "@/animation/animationOptions";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";

export const Services = () => {
	const { isInView, ref, staggerVariants, textAnimation } =
		useAnimationOptions();

	const { t } = useTranslation();
	const servicesDataTranslate = t("services.servicesData", {
		returnObjects: true,
	}) as Record<string, string>[];

	return (
		<div className="py-20 bg-[#f1f5fa]" id="services">
			<div className="container">
				<div ref={ref}>
					<div className="overflow-hidden mb-10">
						<motion.div
							variants={textAnimation}
							initial="initial"
							animate={isInView ? "enter" : ""}
							className="text-5xl font-bold w-fit mx-auto"
						>
							<Trans i18nKey={"services.title"}>
								<span className="text-blue">Services</span>
							</Trans>
						</motion.div>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
					{servicesDataTranslate.map((work, index) => (
						<motion.div
							viewport={{ once: true }}
							variants={staggerVariants}
							initial="initial"
							whileInView="animate"
							custom={index}
							key={work.id}
							className="flex flex-col gap-4 items-center"
						>
							<div key={work.id} className="font-bold text-6xl  w-fit">
								<span className="how-we-work-num">0</span>
								{index + 1}
							</div>
							<div className="font-bold text-xl">{work.titel}</div>
							<p className="rtl:text-base text-sm text-center">
								{work.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};
