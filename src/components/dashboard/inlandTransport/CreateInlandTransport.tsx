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
import { useCreateInlandTransport } from "../hooks/inlandTransports/useCreateInlandTransport";
import { useGetSources } from "../hooks/source/useGetSources";
import { useGetDestinations } from "../hooks/destination/useGetDestinations";
import { t } from "i18next";
import { useFormState } from "react-hook-form";
import Select from "react-select";
export const CreateInlandTransport = () => {
	const {
		createInlandTransportForm,
		isCreatingInlandTransport,
		onCreateInlandTransport,
	} = useCreateInlandTransport();

	const { destinations } = useGetDestinations();
	const { sources } = useGetSources();

	const formattedDestinations = destinations?.map(destination => ({
		label: destination.state,
		value: destination.id,
	}));
	const formattedSources = sources?.map(source => ({
		label: `${source.state} - ${source.city} ${source.address}`,
		value: source.id,
	}));

	const { isValid } = useFormState({
		control: createInlandTransportForm.control,
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 w-fit text-white">
					{t("dashboard.create.create", {
						name: t("dashboard.Inland transports"),
					})}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						{t("dashboard.create.create", {
							name: t("dashboard.Inland transports"),
						})}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("dashboard.create.createDescription", {
							names: t("dashboard.Inland transports"),
							name: t("dashboard.inlandTransport"),
						})}
					</DialogDescription>
				</DialogHeader>
				<div>
					<Form {...createInlandTransportForm}>
						<form
							className="flex flex-col gap-5"
							onSubmit={createInlandTransportForm.handleSubmit(
								onCreateInlandTransport
							)}
						>
							<FormField
								control={createInlandTransportForm.control}
								name="source_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("dashboard.source")} *</FormLabel>
										<FormControl>
											<Select
												isSearchable={true}
												options={formattedSources}
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
								control={createInlandTransportForm.control}
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
												name="warehouse"
												onChange={option => field.onChange(option?.value)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={createInlandTransportForm.control}
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
									className="bg-blue hover:bg-cyan-800 text-white rtl:ml-auto"
									type="submit"
									disabled={isCreatingInlandTransport || !isValid}
								>
									{isCreatingInlandTransport
										? t("dashboard.create.creating")
										: t("dashboard.create.create", {
												name: t("dashboard.inlandTransport"),
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
