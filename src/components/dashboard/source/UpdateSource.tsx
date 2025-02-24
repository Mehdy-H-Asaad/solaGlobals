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
import { useUpdateSource } from "../hooks/source/useUpdateSource";
import { TSource } from "../types";
import { useEffect } from "react";
import { t } from "i18next";
import { useFormState } from "react-hook-form";

export const UpdateSource = (source: TSource) => {
	const { updateSourceForm, isUpdatingSource, onUpdateSource } =
		useUpdateSource(Number(source.id));

	useEffect(() => {
		if (source) {
			updateSourceForm.reset(source);
		}
	}, []);

	const { isValid } = useFormState({ control: updateSourceForm.control });

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white w-full">
					{t("dashboard.update.update", { name: t("dashboard.source") })}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{t("dashboard.update.update", { name: t("dashboard.source") })}
					</DialogTitle>
					<DialogDescription>
						{t("dashboard.update.updateDescription", {
							names: t("dashboard.Sources"),
							name: t("dashboard.source"),
						})}
					</DialogDescription>
				</DialogHeader>
				<Form {...updateSourceForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={updateSourceForm.handleSubmit(onUpdateSource)}
					>
						<FormField
							control={updateSourceForm.control}
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
							control={updateSourceForm.control}
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
							control={updateSourceForm.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.address")}</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.addess")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={updateSourceForm.control}
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
								className="bg-blue rtl:ml-auto hover:bg-cyan-800 text-white"
								type="submit"
								disabled={isUpdatingSource || !isValid}
							>
								{isUpdatingSource
									? t("dashboard.update.updating")
									: t("dashboard.update.update", {
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
