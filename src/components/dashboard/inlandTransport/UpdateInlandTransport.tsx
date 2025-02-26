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
import { TInlandTransports } from "../types";
import { useUpdateInlandTransport } from "../hooks/inlandTransports/useUpdateInlandTransport";
import { t } from "i18next";
import { useFormState } from "react-hook-form";
import Select from "react-select";
import { useGetDestinations } from "../hooks/destination/useGetDestinations";
import { useGetSources } from "../hooks/source/useGetSources";
export const UpdateInlandTransport = (inlandTransport: TInlandTransports) => {
	const {
		isUpdatingInlandTransport,
		onUpdateInlandTransport,
		updateInlandTransportForm,
	} = useUpdateInlandTransport(inlandTransport.id.toString());

	const { destinations } = useGetDestinations();
	const { sources } = useGetSources();
	const formattedDestinations = destinations?.map(destination => ({
		label: destination.state,
		value: destination.id,
	}));
	const formattedSources = sources?.map(source => ({
		label: `${source.state} - ${source.city}`,
		value: source.id,
	}));

	const { isValid } = useFormState({
		control: updateInlandTransportForm.control,
	});

	useEffect(() => {
		if (inlandTransport) updateInlandTransportForm.reset(inlandTransport);
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					{t("dashboard.update.update", {
						name: t("dashboard.inlandTransport"),
					})}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						{t("dashboard.update.update", {
							name: t("dashboard.inlandTransport"),
						})}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("dashboard.update.updateDescription", {
							name: t("dashboard.inlandTransport"),
							names: t("dashboard.Inland transports"),
						})}
					</DialogDescription>
				</DialogHeader>
				<div>
					<Form {...updateInlandTransportForm}>
						<form
							className="flex flex-col gap-5"
							onSubmit={updateInlandTransportForm.handleSubmit(
								onUpdateInlandTransport
							)}
						>
							<FormField
								control={updateInlandTransportForm.control}
								name="source_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("dashboard.source")}</FormLabel>
										<FormControl>
											<Select
												isSearchable={true}
												options={formattedSources}
												className="basic-single"
												classNamePrefix="select"
												name="source"
												value={
													formattedSources?.find(
														src =>
															src.value.toString() == field.value.toString()
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
								control={updateInlandTransportForm.control}
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
												name="warehouse"
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
								control={updateInlandTransportForm.control}
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
												value={field.value === 0 ? "" : field.value}
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
									disabled={isUpdatingInlandTransport || !isValid}
								>
									{isUpdatingInlandTransport
										? t("dashboard.update.updating")
										: t("dashboard.update.update", {
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
