import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { TrackVehicle } from "./TrackVehicle";
export const Hero = () => {
	const { t } = useTranslation();

	return (
		<div className="py-20 hero-bg h-[700px] sm:h-screen flex items-center justify-center ">
			<div className="container">
				<div className="relative flex items-center justify-center">
					<motion.div
						viewport={{ once: true }}
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-white  flex flex-col gap-10 items-center"
					>
						<div className="text-3xl md:text-5xl lg:text-7xl max-w-[60rem] text-center">
							<Trans i18nKey="hero.title">
								<span className="font-[900] text-blue"> Sola Groups</span>
							</Trans>
						</div>
						<p className="text-xl sm:text-3xl text-center">
							{t("hero.paraghraph")}
							{/* Sola Groups: Your Bridge to Quality Cars From the USA to Libya */}
						</p>
						<div className=" cursor-pointer duration-200 hover:bg-white hover:text-black text-lg font-[600] bg-blue text-white rounded-md">
							<TrackVehicle />
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
