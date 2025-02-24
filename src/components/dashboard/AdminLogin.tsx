import logo from "../../assets/imgs/logo.png";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAdminLogin } from "@/hooks/useAdminLogin";
import { t } from "i18next";
import { Trans } from "react-i18next";
import { useFormState } from "react-hook-form";

export const AdminLogin = () => {
	const { onLogin, adminLoginForm, isLoggingIn } = useAdminLogin();

	const { isValid } = useFormState({ control: adminLoginForm.control });

	return (
		<div className="flex items-center justify-center h-screen mx-20 lg:mr-20 lg:mx-0">
			<div className=" flex items-center justify-center w-full flex-col">
				<div className="flex flex-col items-center">
					<img src={logo} className="w-40 object-cover" alt="" />

					<h1 className="text-2xl sm:text-3xl font-bold">
						<Trans i18nKey={"dashboard.welcome"}>
							<span className="text-blue"></span>
						</Trans>
					</h1>
				</div>
				<Form {...adminLoginForm}>
					<form
						className="w-full sm:w-96 flex flex-col gap-10 mt-10"
						onSubmit={adminLoginForm.handleSubmit(onLogin)}
					>
						<FormField
							control={adminLoginForm.control}
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
							control={adminLoginForm.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("dashboard.password")}</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
											placeholder={t("dashboard.password")}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							disabled={isLoggingIn || !isValid}
							className="mx-auto w-fit font-bold bg-blue duration-300 hover:bg-black text-white p-2 px-10 rounded-md"
						>
							{isLoggingIn ? t("dashboard.logging") : t("dashboard.login")}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};
