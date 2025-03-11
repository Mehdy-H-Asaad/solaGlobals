import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { TMaritimeTransports } from "../types";
import { useUpdateMaritimeTransport } from "../hooks/maritimeTransports/useUpdateMaritimeTransport";
import { useFormState } from "react-hook-form";
import { useGetDestinations } from "../hooks/destination/useGetDestinations";
import { useGetShippingLines } from "../hooks/shppingLines/useGetShippingLines";
import Select from "react-select";
import { t } from "i18next";
import { useGetCountries } from "../hooks/countries/useGetCountries";
export const UpdateMaritimeTransport = (
	maritimeTransport: TMaritimeTransports
) => {
	const {
		isUpdatingMaritimeTransport,
		onUpdateMaritimeTransport,
		updateMaritimeTransportForm,
	} = useUpdateMaritimeTransport(maritimeTransport.id.toString());

	const { shippingLines } = useGetShippingLines();
	const { destinations } = useGetDestinations();
	const { countries } = useGetCountries();
	const formattedDestinations = destinations?.map(destination => ({
		label: destination.state,
		value: destination.id,
	}));
	const formattedShippingLines = shippingLines?.map(shippingLine => ({
		label: shippingLine.name,
		value: shippingLine.id,
	}));

	const formattedCountries = countries?.map(country => ({
		label: `${country.country} - ${country.port}`,
		value: country.id,
	}));

	const { isValid } = useFormState({
		control: updateMaritimeTransportForm.control,
	});

	useEffect(() => {
		if (maritimeTransport) {
			updateMaritimeTransportForm.reset(maritimeTransport);
		}
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					{t("dashboard.update.update", {
						name: t("dashboard.maritimeTransport"),
					})}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						{t("dashboard.update.update", {
							name: t("dashboard.maritimeTransport"),
						})}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("dashboard.update.updateDescription", {
							name: t("dashboard.maritimeTransport"),
							names: t("dashboard.Maritime transports"),
						})}
					</DialogDescription>
				</DialogHeader>
				<div>
					<Form {...updateMaritimeTransportForm}>
						<form
							className="flex flex-col gap-5"
							onSubmit={updateMaritimeTransportForm.handleSubmit(
								onUpdateMaritimeTransport
							)}
						>
							<FormField
								control={updateMaritimeTransportForm.control}
								name="shipping_line_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("dashboard.shippingLine")} *</FormLabel>
										<FormControl>
											<Select
												isSearchable={true}
												options={formattedShippingLines}
												className="basic-single"
												classNamePrefix="select"
												name="source"
												value={
													formattedShippingLines?.find(
														des =>
															des.value.toString() == field.value.toString()
													) || null
												}
												onChange={option => field.onChange(option?.value)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={updateMaritimeTransportForm.control}
								name="warehouse_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("dashboard.warehouse")} *</FormLabel>
										<FormControl>
											<Select
												isSearchable={true}
												options={formattedDestinations}
												className="basic-single"
												classNamePrefix="select"
												name="source"
												value={
													formattedDestinations?.find(
														des =>
															des.value.toString() == field.value.toString()
													) || null
												}
												onChange={option => field.onChange(option?.value)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={updateMaritimeTransportForm.control}
								name="destination_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("dashboard.destination")} *</FormLabel>
										<FormControl>
											<Select
												isSearchable={true}
												options={formattedCountries}
												className="basic-single"
												classNamePrefix="select"
												name="source"
												value={
													formattedCountries?.find(
														country =>
															country.value.toString() == field.value.toString()
													) || null
												}
												onChange={option => field.onChange(option?.value)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={updateMaritimeTransportForm.control}
								name="cost"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("dashboard.cost")} *</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder={t("dashboard.cost")}
												onChange={e => {
													const value = e.target.value;
													if (value === "") {
														field.onChange(null);
													} else if (/^\d+$/.test(value)) {
														field.onChange(Number(value));
													}
												}}
												value={field.value === null ? "" : field.value}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter>
								<Button
									className="bg-blue hover:bg-cyan-800 text-white rtl:ml-auto"
									type="submit"
									disabled={!isValid}
								>
									{isUpdatingMaritimeTransport
										? t("dashboard.update.updating")
										: t("dashboard.update.update", {
												name: t("dashboard.maritimeTransport"),
										  })}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};
