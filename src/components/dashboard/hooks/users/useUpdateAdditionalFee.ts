import { TAdditionalFee, TUpdateAdditionalFeeDTO } from "../../types";
import { useApiMutation } from "@/api/useApiMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const useUpdateAdditionalFee = () => {
	const {
		mutate: updateAdditionalFee,
		isPending: isUpdatingAdditionalFee,
		queryClient,
	} = useApiMutation<TAdditionalFee, TUpdateAdditionalFeeDTO>({
		axiosRequestMethod: "put",
		queryKey: ["additionalFee"],
		requestURL: `/additional-settings/update`,
		onSuccess: () => {
			toast.success("Additional fee updated successfully");
			queryClient.invalidateQueries({
				queryKey: ["additionalFee"],
				exact: false,
			});
		},
	});

	const updateAdditionalFeeSchema = z.object({
		additional_fee: z.number().min(1, "Additional fee is required"),
	});
	type TUpdateAdditionalFeeSchema = z.infer<typeof updateAdditionalFeeSchema>;

	const updateAdditionalFeeForm = useForm<TUpdateAdditionalFeeSchema>({
		resolver: zodResolver(updateAdditionalFeeSchema),
		defaultValues: {
			additional_fee: 0,
		},
	});

	const onUpdateAdditionalFee = (values: TUpdateAdditionalFeeSchema) => {
		updateAdditionalFee(values);
	};

	return {
		onUpdateAdditionalFee,
		isUpdatingAdditionalFee,
		updateAdditionalFeeForm,
	};
};
