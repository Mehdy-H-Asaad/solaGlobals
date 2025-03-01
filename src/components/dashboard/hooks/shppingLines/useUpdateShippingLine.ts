import { useApiMutation } from "@/api/useApiMutation";
import { shippingLineSchema } from "@/schema/shippingLine.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { TShippingLine, TUpdateShippingLineDTO } from "../../types";

export const useUpdateShippingLine = (id: string) => {
	const {
		mutate: updateShippingLine,
		isPending: isUpdatingShippingLine,
		queryClient,
	} = useApiMutation<TShippingLine, TUpdateShippingLineDTO>({
		axiosRequestMethod: "put",
		queryKey: ["ShippingLines"],
		requestURL: `/shipping-lines/create/${id}`,
		onSuccess: () => {
			toast.success("Shipping line updated successfully");
			queryClient.invalidateQueries({
				queryKey: ["shippingLines"],
				exact: false,
			});
		},
	});

	const updateShippingLineSchema = shippingLineSchema.extend({
		name: z.string().min(1, "Shipping line is required"),
	});

	type TUpdateShippingLineSchema = z.infer<typeof updateShippingLineSchema>;

	const updateShippingLineForm = useForm<TUpdateShippingLineSchema>({
		resolver: zodResolver(updateShippingLineSchema),
		defaultValues: {
			name: "",
		},
	});

	const onUpdateShippingLine = (values: TUpdateShippingLineSchema) => {
		updateShippingLine(values);
	};

	return {
		updateShippingLineForm,
		onUpdateShippingLine,
		isUpdatingShippingLine,
	};
};
