import { useApiMutation } from "@/api/useApiMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { TCreateShippingLineDTO, TShippingLine } from "../../types";
import { shippingLineSchema } from "@/schema/shippingLine.schema";

export const useCreateShippingLine = () => {
	const {
		mutate: createShippingLine,
		isPending: isCreatingShippingLine,
		queryClient,
	} = useApiMutation<TShippingLine, TCreateShippingLineDTO>({
		axiosRequestMethod: "post",
		queryKey: ["ShippingLines"],
		requestURL: `/shipping-lines/create`,
		onSuccess: () => {
			toast.success("Shipping line created successfully");
			queryClient.invalidateQueries({
				queryKey: ["shippingLines"],
				exact: false,
			});
		},
	});

	const createShippingLineSchema = shippingLineSchema.extend({
		name: z.string().min(1, "Shipping line is required"),
	});

	type TCreateShippingLineSchema = z.infer<typeof createShippingLineSchema>;

	const createShippingLineForm = useForm<TCreateShippingLineSchema>({
		resolver: zodResolver(createShippingLineSchema),
		defaultValues: {
			name: "",
		},
	});

	const onCreateShippingLine = (values: TCreateShippingLineSchema) => {
		createShippingLine(values);
	};

	return {
		onCreateShippingLine,
		createShippingLineForm,
		isCreatingShippingLine,
	};
};
