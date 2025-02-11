import { motion } from "framer-motion";
export const Hero = () => {
	return (
		<div className="py-20 hero-bg h-[900px] sm:h-screen flex items-center justify-center ">
			<div className="container">
				<div className="relative flex items-center justify-center">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-white  flex flex-col gap-10 items-center"
					>
						<div className="text-3xl md:text-5xl lg:text-7xl max-w-[60rem] text-center">
							Drive Your Dreams With
							<span className="font-[900] text-blue"> Sola Groups</span>
						</div>
						<p className="text-3xl text-center">
							Sola Groups: Your Bridge to Quality Cars From the USA to Libya
						</p>
						<div className="cursor-pointer duration-200 hover:bg-white hover:text-black text-lg font-[600] bg-blue text-white py-3 px-6 rounded-md">
							Track Your Vehicle
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
