import { useAnimationOptions } from "@/animation/animationOptions";
import { howWeWorkData } from "@/data";
import { motion } from "framer-motion";

export const HowWeWork = () => {
	const { isInView, ref, staggerVariants, textAnimation } =
		useAnimationOptions();

	return (
		<div className="py-20 bg-[#f1f5fa]" id="work">
			<div className="container">
				<div ref={ref}>
					<div className="overflow-hidden mb-10">
						<motion.div
							variants={textAnimation}
							initial="initial"
							animate={isInView ? "enter" : ""}
							className="text-4xl font-bold w-fit mx-auto"
						>
							How We <span className="text-blue">Work</span>
						</motion.div>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
					{howWeWorkData.map((work, index) => (
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
							<p className="text-sm text-center">{work.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};
