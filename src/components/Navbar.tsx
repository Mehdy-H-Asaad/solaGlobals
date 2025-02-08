import { navLinks } from "@/data";
import { useEffect, useState } from "react";
import Logo from "../assets/imgs/logo.png";

export const Navbar = () => {
	const [isBackgroundVisible, setIsBackGroundVisible] = useState<boolean>(
		typeof window !== "undefined" && window.scrollY > 50
	);

	useEffect(() => {
		const handleScroll = () => {
			setIsBackGroundVisible(window.scrollY > 50);
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className={`${
				isBackgroundVisible
					? "bg-white text-black shadow-sm"
					: "bg-transparent text-white"
			} h-24 flex items-center fixed top-0 left-0 w-full z-10 duration-200`}
		>
			<div className="container">
				<div className="flex items-center justify-between">
					<img src={Logo} className="w-32" alt="Logo" />

					<div className="flex items-center gap-10">
						{navLinks.map(link => (
							<a
								href={link.id}
								className="font-bold cursor-pointer nav-link"
								key={link.id}
							>
								{link.title}
							</a>
						))}
					</div>

					<div className="flex flex-col gap-2">
						<div className="font-bold">Call Us Today: </div>
						<a href="tel:+218 91-4729090">+218 91-4729090</a>
					</div>
				</div>
			</div>
		</div>
	);
};
