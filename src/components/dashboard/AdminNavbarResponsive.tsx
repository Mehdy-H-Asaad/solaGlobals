import { CiMenuFries } from "react-icons/ci";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Fragment, useState } from "react";
import { adminNavLinks } from "./data";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { EAuctionFee, useAuctionFeeStore } from "@/state/auctionFee.state";
// import { FaEarthAmericas } from "react-icons/fa6";

export const AdminNavbarResponsive = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { setAuctionFee } = useAuctionFeeStore();
	const navigate = useNavigate();
	const { t } = useTranslation();
	// const changeLanguage = () => {
	// 	i18n.language === "ar"
	// 		? i18n.changeLanguage("en")
	// 		: i18n.changeLanguage("ar");
	// };

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
							{adminNavLinks.map((nav, index) =>
								index === adminNavLinks.length - 2 ? (
									<Fragment key={nav.id}>
										<NavLink
											aria-label="Admin navbar links"
											to={`/admin${nav.href}`}
											key={nav.id}
											className={({ isActive }) =>
												`${isActive ? "active" : ""} w-fit nav-link capitalize`
											}
										>
											{t(`dashboard.${nav.title}`)}
										</NavLink>
										<Select
											onValueChange={value => {
												setAuctionFee(
													value.toLowerCase() === "copart"
														? EAuctionFee.COPART
														: EAuctionFee.IAAI
												);
												navigate(`/admin/auction-fee`, { replace: true });
											}}
										>
											<SelectTrigger className="nav-link !border-b-[1px] w-fit p-0 justify-start gap-x-1 focus:ring-0 border-none outline-none shadow-none text-base">
												<SelectValue placeholder={t("dashboard.auctionFee")} />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>{t("dashboard.auctionFee")}</SelectLabel>
													<SelectItem value="copart">Copart</SelectItem>
													<SelectItem value="iaai">IAAI</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</Fragment>
								) : (
									<NavLink
										aria-label="Admin navbar links"
										to={`/admin${nav.href}`}
										key={nav.id}
										className={({ isActive }) =>
											`${isActive ? "active" : ""} w-fit nav-link capitalize`
										}
									>
										{t(`dashboard.${nav.title}`)}
									</NavLink>
								)
							)}
						</div>
					</SheetContent>
				</SheetDescription>
			</Sheet>
			{/* <div
				className="flex items-center gap-2"
				onClick={() => {
					changeLanguage(), setIsOpen(false);
				}}
			>
				<FaEarthAmericas size={24} />
				<div className="text-lg font-bold">
					{i18n.language === "en" ? "AR" : "EN"}
				</div>
			</div> */}
		</div>
	);
};
