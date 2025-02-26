import { useEffect, useState } from "react";
import Logo from "../assets/imgs/logo.png";
import { ResponsiveNavBar } from "./ResponsiveNavBar";
import { motion } from "framer-motion";
import { useAnimationOptions } from "@/animation/animationOptions";
import { FaEarthAmericas, FaPhone } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { TNavLinks } from "@/types/static";

export const Navbar = () => {
	const [isBackgroundVisible, setIsBackGroundVisible] = useState<boolean>(
		typeof window !== "undefined" && window.scrollY > 50
	);

	const { t, i18n } = useTranslation();

	const changeLanguage = () => {
		i18n.language === "ar"
			? i18n.changeLanguage("en")
			: i18n.changeLanguage("ar");
	};

	useEffect(() => {
		const handleScroll = () => {
			setIsBackGroundVisible(window.scrollY > 50);
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const { staggerVariants } = useAnimationOptions();

	const navLinks = t("navLinks", { returnObjects: true }) as TNavLinks[];

	return (
		<div
			className={`${
				isBackgroundVisible
					? "bg-white text-black shadow-sm"
					: "bg-transparent text-white"
			} h-24 flex items-center fixed top-0 left-0 w-full z-10 duration-200`}
		>
			<div className="container">
				<div className="flex rtl:flex-row-reverse items-center justify-between">
					<img src={Logo} className="w-32" alt="Logo" />

					<div className="hidden lg:flex items-center gap-10">
						{navLinks.map((link, index) => (
							<motion.a
								viewport={{ once: true }}
								variants={staggerVariants}
								initial="initial"
								animate="animate"
								custom={index}
								href={link.id || link.href}
								target={link.href && "_blank"}
								className="font-bold cursor-pointer nav-link"
								key={link.key}
							>
								{index + 1 === navLinks.length ? (
									<div
										className="flex items-center gap-2"
										onClick={() => {
											changeLanguage();
										}}
									>
										<FaEarthAmericas size={20} />
										<div>{link.title}</div>
									</div>
								) : (
									link.title
								)}
							</motion.a>
						))}
					</div>

					<div className="hidden lg:flex items-center rtl:flex-row-reverse gap-4">
						<FaPhone size={18} />
						<div className="flex flex-col gap-1">
							<a
								aria-label="Phone number"
								dir="ltr"
								className="text-sm duration-200 hover:text-blue"
								href="https://wa.me/+218914729090"
								target="_blank"
							>
								+218 91-4729090
							</a>
							<a
								aria-label="Phone number"
								dir="ltr"
								className="text-sm duration-200 hover:text-blue"
								href="https://wa.me/+19122755983"
								target="_blank"
							>
								+1 (912) 275-5983
							</a>
						</div>
					</div>

					<ResponsiveNavBar isBackgroundVisible={isBackgroundVisible} />
				</div>
			</div>
		</div>
	);
};
