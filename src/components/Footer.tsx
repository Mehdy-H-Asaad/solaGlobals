import logo from "../assets/imgs/logo.png";
import { motion } from "framer-motion";
import { useAnimationOptions } from "@/animation/animationOptions";
import { useTranslation } from "react-i18next";
import { FaEarthAmericas, FaWhatsapp } from "react-icons/fa6";
import i18n from "@/i18n";
import { TContact, TNavLinks } from "@/types/static";

export const Footer = () => {
	const { isInView, ref, textAnimation } = useAnimationOptions();

	const { t } = useTranslation();

	const contactDetails = t("contact.contactDetails", {
		returnObjects: true,
	}) as TContact[];

	const navLinks = t("navLinks", { returnObjects: true }) as TNavLinks[];

	const changeLanguage = () => {
		i18n.language === "ar"
			? i18n.changeLanguage("en")
			: i18n.changeLanguage("ar");
	};

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
									<div key={contact.id} className="flex flex-col gap-1">
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
															: `https://wa.me/${contact.primaryHref}`
													}
													target="_blank"
												>
													{contact.primary}
												</a>
												<a
													dir="ltr"
													className="text-sm w-fit duration-200 hover:text-blue"
													href={
														contact.type === "email"
															? `mailto:${contact.secondary}`
															: `https://wa.me/${contact.secondaryHref}`
													}
													target="_blank"
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
							{navLinks.map((nav, index) => (
								<a
									href={nav.id || nav.href}
									target={nav.href && "_blank"}
									key={nav.key}
									className={`text-lg nav-link cursor-pointer ${
										nav.title == "Customer Login" ||
										nav.title === "تسجيل الدخول"
											? "-order-1"
											: ""
									} `}
								>
									{index + 1 === navLinks.length ? (
										<div
											className="flex items-center gap-2"
											onClick={() => {
												changeLanguage();
											}}
										>
											<FaEarthAmericas size={20} />
											<div>{nav.title}</div>
										</div>
									) : (
										nav.title
									)}
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
						© 2025 SOLA INC. All rights reserved. Powered by{" "}
						<a
							href="https://www.hmmosoft.com/"
							target="_blank"
							className="text-blue"
						>
							HmmoSoft
						</a>
					</motion.p>
				</div>
			</div>
		</div>
	);
};
