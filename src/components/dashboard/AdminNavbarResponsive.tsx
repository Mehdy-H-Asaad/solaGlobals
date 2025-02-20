import { CiMenuFries } from "react-icons/ci";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";
import { adminNavLinks } from "./data";
import { Link } from "react-router-dom";

export const AdminNavbarResponsive = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className="block lg:hidden">
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<CiMenuFries
						size={24}
						className={`text-black cursor-pointer`}
						onClick={() => setIsOpen(true)}
					/>
				</SheetTrigger>
				<SheetContent className="bg-main-color text-black">
					<div className="flex flex-col gap-10">
						{adminNavLinks.map(nav => (
							<Link
								to={`/admin${nav.href}`}
								className="text-lg font-bold nav-link"
								key={nav.id}
								onClick={() => setIsOpen(false)} // Close sheet on click
							>
								{nav.title}
							</Link>
						))}
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
