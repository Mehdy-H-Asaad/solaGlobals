import { useState } from "react";
import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import { FaEarthAmericas } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

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

	const navLinks = t("navLinks", { returnObjects: true }) as Record<
		string,
		string
	>[];

	return (
		<div className="block lg:hidden">
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<CiMenuFries
						size={24}
						className={`${
							isBackgroundVisible ? "text-black" : "text-white"
						} cursor-pointer`}
						onClick={() => setIsOpen(true)}
					/>
				</SheetTrigger>
				<SheetContent className="bg-main-color text-black">
					<div className="rtl:items-end flex flex-col gap-10">
						{navLinks.map(nav => (
							<a
								href={nav.id}
								className="text-lg font-bold"
								key={nav.id}
								onClick={() => setIsOpen(false)}
							>
								{nav.title}
							</a>
						))}
						<div
							className="flex items-center gap-2"
							onClick={() => {
								changeLanguage(), setIsOpen(false);
							}}
						>
							<FaEarthAmericas size={24} />
							<div className="text-lg font-bold">
								{i18n.language === "en" ? "English" : "العربية"}
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
