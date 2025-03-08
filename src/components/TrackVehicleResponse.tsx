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
			className="mt-10 pl-8 flex-1 pt-4 lg:pt-0 grid grid-cols-1 w-full gap-y-20 lg:gap-y-0 gap-x-10 border-t border-t-gray-300 lg:border-t-0 lg:border-l lg:border-l-gray-300"
		>
			<div className="flex justify-between">
				<div className="flex flex-col gap-1">
					<div className="font-[600]">{t("hero.estimateCost.toInland")}: </div>
					<div className="text-sm max-w-[250px] text-[#737373] lg:lg:max-w-[400px]">
						{t("hero.estimateCost.response.inland")}
					</div>
				</div>
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
			<div className="flex justify-between">
				<div className="flex flex-col gap-1">
					<div className="font-[600]">
						{t("hero.estimateCost.toMaritimeTransport")}:{" "}
					</div>
					<div className="text-sm max-w-[250px] text-[#737373] lg:max-w-[400px]">
						{t("hero.estimateCost.response.maritime")}
					</div>
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
			<div className="flex justify-between">
				<div>
					<div className="font-[600]">
						{t("hero.estimateCost.auctionFee")}:{" "}
					</div>
					<div className="text-sm max-w-[250px] text-[#737373] lg:max-w-[400px]">
						{t("hero.estimateCost.response.auctionFee")}
					</div>
				</div>
				<span className="font-bold text-xl sm:text-2xl text-blue">
					{formatCurrency(
						Number(estimateCost?.auction_fee ? estimateCost.auction_fee : "")
					)}
				</span>
			</div>
			<div className="flex justify-between">
				<div className="flex flex-col gap-1">
					<div className="font-[600]">{t("hero.estimateCost.amount")}: </div>
					<div className="text-sm max-w-[250px] text-[#737373] lg:max-w-[400px]">
						{t("hero.estimateCost.response.amount")}
					</div>
				</div>
				<span className="font-bold text-xl sm:text-2xl text-blue">
					{formatCurrency(
						Number(estimateCost?.amount ? estimateCost.amount : "")
					)}
				</span>
			</div>
			<div className="flex justify-between">
				<div className="flex flex-col gap-1">
					<div className="font-[600]">
						{t("hero.estimateCost.companyFee")}:{" "}
					</div>
					<div className="text-sm max-w-[250px] text-[#737373] lg:max-w-[400px]">
						{t("hero.estimateCost.response.companyFee")}
					</div>
				</div>
				<span className="font-bold text-xl sm:text-2xl text-blue">
					{formatCurrency(
						Number(estimateCost?.company_fee ? estimateCost.company_fee : "")
					)}
				</span>
			</div>
			<div className="flex justify-between">
				<div className="flex flex-col gap-1">
					<div className="font-[600]">{t("hero.estimateCost.cost")}: </div>
					<div className="text-sm max-w-[250px] text-[#737373] lg:max-w-[400px]">
						{t("hero.estimateCost.response.cost")}
					</div>
				</div>
				<span className="font-bold text-xl sm:text-2xl text-blue">
					{formatCurrency(
						Number(estimateCost?.total_cost ? estimateCost.total_cost : "")
					)}
				</span>
			</div>

			<div className="flex flex-col">
				<h1 className="text-2xl font-bold mb-10">
					{t("hero.estimateCost.response.additional")}
				</h1>
				<div className="flex flex-col gap-y-10">
					<div className="flex justify-between">
						<div className="font-[600]">{t("hero.estimateCost.model")}: </div>
						<span className="font-bold text-lg sm:text-2xl text-blue">
							{estimateCost?.year ? estimateCost.year : "N/A"}
						</span>
					</div>
					<div className="flex justify-between">
						<div className="font-[600]">
							{t("hero.estimateCost.manufacturer")}:{" "}
						</div>
						<span className="font-bold text-lg sm:text-2xl text-blue">
							{estimateCost?.manufacturer ? estimateCost.manufacturer : "N/A"}
						</span>
					</div>
					<div className="flex justify-between">
						<div className="font-[600]">{t("hero.estimateCost.country")}: </div>
						<span className="font-bold text-lg sm:text-2xl text-blue">
							{estimateCost?.country ? estimateCost.country : "N/A"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
