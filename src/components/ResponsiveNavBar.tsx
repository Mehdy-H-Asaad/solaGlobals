import { useState } from "react";
import { navLinks } from "@/data";
import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import { FaEarthAmericas } from "react-icons/fa6";

export const ResponsiveNavBar = ({
	isBackgroundVisible,
}: {
	isBackgroundVisible: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(false);

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
					<div className="flex flex-col gap-10">
						{navLinks.map(nav => (
							<a
								href={nav.id}
								className="text-lg font-bold"
								key={nav.id}
								onClick={() => setIsOpen(false)} // Close sheet on click
							>
								{nav.title}
							</a>
						))}
						<div className="flex items-center gap-2">
							<FaEarthAmericas size={24} />
							<div className="text-lg font-bold">EN</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
