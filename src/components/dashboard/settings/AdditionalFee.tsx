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
import { useUpdateAdditionalFee } from "../hooks/users/useUpdateAdditionalFee";
import { t } from "i18next";
// import { useEffect } from "react";
// import { useApiQuery } from "@/api/useApiQuery";
// import { TAdditionalFee } from "../types";

export const AdditionalFee = () => {
	const {
		isUpdatingAdditionalFee,
		onUpdateAdditionalFee,
		updateAdditionalFeeForm,
	} = useUpdateAdditionalFee();

	// const { data: additionalFee } = useApiQuery<TAdditionalFee>({
	// 	queryKey: ["additionalFee"],
	// 	requestURL: "/additional-settings/get",
	// });

	// useEffect(() => {
	// 	if (additionalFee) {
	// 		updateAdditionalFeeForm.reset(additionalFee.data.additional_fee);
	// 	}
	// }, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					{t("dashboard.additionalFee")}
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
				<Form {...updateAdditionalFeeForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={updateAdditionalFeeForm.handleSubmit(
							onUpdateAdditionalFee
						)}
					>
						<FormField
							control={updateAdditionalFeeForm.control}
							name="additional_fee"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.additionalFee")}</FormLabel>
									<FormControl>
										<Input
											{...field}
											onChange={e => {
												if (/^\d*$/.test(e.target.value))
													field.onChange(Number(e.target.value));
											}}
											placeholder={t("dashboard.additionalFee")}
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
								disabled={isUpdatingAdditionalFee}
							>
								{isUpdatingAdditionalFee
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
