import { useAnimationOptions } from "@/animation/animationOptions";
import { servicesData } from "@/data";
import { motion } from "framer-motion";

export const Services = () => {
	const { isInView, ref, staggerVariants, textAnimation } =
		useAnimationOptions();
	return (
		<div className="py-20" id="services">
			<div className="container">
				<div ref={ref}>
					<div className="overflow-hidden mb-10">
						<motion.div
							variants={textAnimation}
							initial="initial"
							animate={isInView ? "enter" : ""}
							className="text-center font-[700] text-5xl"
						>
							Our
							<span className="text-blue"> Services</span>
						</motion.div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20 ">
					{servicesData.map((service, index) => (
						<motion.div
							variants={staggerVariants}
							initial="initial"
							whileInView="animate"
							custom={index}
							key={service.id}
							className="flex flex-col gap-4 border-[3px] p-4 rounded-md border-black relative"
						>
							<div>
								<service.icon
									className="absolute text-blue w-20 -top-4 bg-white left-4"
									size={35}
								/>
							</div>
							<div className="font-bold text-xl">{service.title}</div>
							<div className="text-lg">{service.service}</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};
