import { howWeWorkData } from "@/data";

export const HowWeWork = () => {
	return (
		<div className="py-20 bg-[#f1f5fa]" id="work">
			<div className="container">
				<div className="text-4xl font-bold w-fit mx-auto mb-10">
					How We <span className="text-blue">Work</span>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
					{howWeWorkData.map((work, index) => (
						<div className="flex flex-col gap-4 items-center">
							<div key={work.id} className="font-bold text-6xl  w-fit">
								<span className="how-we-work-num">0</span>
								{index + 1}
							</div>
							<div className="font-bold text-xl">{work.titel}</div>
							<p className="text-sm text-center">{work.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
