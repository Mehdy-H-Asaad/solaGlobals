import { TAdditionalSettings, TUpdateAdditionalSettingsDTO } from "../../types";
import { useApiMutation } from "@/api/useApiMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const useUpdateAdditionalSettings = () => {
	const {
		mutate,
		isPending: isUpdatingAdditionalSettings,
		queryClient,
	} = useApiMutation<TAdditionalSettings, TUpdateAdditionalSettingsDTO>({
		axiosRequestMethod: "put",
		queryKey: ["additionalSettings"],
		requestURL: `/additional-settings/update`,
		onSuccess: () => {
			toast.success("Additional settings updated successfully");
			queryClient.invalidateQueries({
				queryKey: ["additionalSettings"],
				exact: false,
			});
		},
	});

	const updateAdditionalSettingsSchema = z.object({
		additional_copart_fee: z.number().min(0, "Additional settings is required"),
		additional_iaai_fee: z.number().min(0, "Additional settings is required"),
		company_fee: z.number().min(0, "Copmany fee is required"),
	});
	type TUpdateAdditionalSettingsSchema = z.infer<
		typeof updateAdditionalSettingsSchema
	>;

	const updateAdditionalSettingsForm = useForm<TUpdateAdditionalSettingsSchema>(
		{
			resolver: zodResolver(updateAdditionalSettingsSchema),
			defaultValues: {
				additional_copart_fee: undefined,
				company_fee: undefined,
				additional_iaai_fee: undefined,
			},
		}
	);

	const onUpdateAdditionalSettings = (values: TUpdateAdditionalSettingsDTO) => {
		mutate(values);
	};

	return {
		onUpdateAdditionalSettings,
		isUpdatingAdditionalSettings,
		updateAdditionalSettingsForm,
	};
};
