import { useApiMutation } from "@/api/useApiMutation";
import { TDestination, TUpdateDestinationDTO } from "../../types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useDestinationSchema } from "@/schema/destination.schema";

export const useUpdateDestination = (id: number) => {
	const {
		mutate: updateDestination,
		isPending: isUpdatingDestination,
		queryClient,
	} = useApiMutation<TDestination, TUpdateDestinationDTO>({
		axiosRequestMethod: "put",
		queryKey: ["warehouses"],
		requestURL: `/warehouses/update/${id}`,
		onSuccess: () => {
			toast.success("Warehouse updated successfully");
			queryClient.invalidateQueries({ queryKey: ["warehouses"], exact: false });
		},
	});

	const updateDestinationSchema = useDestinationSchema().destinationSchema;

	type TUpdateDestinationSchema = z.infer<typeof updateDestinationSchema>;

	const updateDestinationForm = useForm<TUpdateDestinationSchema>({
		resolver: zodResolver(updateDestinationSchema),
		defaultValues: {
			address: "",
			city: "",
			state: "",
			zipcode: "",
		},
	});

	const onUpdateDestination = (values: TUpdateDestinationSchema) => {
		updateDestination(values);
	};

	return { isUpdatingDestination, onUpdateDestination, updateDestinationForm };
};
