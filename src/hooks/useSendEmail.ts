import { axiosClient } from "@/api/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TSendEmailDTO = {
	name: string;
	subject?: string;
	phone: string;
	email: string;
	message: string;
};

export const useSendEmail = () => {
	const { mutate: sendEmail, isPending: IsSendingEmail } = useMutation({
		mutationKey: ["email"],
		mutationFn: async (values: TSendEmailDTO) => {
			try {
				const { data } = await axiosClient.post(`/email/send-email`, values);

				return data;
			} catch (error: any) {
				throw new Error(error.response.data.error);
			}
		},
	});

	const emailSchema = z.object({
		name: z.string().min(1, "Name is required"),
		phone: z.string().min(1, "Phone is required"),
		email: z.string().min(1, "Email is required").email("Invalid Email"),
		message: z.string().min(1, "Message is required"),
		subject: z.string().optional(),
	});

	type TEmailForm = z.infer<typeof emailSchema>;

	const emailForm = useForm<TEmailForm>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: "",
			message: "",
			name: "",
			phone: "",
			subject: "",
		},
	});

	const onSendEmail = (values: TEmailForm) => {
		sendEmail(values);
	};

	return { IsSendingEmail, onSendEmail, emailForm };
};
