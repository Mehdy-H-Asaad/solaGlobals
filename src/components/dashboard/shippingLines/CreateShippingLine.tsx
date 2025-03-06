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
import { useCreateShippingLine } from "../hooks/shppingLines/useCreateShippingLine";
import { t } from "i18next";
import { useFormState } from "react-hook-form";

export const CreateShippingLine = () => {
	const {
		createShippingLineForm,
		isCreatingShippingLine,
		onCreateShippingLine,
	} = useCreateShippingLine();

	const { isValid } = useFormState({ control: createShippingLineForm.control });

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					{t("dashboard.create.create", { name: t("dashboard.shippingLine") })}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						{t("dashboard.create.create", {
							name: t("dashboard.shippingLine"),
						})}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("dashboard.create.createDescription", {
							name: t("dashboard.shippingLine"),
							names: t("dashboard.Shipping lines"),
						})}
					</DialogDescription>
				</DialogHeader>
				<Form {...createShippingLineForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={createShippingLineForm.handleSubmit(onCreateShippingLine)}
					>
						<FormField
							control={createShippingLineForm.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.name")} *</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.name")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								className="bg-blue hover:bg-cyan-800 text-white rtl:ml-auto"
								type="submit"
								disabled={isCreatingShippingLine || !isValid}
							>
								{isCreatingShippingLine
									? t("dashboard.create.creating")
									: t("dashboard.create.create", {
											name: t("dashboard.shippingLine"),
									  })}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
