import logo from "../assets/imgs/logo.png";
import { contactDetails, navLinks } from "@/data";
export const Footer = () => {
	return (
		<div className="bg-main-color py-10">
			<div className="container">
				<div>
					<img src={logo} className="size-40 mx-auto object-cover" alt="" />
				</div>

				<div className="flex justify-center gap-20">
					<div className="flex flex-col gap-10 flex-1">
						<div>
							<h1 className="text-2xl font-bold">About</h1>
							<p className="max-w-[36rem]">
								We provide a complete end-to-end service, starting with expert
								bidding on your preferred vehicles at US auctions.
							</p>
						</div>

						<div className="flex flex-col gap-2 ">
							<h1 className="text-2xl font-bold">Contact Info</h1>

							<div className="flex flex-col gap-4">
								{contactDetails.map(contact => (
									<div className="flex items-center gap-2">
										{contact.contact}: <div>{contact.description}</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-2 flex-1 items-center">
						<h1 className="text-2xl font-bold">Quick Links</h1>
						<div className="flex flex-col gap-4">
							{navLinks.map(nav => (
								<div className="text-lg">{nav.title}</div>
							))}
						</div>
					</div>
				</div>
				<p className="mx-auto w-fit mt-10 font-bold">
					© 2025 SOLA INC. All rights reserved.
				</p>
			</div>
		</div>
	);
};
