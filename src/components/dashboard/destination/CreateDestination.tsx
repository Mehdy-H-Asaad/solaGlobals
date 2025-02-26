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
import { useCreateDestination } from "../hooks/destination/useCreateDestination";
import { t } from "i18next";
import { useFormState } from "react-hook-form";

export const CreateDestination = () => {
	const { createDestinationForm, isCreatingDestination, onCreateDestination } =
		useCreateDestination();

	const { isValid } = useFormState({ control: createDestinationForm.control });

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					{t("dashboard.create.create", { name: t("dashboard.warehouse") })}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						{t("dashboard.create.create", { name: t("dashboard.warehouse") })}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("dashboard.create.createDescription", {
							name: t("dashboard.warehouse"),
							names: t("dashboard.Warehouses"),
						})}
					</DialogDescription>
				</DialogHeader>

				<Form {...createDestinationForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={createDestinationForm.handleSubmit(onCreateDestination)}
					>
						<FormField
							control={createDestinationForm.control}
							name="state"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.state")}</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.state")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={createDestinationForm.control}
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
							control={createDestinationForm.control}
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
							control={createDestinationForm.control}
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
								disabled={isCreatingDestination || !isValid}
							>
								{isCreatingDestination
									? t("dashboard.create.creating")
									: t("dashboard.create.create", {
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
