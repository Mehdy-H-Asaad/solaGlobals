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
import { t } from "i18next";
import { useFormState } from "react-hook-form";
import { useCreateCountry } from "../hooks/countries/useCreateCountry";

export const CreateCountry = () => {
	const { createCountryForm, isCreatingCountry, onCreateCountry } =
		useCreateCountry();

	const { isValid } = useFormState({ control: createCountryForm.control });

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white w-fit">
					{t("dashboard.create.create", { name: t("dashboard.destination") })}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						{t("dashboard.create.create", { name: t("dashboard.destination") })}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("dashboard.create.createDescription", {
							names: t("dashboard.destinations"),
							name: t("dashboard.destination"),
						})}
					</DialogDescription>
				</DialogHeader>
				<Form {...createCountryForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={createCountryForm.handleSubmit(onCreateCountry)}
					>
						<FormField
							control={createCountryForm.control}
							name="country"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.country")} *</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.country")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={createCountryForm.control}
							name="port"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.port")} *</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.port")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								className="bg-blue hover:bg-cyan-800 text-white rtl:ml-auto"
								type="submit"
								disabled={isCreatingCountry || !isValid}
							>
								{isCreatingCountry
									? t("dashboard.create.creating")
									: t("dashboard.create.create", {
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
