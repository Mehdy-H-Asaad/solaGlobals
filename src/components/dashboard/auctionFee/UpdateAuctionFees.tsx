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
import { useEffect } from "react";
import { TAuctionFee } from "../types";
import { useUpdateAuctionFees } from "../hooks/auctionFee/useUpdateAuctionFees";
import { t } from "i18next";
import { useFormState } from "react-hook-form";

export const UpdateAuctionFee = (auctionFee: TAuctionFee) => {
	const { isUpdatingAuctionFee, onUpdateAuctionFee, updateAuctionFeeForm } =
		useUpdateAuctionFees(auctionFee.id);

	useEffect(() => {
		if (auctionFee) {
			updateAuctionFeeForm.reset(auctionFee);
		}
	}, []);

	const { isValid } = useFormState({ control: updateAuctionFeeForm.control });

	console.log(updateAuctionFeeForm.watch("fee"));

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					{t("dashboard.update.update", { name: t("dashboard.auctionFee") })}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						{t("dashboard.update.update", { name: t("dashboard.auctionFee") })}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("dashboard.update.updateDescription", {
							name: t("dashboard.auctionFee"),
							names: t("dashboard.auctionFee"),
						})}
					</DialogDescription>
				</DialogHeader>
				<Form {...updateAuctionFeeForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={updateAuctionFeeForm.handleSubmit(onUpdateAuctionFee)}
					>
						<FormField
							control={updateAuctionFeeForm.control}
							name="fee"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.auctionFee")} *</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={t("dashboard.auctionFee")}
											onChange={e => {
												const value = e.target.value;
												if (value === "") {
													field.onChange(null);
												} else if (/^\d+$/.test(value)) {
													field.onChange(Number(value));
												}
											}}
											value={field.value === null ? "" : field.value}
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
								disabled={isUpdatingAuctionFee || !isValid}
							>
								{isUpdatingAuctionFee
									? t("dashboard.update.updating")
									: t("dashboard.update.update", {
											name: t("dashboard.auctionFee"),
									  })}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
