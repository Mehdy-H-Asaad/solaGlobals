import { CiMenuFries } from "react-icons/ci";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";
import { adminNavLinks } from "./data";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaEarthAmericas } from "react-icons/fa6";

export const AdminNavbarResponsive = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { t, i18n } = useTranslation();
	const changeLanguage = () => {
		i18n.language === "ar"
			? i18n.changeLanguage("en")
			: i18n.changeLanguage("ar");
	};

	return (
		<div className="flex flex-row-reverse gap-4 lg:hidden rtl:flex-row items-baseline">
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTitle>
					<SheetTrigger>
						<CiMenuFries
							size={24}
							className={`text-black cursor-pointer`}
							onClick={() => setIsOpen(true)}
						/>
					</SheetTrigger>
				</SheetTitle>
				<SheetDescription>
					<SheetContent className="bg-main-color text-black" dir="ltr">
						<div className="flex flex-col gap-10">
							{adminNavLinks.map(nav => (
								<Link
									aria-label="Admin navbar links"
									to={`/admin${nav.href}`}
									onClick={() => setIsOpen(false)}
									key={nav.id}
								>
									{t(`dashboard.${nav.title}`)}
								</Link>
							))}
						</div>
					</SheetContent>
				</SheetDescription>
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
