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
import { useCreateAdmin } from "../hooks/users/useCreateAdmin";
import { t } from "i18next";
import { useFormState } from "react-hook-form";

export const CreateAdmin = () => {
	const { createAdminForm, isCreatingAdmin, onCreateAdmin } = useCreateAdmin();

	const { isValid } = useFormState({ control: createAdminForm.control });

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					{t("dashboard.create.create", { name: t("dashboard.newAdmin") })}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						{t("dashboard.create.create", { name: t("dashboard.newAdmin") })}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("dashboard.create.createDescription", {
							name: t("dashboard.user"),
							names: t("dashboard.users"),
						})}
					</DialogDescription>
				</DialogHeader>
				<Form {...createAdminForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={createAdminForm.handleSubmit(onCreateAdmin)}
					>
						<FormField
							control={createAdminForm.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.username")}</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.username")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={createAdminForm.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.password")}</FormLabel>
									<FormControl>
										<Input {...field} placeholder={t("dashboard.password")} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								className="bg-blue hover:bg-cyan-800 text-white rtl:ml-auto"
								type="submit"
								disabled={isCreatingAdmin || !isValid}
							>
								{isCreatingAdmin
									? t("dashboard.create.creating")
									: t("dashboard.create.create", {
											name: t("dashboard.newAdmin"),
									  })}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
