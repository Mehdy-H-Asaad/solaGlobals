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
import { TShippingLine } from "../types";
import { useEffect } from "react";
import { useUpdateShippingLine } from "../hooks/shppingLines/useUpdateShippingLine";
import { t } from "i18next";

export const UpdateShippingLine = (shippingLine: TShippingLine) => {
	const {
		isUpdatingShippingLine,
		onUpdateShippingLine,
		updateShippingLineForm,
	} = useUpdateShippingLine(shippingLine.id.toString());

	useEffect(() => {
		if (shippingLine) {
			updateShippingLineForm.reset(shippingLine);
		}
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					{t("dashboard.update.update", { name: t("dashboard.shippingLine") })}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						{t("dashboard.update.update", {
							name: t("dashboard.shippingLine"),
						})}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("dashboard.update.updateDescription", {
							name: t("dashboard.shippingLine"),
							names: t("dashboard.Shipping lines"),
						})}
					</DialogDescription>
				</DialogHeader>
				<Form {...updateShippingLineForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={updateShippingLineForm.handleSubmit(onUpdateShippingLine)}
					>
						<FormField
							control={updateShippingLineForm.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.name")}</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.name")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								className="bg-blue hover:bg-cyan-800 text-white"
								type="submit"
								disabled={isUpdatingShippingLine}
							>
								{isUpdatingShippingLine
									? t("dashboard.update.updating")
									: t("dashboard.update.update", {
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
