import { useAnimationOptions } from "@/animation/animationOptions";
import { chooseUsData } from "@/data";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { AiOutlineSafety } from "react-icons/ai";
import { FaHandshakeSimple, FaArrowTrendUp } from "react-icons/fa6";
import { TbChecklist } from "react-icons/tb";

export const ChooseUs = () => {
	const { isInView, ref, staggerVariants, textAnimation } =
		useAnimationOptions();

	const { t } = useTranslation();

	const chooseUsDataTranslation = t("chooseUs.chooseUsData", {
		returnObjects: true,
	}) as typeof chooseUsData;

	const icons = [
		FaHandshakeSimple,
		FaArrowTrendUp,
		AiOutlineSafety,
		TbChecklist,
	];

	return (
		<div className="py-20" id="services">
			<div className="container">
				<div ref={ref}>
					<div className="overflow-hidden rtl:h-16 mb-10">
						<motion.div
							variants={textAnimation}
							initial="initial"
							animate={isInView ? "enter" : ""}
							className="text-center font-[700] text-5xl"
						>
							<Trans i18nKey={"chooseUs.title"}>
								{/* Choose */}
								<span className="text-blue"> Us</span>
							</Trans>
						</motion.div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20 ">
					{chooseUsDataTranslation.map((service, index) => {
						const IconComponent = icons[index];
						return (
							<motion.div
								variants={staggerVariants}
								viewport={{ once: true }}
								initial="initial"
								whileInView="animate"
								custom={index}
								key={service.id}
								className="flex flex-col gap-4 border-[3px] p-4 rounded-md border-black relative"
							>
								<div>
									<IconComponent
										className="absolute text-blue w-20 -top-4 bg-white left-4"
										size={35}
									/>
								</div>
								<div className="font-bold text-xl">{service.title}</div>
								<div className="text-lg">{service.service}</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
