import { icons } from "@/data";
import WelcomeImg from "../assets/imgs/cargoship-TA.jpg";
import { motion } from "framer-motion";
import { useAnimationOptions } from "@/animation/animationOptions";

export const Welcome = () => {
	const { isInView, ref, staggerVariants, textAnimation } =
		useAnimationOptions();

	return (
		<div className="py-20 ">
			<div className="container">
				<div className="flex flex-col items-center lg:items-start lg:flex-row justify-center gap-20">
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
						<div className="overflow-hidden">
							<motion.div
								variants={textAnimation}
								initial="initial"
								animate={isInView ? "enter" : ""}
								className="text-4xl font-bold"
							>
								Welcome to <span className="text-blue">Sola Group</span>
							</motion.div>
						</div>
						<div className="overflow-hidden">
							<motion.p
								variants={textAnimation}
								initial="initial"
								animate={isInView ? "enter" : ""}
								className="text-lg"
							>
								We provide a complete end-to-end service, starting with expert
								bidding on your preferred vehicles at US auctions.
							</motion.p>
						</div>

						<div className="overflow-hidden">
							<motion.p
								variants={textAnimation}
								initial="initial"
								animate={isInView ? "enter" : ""}
							>
								We handle all the necessary paperwork and logistics, and
								ensuring safe and timely delivery to your specified location,
								wherever that may be.
							</motion.p>
						</div>
						<div className="flex gap-14 flex-wrap">
							{icons.map((icon, index) => (
								<motion.div
									variants={staggerVariants}
									initial="initial"
									viewport={{ once: true }}
									whileInView="animate"
									custom={index}
									className="flex  gap-2"
									key={icon.id}
								>
									<div>{icon.icon}</div>
									<div className="text-lg font-[600]">{icon.title}</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
