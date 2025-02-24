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
import { EAuctionFee, useAuctionFeeStore } from "./state/auctionFee.state";
import { useTranslation } from "react-i18next";
export const AdminNavbar = () => {
	const { setAuctionFee } = useAuctionFeeStore();
	const navigate = useNavigate();
	const { t } = useTranslation();
	return (
		<>
			<div className="flex items-center justify-between h-24 shadow-md bg-white">
				<div className="container">
					<div className="flex items-center justify-between rtl:flex-row-reverse">
						<img src={logo} className="w-32" alt="Not found" loading="lazy" />

						<div className="hidden lg:flex items-center gap-10">
							{adminNavLinks.map(nav => (
								<NavLink
									to={`/admin${nav.href}`}
									key={nav.id}
									className={({ isActive }) =>
										`${isActive ? "active" : ""} nav-link`
									}
								>
									{t(`dashboard.${nav.title}`)}
								</NavLink>
							))}
							<Select
								onValueChange={value => {
									setAuctionFee(
										value.toLowerCase() === "copart"
											? EAuctionFee.COPART
											: EAuctionFee.IAAI
									),
										navigate(`/admin/auction-fee`);
								}}
							>
								<SelectTrigger className="nav-link !border-b-[1px] w-fit p-0 justify-start gap-x-5 focus:ring-0 border-none outline-none shadow-none text-base">
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
						</div>

						<AdminNavbarResponsive />
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
};
