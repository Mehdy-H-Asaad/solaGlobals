// import { WelcomeIcons } from "@/data";
import WelcomeImg from "../assets/imgs/cargoship-TA.jpg";
import { motion } from "framer-motion";
import { useAnimationOptions } from "@/animation/animationOptions";
import { Trans, useTranslation } from "react-i18next";
import { GiTakeMyMoney, GiCarWheel } from "react-icons/gi";
import { GoChecklist } from "react-icons/go";

export const Welcome = () => {
	const { isInView, ref, staggerVariants, textAnimation } =
		useAnimationOptions();

	const { t } = useTranslation();

	const welcomeIcons = t("welcome.WelcomeIcons", {
		returnObjects: true,
	}) as Record<string, string>[];

	const icons = [GiTakeMyMoney, GiCarWheel, GoChecklist];

	return (
		<div className="py-20 ">
			<div className="container">
				<div className="flex rtl:flex-row-reverse flex-col items-center lg:items-start lg:flex-row justify-center gap-20">
					<motion.img
						initial={{ opacity: 0, x: -60 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="size-96 object-cover rounded-md flex-1"
						src={WelcomeImg}
						alt="Not found"
						loading="lazy"
					/>

					<div ref={ref} className="flex flex-col gap-10 flex-1 ">
						<div className="overflow-hidden rtl:h-14">
							<motion.div
								variants={textAnimation}
								initial="initial"
								animate={isInView ? "enter" : ""}
								className="text-4xl font-bold"
							>
								<Trans i18nKey={"welcome.title"}>
									<span className="text-blue">Sola Group</span>
								</Trans>
							</motion.div>
						</div>
						<div className="overflow-hidden">
							<motion.p
								variants={textAnimation}
								initial="initial"
								animate={isInView ? "enter" : ""}
								className="text-lg"
							>
								{t("welcome.welcomeData.welcomeParagraphOne")}
							</motion.p>
						</div>

						<div className="overflow-hidden">
							<motion.p
								variants={textAnimation}
								initial="initial"
								animate={isInView ? "enter" : ""}
							>
								{t("welcome.welcomeData.welcomeParagraphTwo")}
							</motion.p>
						</div>
						<div className="flex gap-14 flex-wrap">
							{welcomeIcons.map((icon, index) => {
								const IconComponent = icons[index];
								return (
									<motion.div
										variants={staggerVariants}
										initial="initial"
										viewport={{ once: true }}
										whileInView="animate"
										custom={index}
										className="flex  gap-2"
										key={icon.id}
									>
										<div>{<IconComponent size={28} />}</div>
										<div className="text-lg font-[600]">{icon.title}</div>
									</motion.div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
