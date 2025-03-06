import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import { adminNavLinks } from "./data";
import { AdminNavbarResponsive } from "./AdminNavbarResponsive";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from "@/components/ui/select";
import { EAuctionFee, useAuctionFeeStore } from "../../state/auctionFee.state";
import { useTranslation } from "react-i18next";
// import { FaEarthAmericas } from "react-icons/fa6";
import { Fragment } from "react/jsx-runtime";

export const AdminNavbar = () => {
	const { setAuctionFee } = useAuctionFeeStore();
	const navigate = useNavigate();
	const { t } = useTranslation();
	// const changeLanguage = () => {
	// 	i18n.language === "ar"
	// 		? i18n.changeLanguage("en")
	// 		: i18n.changeLanguage("ar");
	// };

	return (
		<>
			<div className="flex items-center justify-between h-24 shadow-md bg-white">
				<div className="container">
					<div className="flex items-center justify-between rtl:flex-row-reverse">
						<img src={logo} className="w-32" alt="Not found" loading="lazy" />

						<div className="hidden lg:flex items-center gap-6">
							{adminNavLinks.map((nav, index) =>
								index === adminNavLinks.length - 2 ? (
									<Fragment key={nav.id}>
										<NavLink
											aria-label="Admin navbar links"
											to={`/admin${nav.href}`}
											key={nav.id}
											className={({ isActive }) =>
												`${isActive ? "active" : ""} nav-link capitalize`
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
											`${isActive ? "active" : ""} nav-link capitalize`
										}
									>
										{t(`dashboard.${nav.title}`)}
									</NavLink>
								)
							)}

							{/* <div
								className="flex items-center gap-2 cursor-pointer nav-link"
								onClick={() => {
									changeLanguage();
								}}
							>
								<FaEarthAmericas size={24} />
								<div>{i18n.language === "en" ? "AR" : "EN"}</div>
							</div> */}
						</div>

						<AdminNavbarResponsive />
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
};
