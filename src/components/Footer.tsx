import logo from "../assets/imgs/logo.png";
import { contactDetails, navLinks } from "@/data";
import { motion } from "framer-motion";
import { useAnimationOptions } from "@/animation/animationOptions";
export const Footer = () => {
	const { isInView, ref, textAnimation } = useAnimationOptions();

	return (
		<div ref={ref} className="bg-main-color py-10">
			<div className="container">
				<div>
					<img
						src={logo}
						className="size-40 mx-auto object-cover"
						alt="Not found"
						loading="lazy"
					/>
				</div>

				<div className="flex flex-wrap justify-center gap-20">
					<div className="flex flex-col gap-10 flex-1">
						<motion.div
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							<h1 className="text-2xl font-bold">About</h1>
							<p className="max-w-[36rem]">
								We provide a complete end-to-end service, starting with expert
								bidding on your preferred vehicles at US auctions.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="flex flex-col gap-2 "
						>
							<h1 className="text-2xl font-bold">Contact Info</h1>

							<div className="flex flex-col gap-4">
								{contactDetails.map(contact => (
									<div key={contact.id} className="flex items-center gap-2">
										{contact.contact}: <div>{contact.description}</div>
									</div>
								))}
							</div>
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="flex flex-col gap-2 flex-1 items-center"
					>
						<h1 className="text-2xl font-bold">Quick Links</h1>
						<div className="flex flex-col gap-4">
							{navLinks.map(nav => (
								<a href={nav.id} key={nav.id} className="text-lg nav-link">
									{nav.title}
								</a>
							))}
						</div>
					</motion.div>
				</div>
				<div className="overflow-hidden mt-10">
					<motion.p
						variants={textAnimation}
						initial="initial"
						animate={isInView ? "enter" : ""}
						className="mx-auto w-fit font-bold"
					>
						© 2025 SOLA INC. All rights reserved.
					</motion.p>
				</div>
			</div>
		</div>
	);
};
