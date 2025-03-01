import { TGetEstimateCost } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { t } from "i18next";

export const TrackVehicleResponse = ({
	lang,
	estimateCost,
}: {
	lang: "rtl" | "ltr";
	estimateCost: TGetEstimateCost | undefined;
}) => {
	return (
		<div
			dir={lang}
			className="mt-10 pl-8 flex-1 pt-4 grid grid-cols-1 w-full gap-4 gap-x-10 border-l border-l-gray-300"
		>
			<div className="flex items-center justify-between">
				<div className="font-[600]">{t("hero.estimateCost.cost")}: </div>
				<span className="font-bold text-xl sm:text-2xl text-blue">
					{formatCurrency(
						Number(estimateCost?.total_cost ? estimateCost.total_cost : "")
					)}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<div className="font-[600]">{t("hero.estimateCost.model")}: </div>
				<span className="font-bold text-xl sm:text-2xl text-blue">
					{estimateCost?.year}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<div className="font-[600]">
					{t("hero.estimateCost.manufacturer")}:{" "}
				</div>
				<span className="font-bold text-xl sm:text-2xl text-blue">
					{estimateCost?.manufacturer}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<div className="font-[600]">{t("hero.estimateCost.country")}: </div>
				<span className="font-bold text-xl sm:text-2xl text-blue">
					{estimateCost?.country}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<div className="font-[600]">{t("hero.estimateCost.toInland")}: </div>
				<span className="font-bold text-xl sm:text-2xl text-blue">
					{formatCurrency(
						Number(
							estimateCost?.inland_transport_cost
								? estimateCost.inland_transport_cost
								: ""
						)
					)}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<div className="font-[600]">
					{t("hero.estimateCost.toMaritimeTransport")}:{" "}
				</div>
				<span className="font-bold text-xl sm:text-2xl text-blue">
					{formatCurrency(
						Number(
							estimateCost?.maritime_transport_cost
								? estimateCost.maritime_transport_cost
								: ""
						)
					)}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<div className="font-[600]">{t("hero.estimateCost.auctionFee")}: </div>
				<span className="font-bold text-xl sm:text-2xl text-blue">
					{formatCurrency(
						Number(estimateCost?.auction_fee ? estimateCost.auction_fee : "")
					)}
				</span>
			</div>
		</div>
	);
};
