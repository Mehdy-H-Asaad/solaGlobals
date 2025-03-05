import { useApiMutation } from "@/api/useApiMutation";
import { useAuthStore } from "@/state/auth.state";
import { TAdmin, TAdminLoginDTO } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const useAdminLogin = () => {
	const { setAdmin } = useAuthStore();
	const navigate = useNavigate();

	const {
		data: adminLoginData,
		mutate: adminLogin,
		isPending: isLoggingIn,
	} = useApiMutation<TAdmin, TAdminLoginDTO>({
		axiosRequestMethod: "post",
		queryKey: ["user"],
		requestURL: "/auth/login",
		onSuccess: () => toast.success("Logged In successfully"),
	});

	const adminLoginSchema = z.object({
		username: z.string().min(1, "Username is required"),
		password: z.string().min(1, "Password is required"),
	});

	type TAdminLoginSchema = z.infer<typeof adminLoginSchema>;

	const adminLoginForm = useForm<TAdminLoginSchema>({
		resolver: zodResolver(adminLoginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onLogin = (values: TAdminLoginSchema) => {
		adminLogin(values);
	};

	useEffect(() => {
		if (adminLoginData) {
			setAdmin(adminLoginData);
			navigate("/admin/source", { replace: true });
		}
	}, [adminLoginData]);

	return { isLoggingIn, adminLoginForm, onLogin };
};
