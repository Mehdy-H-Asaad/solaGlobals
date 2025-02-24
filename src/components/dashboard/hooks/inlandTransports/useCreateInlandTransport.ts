import { TCreateInlandTransportDTO, TInlandTransports } from "../../types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "@/api/useApiMutation";
import toast from "react-hot-toast";
import { useInlandTransports } from "@/schema/InlandTransports.schema";

export const useCreateInlandTransport = () => {
	const {
		mutate: createInlandTransport,
		isPending: isCreatingInlandTransport,
		queryClient,
	} = useApiMutation<TInlandTransports, TCreateInlandTransportDTO>({
		axiosRequestMethod: "post",
		queryKey: ["inlandTransports"],
		requestURL: `/inland-transport/create`,
		onSuccess: () => {
			toast.success("Inland transport created successfully");
			queryClient.invalidateQueries({
				queryKey: ["inlandTransports"],
				exact: false,
			});
		},
	});

	const createInlandTransportSchema = useInlandTransports()
		.InlandTransportsSchema.pick({
			cost: true,
			source_id: true,
			warehouse_id: true,
		})
		.extend({
			source_id: z.number().min(1, "Source is required"),
			warehouse_id: z.number().min(1, "Warehouse is required"),
			cost: z.number().min(1, "Cost is required"),
		});

	type TCreateInlandTransportSchema = z.infer<
		typeof createInlandTransportSchema
	>;

	const createInlandTransportForm = useForm<TCreateInlandTransportSchema>({
		resolver: zodResolver(createInlandTransportSchema),
		defaultValues: {
			cost: 0,
			source_id: 0,
			warehouse_id: 0,
		},
	});

	const onCreateInlandTransport = (values: TCreateInlandTransportSchema) => {
		createInlandTransport(values);
	};

	return {
		onCreateInlandTransport,
		createInlandTransportForm,
		isCreatingInlandTransport,
	};
};
