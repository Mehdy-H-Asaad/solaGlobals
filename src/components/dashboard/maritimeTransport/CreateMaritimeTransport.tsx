import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetDestinations } from "../hooks/destination/useGetDestinations";
import { useCreateMaritimeTransport } from "../hooks/maritimeTransports/useCreateMaritimeTransport";
import { useGetShippingLines } from "../hooks/shppingLines/useGetShippingLines";
import { useFormState } from "react-hook-form";
import Select from "react-select";
import { t } from "i18next";
import { useGetCountries } from "../hooks/countries/useGetCountries";
export const CreateMaritimeTransport = () => {
	const {
		createMaritimeTransportForm,
		isCreatingMaritimeTransport,
		onCreateMaritimeTransport,
	} = useCreateMaritimeTransport();

	const { shippingLines } = useGetShippingLines();
	const { destinations } = useGetDestinations();

	const formattedDestinations = destinations?.map(destination => ({
		label: destination.state,
		value: destination.id,
	}));
	const formattedShippingLines = shippingLines?.map(shippingLine => ({
		label: shippingLine.name,
		value: shippingLine.id,
	}));

	const { countries } = useGetCountries();

	const formattedCountries = countries?.map(country => ({
		label: `${country.country} - ${country.port}`,
		value: country.id,
	}));

	const { isValid } = useFormState({
		control: createMaritimeTransportForm.control,
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white w-fit">
					{t("dashboard.create.create", {
						name: t("dashboard.maritimeTransport"),
					})}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						{t("dashboard.create.create", {
							name: t("dashboard.maritimeTransport"),
						})}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("dashboard.create.createDescription", {
							name: t("dashboard.maritimeTransport"),
							names: t("dashboard.Maritime transports"),
						})}
					</DialogDescription>
				</DialogHeader>
				<div>
					<Form {...createMaritimeTransportForm}>
						<form
							className="flex flex-col gap-5"
							onSubmit={createMaritimeTransportForm.handleSubmit(
								onCreateMaritimeTransport
							)}
						>
							<FormField
								control={createMaritimeTransportForm.control}
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
												onChange={option => field.onChange(option?.value)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={createMaritimeTransportForm.control}
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
												onChange={option => field.onChange(option?.value)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={createMaritimeTransportForm.control}
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
												name="destination"
												onChange={option => {
													field.onChange(option?.value);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={createMaritimeTransportForm.control}
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
													if (/^\d*$/.test(value)) {
														field.onChange(
															value === "" ? undefined : Number(value)
														);
													}
												}}
												value={field.value === undefined ? "" : field.value}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter>
								<Button
									className="rtl:ml-auto bg-blue hover:bg-cyan-800 text-white"
									type="submit"
									disabled={isCreatingMaritimeTransport || !isValid}
								>
									{isCreatingMaritimeTransport
										? t("dashboard.create.creating")
										: t("dashboard.create.create", {
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
