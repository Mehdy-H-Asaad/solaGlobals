import loginImg from "../../assets/imgs/welcome-img.jpg";
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
export const AdminLogin = () => {
	const { onLogin, adminLoginForm, isLoggingIn } = useAdminLogin();

	return (
		<div className="flex items-center justify-center h-screen mx-20 lg:mr-20 lg:mx-0">
			<div className="flex justify-between w-full gap-20">
				<img
					src={loginImg}
					className="flex-1 w-full h-screen hidden lg:block object-cover"
					alt="Not found"
					loading="lazy"
				/>

				<div className="flex-1 flex items-center justify-center flex-col">
					<div className="flex flex-col items-center">
						<img src={logo} className="w-40 object-cover" alt="" />
						<h1 className="text-3xl font-bold">
							Welcome <span className="text-blue">Back</span>
						</h1>
					</div>
					<Form {...adminLoginForm}>
						<form
							className=" flex flex-col gap-10 w-full mt-10"
							onSubmit={adminLoginForm.handleSubmit(onLogin)}
						>
							<FormField
								control={adminLoginForm.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Username" />
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
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="password"
												placeholder="Password"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								disabled={isLoggingIn}
								className="w-fit font-bold bg-blue duration-300 hover:bg-black text-white p-2 px-10 rounded-md"
							>
								{isLoggingIn ? "Logging..." : "Login"}
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};
