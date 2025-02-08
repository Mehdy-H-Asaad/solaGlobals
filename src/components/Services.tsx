import { servicesData } from "@/data";

export const Services = () => {
	return (
		<div className="py-20" id="services">
			<div className="container">
				<div className="text-center font-[700] text-5xl">
					Our
					<span className="text-blue"> Services</span>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20 mt-10">
					{servicesData.map(service => (
						<div
							key={service.id}
							className="flex flex-col gap-4 border-[3px] p-4 rounded-md border-black relative"
						>
							<div>
								<service.icon
									className="absolute text-blue w-20 -top-4 bg-white left-4"
									size={35}
								/>
							</div>
							<div className="font-bold text-xl">{service.title}</div>
							<div className="text-lg">{service.service}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
