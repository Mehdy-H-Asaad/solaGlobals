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
import { useGetShippingLines } from "./dashboard/hooks/shppingLines/useGetShippingLines";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "./ui/scroll-area";
import i18next from "i18next";
import { useGetCountries } from "./dashboard/hooks/countries/useGetCountries";
import { useGetDestinationsOrderCost } from "./dashboard/hooks/destination/useGetDestinationsOrderCost";
import { useFiltersStore } from "@/state/filters.state";
import { TrackVehicleResponse } from "./TrackVehicleResponse";
export const TrackVehicle = () => {
	const { t } = useTranslation();
	const {
		estimateCost,
		estimateCostForm,
		isGettingEstimateCost,
		onGetEstimateCost,
	} = useEstimateCost();

	const { sources } = useGetSources();
	const { shippingLines } = useGetShippingLines();
	const { countries } = useGetCountries();
	const formattedSources = [
		...new Map(
			sources?.map(source => [
				source.state,
				{
					label: source.state,
					value: source.id,
				},
			])
		).values(),
	];

	const {
		destination_country,
		shipping_line_id,
		destination_port,
		source_id,
		setFilters,
	} = useFiltersStore();

	const { destinationsByOrderCost } = useGetDestinationsOrderCost({
		destination_country,
		destination_port,
		shipping_line_id,
		source_id,
	});

	const formattedDestinationsOrderCost = destinationsByOrderCost?.map(
		destination => ({
			value: destination.id,
			label: destination.state,
		})
	);
	const formattedShippingLines = shippingLines?.map(shippingLine => ({
		value: shippingLine.id,
		label: shippingLine.name,
	}));

	const formattedAuctions = [
		{
			value: "COPART",
			label: "Copart",
		},
		{
			value: "IAAI",
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

	const formattedCountries = countries?.map(country => ({
		label: country.country,
		value: country.country,
	}));
	const formattedPorts = countries?.map(country => ({
		label: country.port,
		value: country.port,
	}));

	const lang = i18next.language === "ar" ? "rtl" : "ltr";

	return (
		// <div className="flex items-center gap-20">
		<Dialog>
			<DialogTrigger className="w-full py-3 px-6">
				{t("hero.button")}
			</DialogTrigger>

			<DialogContent className="max-w-full size-full">
				{/*sm:max-w-[625px]*/}
				<ScrollArea className="max-h-[650px] px-2">
					<DialogHeader className="rtl:items-center">
						<DialogTitle>{t("hero.estimateCost.dialogTitle")}</DialogTitle>
						<DialogDescription>
							{t("hero.estimateCost.dialogDescription")}
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col md:flex-row gap-10">
						<Form {...estimateCostForm}>
							<form
								className="flex-1"
								onSubmit={estimateCostForm.handleSubmit(onGetEstimateCost)}
							>
								<div
									dir={lang}
									className="grid flex-1 py-10 grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10"
								>
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
									<FormField
										control={estimateCostForm.control}
										name="auction"
										render={({ field }) => (
											<FormItem>
												<FormLabel>{t("hero.estimateCost.auction")}</FormLabel>
												<FormControl>
													<Select
														placeholder={t("hero.estimateCost.auction")}
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
														placeholder={t("hero.estimateCost.source")}
														className="basic-single"
														classNamePrefix="select"
														onChange={option => {
															field.onChange(option?.value);
															setFilters({ source_id: Number(option?.value) });
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
										name="destination_country"
										render={({ field }) => (
											<FormItem>
												<FormLabel>{t("dashboard.country")}</FormLabel>
												<FormControl>
													<Select
														placeholder={t("hero.estimateCost.country")}
														className="basic-single"
														classNamePrefix="select"
														onChange={option => {
															field.onChange(option?.value);
															setFilters({
																destination_country: option?.label,
															});
														}}
														isSearchable={true}
														name="country"
														options={formattedCountries}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={estimateCostForm.control}
										name="destination_port"
										render={({ field }) => (
											<FormItem>
												<FormLabel>{t("hero.estimateCost.port")}</FormLabel>
												<FormControl>
													<Select
														placeholder={t("hero.estimateCost.port")}
														className="basic-single"
														classNamePrefix="select"
														onChange={option => {
															field.onChange(option?.value);
															setFilters({ destination_port: option?.label });
														}}
														isSearchable={true}
														name="country"
														options={formattedPorts}
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
														placeholder={t("hero.estimateCost.shippingLine")}
														className="basic-single"
														classNamePrefix="select"
														onChange={option => {
															field.onChange(option?.value);
															setFilters({ shipping_line_id: option?.value });
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
														placeholder={t("hero.estimateCost.shippingType")}
														className="basic-single"
														classNamePrefix="select"
														onChange={option => {
															field.onChange(option?.value);
														}}
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
										name="warehouse"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{t("hero.estimateCost.warehouse")}
												</FormLabel>
												<FormControl>
													<Select
														placeholder={t("hero.estimateCost.warehouse")}
														className="basic-single"
														classNamePrefix="select"
														onChange={option => field.onChange(option?.value)}
														isSearchable={true}
														name="Warehouse"
														options={formattedDestinationsOrderCost}
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
						{!true ? (
							""
						) : (
							<TrackVehicleResponse lang={lang} estimateCost={estimateCost} />
						)}
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
		// </div>
	);
};
