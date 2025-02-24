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
import { useCreateSource } from "../hooks/source/useCreateSource";
import { t } from "i18next";
import { useFormState } from "react-hook-form";

export const CreateSource = () => {
	const { createSourceForm, onCreateSource, isCreatingSource } =
		useCreateSource();

	const { isValid } = useFormState({ control: createSourceForm.control });

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					{t("dashboard.create.create", { name: t("dashboard.Sources") })}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{t("dashboard.create.create", { name: t("dashboard.Sources") })}
					</DialogTitle>
					<DialogDescription>
						{t("dashboard.create.createDescription", {
							names: t("dashboard.Sources"),
							name: t("dashboard.source"),
						})}
					</DialogDescription>
				</DialogHeader>
				<Form {...createSourceForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={createSourceForm.handleSubmit(onCreateSource)}
					>
						<FormField
							control={createSourceForm.control}
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
							control={createSourceForm.control}
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
							control={createSourceForm.control}
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
							control={createSourceForm.control}
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
								disabled={isCreatingSource || !isValid}
							>
								{isCreatingSource
									? t("dashboard.create.creating")
									: t("dashboard.create.create", {
											name: t("dashboard.source"),
									  })}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
