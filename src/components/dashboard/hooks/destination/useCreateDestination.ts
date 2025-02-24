import { TCreateDestinationDTO, TDestination } from "../../types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDestinationSchema } from "@/schema/destination.schema";
import { useApiMutation } from "@/api/useApiMutation";
import toast from "react-hot-toast";

export const useCreateDestination = () => {
	const {
		mutate: createDestination,
		isPending: isCreatingDestination,
		queryClient,
	} = useApiMutation<TDestination, TCreateDestinationDTO>({
		axiosRequestMethod: "post",
		requestURL: "/warehouses/create",
		onSuccess: () => {
			toast.success("Warehouse created successfully");
			queryClient.invalidateQueries({ queryKey: ["warehouses"], exact: false });
		},
	});

	const createDestinationSchema = useDestinationSchema().destinationSchema;

	type TCreateDestinationSchema = z.infer<typeof createDestinationSchema>;

	const createDestinationForm = useForm<TCreateDestinationSchema>({
		resolver: zodResolver(createDestinationSchema),
		defaultValues: {
			address: "",
			city: "",
			zipcode: "",
			state: "",
		},
	});

	const onCreateDestination = (values: TCreateDestinationDTO) => {
		createDestination(values);
	};

	return { onCreateDestination, createDestinationForm, isCreatingDestination };
};
