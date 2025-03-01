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
import { TCountry } from "../types";
import { useEffect } from "react";
import { t } from "i18next";
import { useFormState } from "react-hook-form";
import { useUpdateCountry } from "../hooks/countries/useUpdateCountry";

export const UpdateCountry = (country: TCountry) => {
	const { isUpdatingCountry, onUpdateCountry, updateCountryForm } =
		useUpdateCountry(country.id);

	useEffect(() => {
		if (country) {
			updateCountryForm.reset(country);
		}
	}, []);

	const { isValid } = useFormState({ control: updateCountryForm.control });

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white w-full">
					{t("dashboard.update.update", { name: t("dashboard.destination") })}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						{t("dashboard.update.update", { name: t("dashboard.destination") })}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("dashboard.update.updateDescription", {
							names: t("dashboard.destinations"),
							name: t("dashboard.destination"),
						})}
					</DialogDescription>
				</DialogHeader>
				<Form {...updateCountryForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={updateCountryForm.handleSubmit(onUpdateCountry)}
					>
						<FormField
							control={updateCountryForm.control}
							name="country"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.country")}</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.country")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={updateCountryForm.control}
							name="port"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.port")}</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.port")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								className="bg-blue rtl:ml-auto hover:bg-cyan-800 text-white"
								type="submit"
								disabled={isUpdatingCountry || !isValid}
							>
								{isUpdatingCountry
									? t("dashboard.update.updating")
									: t("dashboard.update.update", {
											name: t("dashboard.destination"),
									  })}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
