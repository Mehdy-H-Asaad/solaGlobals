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
import { useUpdateAdditionalSettings } from "../hooks/users/useUpdateAdditionalFee";
import { t } from "i18next";
import { useEffect } from "react";
import { useApiQuery } from "@/api/useApiQuery";
import { TAdditionalSettings } from "../types";
import { formatCurrency } from "@/utils/formatCurrency";
import { useFormState } from "react-hook-form";

export const AdditionalSettings = () => {
	const {
		isUpdatingAdditionalSettings,
		onUpdateAdditionalSettings,
		updateAdditionalSettingsForm,
	} = useUpdateAdditionalSettings();

	const { data: additionalSettings } = useApiQuery<TAdditionalSettings[]>({
		queryKey: ["additionalSettings"],
		requestURL: "/additional-settings/get",
	});

	useEffect(() => {
		if (additionalSettings) {
			updateAdditionalSettingsForm.reset({
				additional_auction_fee:
					additionalSettings.data[0].additional_auction_fee,
				company_fee: additionalSettings.data[0].company_fee,
			});
		}
	}, [additionalSettings]);

	const { isValid } = useFormState({
		control: updateAdditionalSettingsForm.control,
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white flex-col !py-8 gap-4">
					<div>
						{t("dashboard.additionalFee")}:{" "}
						{formatCurrency(
							additionalSettings?.data[0].additional_auction_fee || 0
						)}
					</div>
					<div>
						{t("dashboard.companyFee")}:{" "}
						{formatCurrency(additionalSettings?.data[0].company_fee || 0)}
					</div>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						{t("dashboard.update.update", {
							name: t("dashboard.additionalFee"),
						})}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("dashboard.update.updateDescription", {
							name: t("dashboard.additionalFee"),
							names: t("dashboard.additionalFee"),
						})}
					</DialogDescription>
				</DialogHeader>
				<Form {...updateAdditionalSettingsForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={updateAdditionalSettingsForm.handleSubmit(
							onUpdateAdditionalSettings
						)}
					>
						<FormField
							control={updateAdditionalSettingsForm.control}
							name="additional_auction_fee"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.additionalFee")} *</FormLabel>
									<FormControl>
										<Input
											{...field}
											onChange={e => {
												if (/^\d*$/.test(e.target.value))
													field.onChange(Number(e.target.value));
											}}
											placeholder={t("dashboard.additionalFee")}
											value={field.value === 0 ? "" : field.value}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={updateAdditionalSettingsForm.control}
							name="company_fee"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.companyFee")} *</FormLabel>
									<FormControl>
										<Input
											{...field}
											onChange={e => {
												if (/^\d*$/.test(e.target.value))
													field.onChange(Number(e.target.value));
											}}
											placeholder={t("dashboard.copmanyFee")}
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
								disabled={isUpdatingAdditionalSettings || !isValid}
							>
								{isUpdatingAdditionalSettings
									? t("dashboard.update.updating")
									: t("dashboard.update.update", {
											name: t("dashboard.additionalFee"),
									  })}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
