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

	const { isValid } = useFormState({
		control: createMaritimeTransportForm.control,
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					{t("dashboard.create.create", {
						name: t("dashboard.maritimeTransport"),
					})}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{t("dashboard.create.create", {
							name: t("dashboard.maritimeTransport"),
						})}
					</DialogTitle>
					<DialogDescription>
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
										<FormLabel>{t("dashboard.shippingLine")}</FormLabel>
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
										<FormLabel>{t("dashboard.warehouse")}</FormLabel>
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
								name="cost"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("dashboard.cost")}</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder={t("dashboard.cost")}
												onChange={e => {
													if (/^\d*$/.test(e.target.value))
														field.onChange(Number(e.target.value));
												}}
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
