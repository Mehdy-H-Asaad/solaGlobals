import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { TDestination } from "../types";
import { useEffect } from "react";
import { useUpdateDestination } from "../hooks/destination/useUpdateDestination";
import { t } from "i18next";
import { useFormState } from "react-hook-form";

export const UpdateDestination = (destination: TDestination) => {
	const { updateDestinationForm, isUpdatingDestination, onUpdateDestination } =
		useUpdateDestination(Number(destination.id));

	useEffect(() => {
		if (destination) {
			updateDestinationForm.reset(destination);
		}
	}, []);

	const { isValid } = useFormState({ control: updateDestinationForm.control });

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white w-full">
					{t("dashboard.update.update", { name: t("dashboard.warehouse") })}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						{t("dashboard.update.update", { name: t("dashboard.warehouse") })}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("dashboard.update.updateDescription", {
							name: t("dashboard.warehouse"),
							names: t("dashboard.Warehouses"),
						})}
					</DialogDescription>
				</DialogHeader>
				<Form {...updateDestinationForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={updateDestinationForm.handleSubmit(onUpdateDestination)}
					>
						<FormField
							control={updateDestinationForm.control}
							name="state"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.state")} *</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.state")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={updateDestinationForm.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.city")}</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.city")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={updateDestinationForm.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.address")}</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.address")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={updateDestinationForm.control}
							name="zipcode"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.zip")}</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.zip")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								className="bg-blue hover:bg-cyan-800 text-white rtl:ml-auto"
								type="submit"
								disabled={isUpdatingDestination || !isValid}
							>
								{isUpdatingDestination
									? t("dashboard.update.updating")
									: t("dashboard.update.update", {
											name: t("dashboard.warehouse"),
									  })}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
