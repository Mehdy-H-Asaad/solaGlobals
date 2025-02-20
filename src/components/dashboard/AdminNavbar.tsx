import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import { adminNavLinks } from "./data";
import { AdminNavbarResponsive } from "./AdminNavbarResponsive";
export const AdminNavbar = () => {
	return (
		<>
			<div className="flex items-center justify-between h-24 shadow-md bg-white">
				<div className="container">
					<div className="flex items-center justify-between">
						<img src={logo} className="w-32" alt="Not found" loading="lazy" />

						<div className="hidden lg:flex gap-10">
							{adminNavLinks.map(nav => (
								<NavLink
									to={`/admin${nav.href}`}
									key={nav.id}
									className={({ isActive }) =>
										`${isActive ? "active" : ""} nav-link`
									}
								>
									{nav.title}
								</NavLink>
							))}
						</div>

						<AdminNavbarResponsive />
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
};
