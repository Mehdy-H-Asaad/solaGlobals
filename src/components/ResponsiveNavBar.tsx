import { navLinks } from "@/data";
import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import { FaEarthAmericas } from "react-icons/fa6";

export const ResponsiveNavBar = () => {
	return (
		<div className="block lg:hidden">
			<Sheet>
				<SheetTrigger asChild>
					<CiMenuFries size={24} className="text-white cursor-pointer" />
				</SheetTrigger>
				<SheetContent className="bg-main-color text-black">
					<div className="flex flex-col gap-10">
						{navLinks.map(nav => (
							<a href={nav.id} className="text-lg font-bold" key={nav.id}>
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
