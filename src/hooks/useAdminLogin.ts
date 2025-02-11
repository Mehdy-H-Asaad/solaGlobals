import { axiosClient } from "@/api/axiosClient";
import { useAuthStore } from "@/state/auth.state";
import { TAdmin, TAdminLoginDTO } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const useAdminLogin = () => {
	const { setAdmin } = useAuthStore();
	const navigate = useNavigate();
	const {
		mutate: adminLogin,
		isPending: isLoggingIn,
		data: adminLoginData,
	} = useMutation({
		mutationKey: ["login"],
		mutationFn: async (values: TAdminLoginDTO) => {
			try {
				const { data }: { data: TAdmin } = await axiosClient.post(
					"/admin/login",
					values
				);

				return data;
			} catch (error: any) {
				throw new Error(error.response.data.error);
			}
		},
	});

	const adminLoginSchema = z.object({
		email: z.string().min(1, "Email is required"),
		password: z.string().min(1, "Password is required"),
	});

	type TAdminLoginSchema = z.infer<typeof adminLoginSchema>;

	const adminLoginForm = useForm<TAdminLoginSchema>({
		resolver: zodResolver(adminLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onLogin = (values: TAdminLoginSchema) => {
		adminLogin(values);
	};

	useEffect(() => {
		if (adminLoginData) {
			setAdmin(adminLoginData);
			navigate("", { replace: true });
		}
	}, [adminLoginData]);

	return { isLoggingIn, adminLoginForm, onLogin };
};
