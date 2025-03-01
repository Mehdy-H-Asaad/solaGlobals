import { TCreateInlandTransportDTO, TInlandTransports } from "../../types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "@/api/useApiMutation";
import toast from "react-hot-toast";
import { InlandTransportsSchema } from "@/schema/InlandTransports.schema";

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

	const createInlandTransportSchema = InlandTransportsSchema.pick({
		cost: true,
		source_id: true,
		warehouse_id: true,
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
