import { icons } from "@/data";
import WelcomeImg from "../assets/imgs/cargoship-TA.jpg";

export const Welcome = () => {
	return (
		<div className="py-20">
			<div className="container">
				<div className="flex justify-center gap-20">
					<img
						className="size-96 object-cover rounded-md flex-1"
						src={WelcomeImg}
						alt=""
					/>

					<div className="flex flex-col gap-10 flex-1">
						<div className="text-4xl font-bold">
							Welcome to <span className="text-blue">Sola Group</span>
						</div>

						<p className="text-lg">
							We provide a complete end-to-end service, starting with expert
							bidding on your preferred vehicles at US auctions.
						</p>

						<p>
							We handle all the necessary paperwork and logistics, and ensuring
							safe and timely delivery to your specified location, wherever that
							may be.
						</p>

						<div className="flex gap-14 flex-wrap">
							{icons.map(icon => (
								<div className="flex  gap-2" key={icon.id}>
									<div>{icon.icon}</div>
									<div className="text-lg font-[600]">{icon.title}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
