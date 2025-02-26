import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogHeader,
	DialogFooter,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useEstimateCost } from "@/hooks/useEstimateCost";
import Select from "react-select";
import { useGetSources } from "./dashboard/hooks/source/useGetSources";
import { useGetDestinations } from "./dashboard/hooks/destination/useGetDestinations";
import { useGetShippingLines } from "./dashboard/hooks/shppingLines/useGetShippingLines";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/utils/formatCurrency";
import { ScrollArea } from "./ui/scroll-area";
import i18next from "i18next";
export const TrackVehicle = () => {
	const { t } = useTranslation();
	const {
		estimateCost,
		estimateCostForm,
		isGettingEstimateCost,
		onGetEstimateCost,
	} = useEstimateCost();

	const { sources } = useGetSources();
	const { destinations } = useGetDestinations();
	const { shippingLines } = useGetShippingLines();

	const formattedSources = sources?.map(source => ({
		value: source.id,
		label: source.state,
	}));
	const formattedDestination = destinations?.map(destination => ({
		value: destination.id,
		label: destination.state,
	}));
	const formattedShippingLines = shippingLines?.map(shippingLine => ({
		value: shippingLine.id,
		label: shippingLine.name,
	}));

	const formattedAuctions = [
		{
			value: 1,
			label: "Copart",
		},
		{
			value: 2,
			label: "IAAI",
		},
	];
	const formattedShippingTypes = [
		{
			value: 1,
			label: t("hero.estimateCost.triple"),
		},
		{
			value: 2,
			label: t("hero.estimateCost.quadruple"),
		},
	];

	const lang = i18next.language === "ar" ? "rtl" : "ltr";

	return (
		<Dialog>
			<DialogTrigger className="w-full py-3 px-6">
				{t("hero.button")}
			</DialogTrigger>

			<DialogContent className="sm:max-w-[625px]">
				<ScrollArea className="max-h-[650px] px-2">
					<DialogHeader className="rtl:items-center">
						<DialogTitle>{t("hero.estimateCost.dialogTitle")}</DialogTitle>
						<DialogDescription>
							{t("hero.estimateCost.dialogDescription")}
						</DialogDescription>
					</DialogHeader>
					<div>
						<Form {...estimateCostForm}>
							<form onSubmit={estimateCostForm.handleSubmit(onGetEstimateCost)}>
								<div
									dir={lang}
									className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10"
								>
									<FormField
										control={estimateCostForm.control}
										name="auction"
										render={({ field }) => (
											<FormItem>
												<FormLabel>{t("hero.estimateCost.auction")}</FormLabel>
												<FormControl>
													<Select
														placeholder={t("hero.estimateCost.placeHolder")}
														className="basic-single"
														classNamePrefix="select"
														onChange={option => field.onChange(option?.value)}
														isSearchable={true}
														name="Auction"
														options={formattedAuctions}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={estimateCostForm.control}
										name="source"
										render={({ field }) => (
											<FormItem>
												<FormLabel>{t("hero.estimateCost.source")}</FormLabel>
												<FormControl>
													<Select
														placeholder={t("hero.estimateCost.placeHolder")}
														className="basic-single"
														classNamePrefix="select"
														onChange={option => {
															field.onChange(option?.value);
														}}
														isSearchable={true}
														name="Source"
														options={formattedSources}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={estimateCostForm.control}
										name="warehouse"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{t("hero.estimateCost.warehouse")}
												</FormLabel>
												<FormControl>
													<Select
														placeholder={t("hero.estimateCost.placeHolder")}
														className="basic-single"
														classNamePrefix="select"
														onChange={option => field.onChange(option?.value)}
														isSearchable={true}
														name="Warehouse"
														options={formattedDestination}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={estimateCostForm.control}
										name="shipping_line"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{t("hero.estimateCost.shippingLine")}
												</FormLabel>
												<FormControl>
													<Select
														placeholder={t("hero.estimateCost.placeHolder")}
														className="basic-single"
														classNamePrefix="select"
														onChange={option => {
															field.onChange(option?.value);
														}}
														isSearchable={true}
														name="Shipping line"
														options={formattedShippingLines}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={estimateCostForm.control}
										name="shipping_type"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{t("hero.estimateCost.shippingType")}
												</FormLabel>
												<FormControl>
													<Select
														placeholder={t("hero.estimateCost.placeHolder")}
														className="basic-single"
														classNamePrefix="select"
														onChange={option => field.onChange(option?.value)}
														isSearchable={true}
														name="Shipping type"
														options={formattedShippingTypes}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={estimateCostForm.control}
										name="vin"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Vin</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Vin" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={estimateCostForm.control}
										name="amount"
										render={({ field }) => (
											<FormItem>
												<FormLabel>{t("hero.estimateCost.bid")}</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder={t("hero.estimateCost.bid")}
														onChange={e => {
															if (/^\d*$/.test(e.target.value))
																field.onChange(Number(e.target.value));
														}}
														value={field.value === 0 ? "" : field.value}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<DialogFooter>
									<Button
										className=" bg-blue hover:bg-cyan-800 text-white mt-8 mx-auto"
										type="submit"
										disabled={isGettingEstimateCost}
									>
										{isGettingEstimateCost
											? t("hero.estimateCost.calculating")
											: t("hero.estimateCost.calculate")}
									</Button>
								</DialogFooter>
							</form>
						</Form>
						{!estimateCost ? (
							""
						) : (
							<div
								dir={lang}
								className="mt-10 pt-4 grid grid-cols-1 w-full gap-4 gap-x-10 border-t border-t-gray-300"
							>
								<div className="font-[600]">
									{t("hero.estimateCost.cost")}:{" "}
									<span className="font-bold text-2xl text-blue">
										{formatCurrency(Number(estimateCost?.cost))}
									</span>
								</div>
								<div className="font-[600]">
									{t("hero.estimateCost.model")}:{" "}
									{!estimateCost.year ? "N/A" : estimateCost.year}
								</div>
								<div className="font-[600]">
									{t("hero.estimateCost.manufacturer")}:{" "}
									{!estimateCost.year ? "N/A" : estimateCost.manufacturer}
								</div>
								<div className="font-[600]">
									{t("hero.estimateCost.country")}:{" "}
									{!estimateCost.year ? "N/A" : estimateCost.country}
								</div>
							</div>
						)}
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};
