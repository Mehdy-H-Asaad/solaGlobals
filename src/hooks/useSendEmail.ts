import { axiosClient } from "@/api/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSendEmailDTO } from "@/types";
import { useTranslation } from "react-i18next";

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

	const { t } = useTranslation();
	const emailSchema = z.object({
		name: z.string().min(1, t("validation.name")),
		phone: z.string().min(1, t("validation.phone")),
		email: z
			.string()
			.min(1, t("validation.email"))
			.email(t("validation.emailNotValid")),
		message: z.string().min(1, t("validation.message")),
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
