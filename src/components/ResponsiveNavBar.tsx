import { useState } from "react";
import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import { FaEarthAmericas } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { TNavLinks } from "@/types/static";
export const ResponsiveNavBar = ({
	isBackgroundVisible,
}: {
	isBackgroundVisible: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const { t, i18n } = useTranslation();

	const changeLanguage = () => {
		i18n.language === "ar"
			? i18n.changeLanguage("en")
			: i18n.changeLanguage("ar");
	};

	const navLinks = t("navLinks", { returnObjects: true }) as TNavLinks[];

	return (
		<div className="flex flex-row-reverse gap-10 lg:hidden rtl:flex-row items-baseline">
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger>
					<CiMenuFries
						size={24}
						className={`${
							isBackgroundVisible ? "text-black" : "text-white"
						} cursor-pointer`}
						onClick={() => setIsOpen(true)}
					/>
				</SheetTrigger>
				<SheetContent className="bg-main-color text-black">
					<div className="rtl:items-end flex flex-col gap-10 mt-10">
						{navLinks.map((nav, index) => (
							<a
								aria-label="Navbar links"
								href={nav.id || nav.href}
								target={nav.href && "_blank"}
								className="text-lg font-bold cursor-pointer"
								key={nav.key}
								onClick={() => setIsOpen(false)}
							>
								{index + 1 === navLinks.length ? "" : nav.title}
							</a>
						))}
					</div>
				</SheetContent>
			</Sheet>
			<div
				className="flex items-center gap-2"
				onClick={() => {
					changeLanguage(), setIsOpen(false);
				}}
			>
				<FaEarthAmericas size={24} />
				<div className="text-lg font-bold">
					{i18n.language === "en" ? "AR" : "EN"}
				</div>
			</div>
		</div>
	);
};
