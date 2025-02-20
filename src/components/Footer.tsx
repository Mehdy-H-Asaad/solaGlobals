import logo from "../assets/imgs/logo.png";
import { motion } from "framer-motion";
import { useAnimationOptions } from "@/animation/animationOptions";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa6";

export const Footer = () => {
	const { isInView, ref, textAnimation } = useAnimationOptions();

	const { t } = useTranslation();

	const contactDetails = t("contact.contactDetails", {
		returnObjects: true,
	}) as any[];

	const navLinks = t("navLinks", { returnObjects: true }) as any[];

	return (
		<div ref={ref} className="bg-main-color py-10">
			<div className="container">
				<div>
					<img
						src={logo}
						className="size-40 mb-4 mx-auto object-cover"
						alt="Not found"
						loading="lazy"
					/>
				</div>

				<div className="flex flex-col sm:flex-row flex-wrap justify-center gap-20">
					<div className="flex flex-col gap-10 flex-1">
						<motion.div
							viewport={{ once: true }}
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							<h1 className="text-2xl font-bold">{t("footer.aboutTitle")}</h1>
							<p className="max-w-[36rem]">{t("footer.aboutParaghraph")}</p>
						</motion.div>

						<motion.div
							viewport={{ once: true }}
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="flex flex-col gap-2 "
						>
							{/* <h1 className="text-2xl font-bold">Contact Info</h1> */}

							<div className="flex flex-col gap-4">
								{contactDetails.map(contact => (
									<div className="flex flex-col gap-1">
										<div className="text-lg font-bold">
											{contact.label == "WhatsApp" ||
											contact.label == "واتساب" ? (
												<FaWhatsapp size={24} />
											) : (
												contact.label
											)}
										</div>
										{contact.type === "email" || contact.type === "phone" ? (
											<>
												<a
													dir="ltr"
													className="w-fit text-sm duration-200 hover:text-blue"
													href={
														contact.type === "email"
															? `mailto:${contact.primary}`
															: `tel:${contact.primary}`
													}
												>
													{contact.primary}
												</a>
												<a
													dir="ltr"
													className="text-sm w-fit duration-200 hover:text-blue"
													href={
														contact.type === "email"
															? `mailto:${contact.secondary}`
															: `tel:${contact.secondary}`
													}
												>
													{contact.secondary}
												</a>
											</>
										) : contact.type === "address" ? (
											<>
												<div className="text-sm">{contact.primary}</div>
												<div className="text-sm">{contact.secondary}</div>
											</>
										) : (
											""
										)}
									</div>
									// <div key={contact.id} className="flex flex-col  gap-1">
									// 	{contact.contact}:
									// 	<a href={contact.href} className="text-sm">
									// 		{contact.hrefTitle}
									// 	</a>
									// 	<div className="text-sm">{contact.description}</div>
									// 	<p className="text-sm">{contact.secAddress}</p>
									// </div>
								))}
							</div>
						</motion.div>
					</div>

					<motion.div
						viewport={{ once: true }}
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="flex flex-col gap-2 flex-1 items-start sm:items-center"
					>
						<h1 className="text-2xl font-bold">
							{t("footer.quickLinksTitle")}
						</h1>
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
