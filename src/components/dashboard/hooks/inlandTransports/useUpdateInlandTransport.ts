import { useApiMutation } from "@/api/useApiMutation";
import { InlandTransportsSchema } from "@/schema/InlandTransports.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { TInlandTransports, TUpdateInlandTransportsDTO } from "../../types";

export const useUpdateInlandTransport = (id: string) => {
	const {
		mutate: updateInlandTransport,
		isPending: isUpdatingInlandTransport,
		queryClient,
	} = useApiMutation<TInlandTransports, TUpdateInlandTransportsDTO>({
		axiosRequestMethod: "put",
		queryKey: ["inlandTransports"],
		requestURL: `/inland-transport/update/${id}`,
		onSuccess: () => {
			toast.success("Inland transport updated successfully");
			queryClient.invalidateQueries({
				queryKey: ["inlandTransports"],
				exact: false,
			});
		},
	});

	const updateInlandTransportSchema = InlandTransportsSchema.pick({
		cost: true,
		source_id: true,
		warehouse_id: true,
	});

	type TUpdateInlandTransportSchema = z.infer<
		typeof updateInlandTransportSchema
	>;

	const updateInlandTransportForm = useForm<TUpdateInlandTransportSchema>({
		resolver: zodResolver(updateInlandTransportSchema),
		defaultValues: {
			cost: undefined,
			source_id: 0,
			warehouse_id: 0,
		},
	});

	const onUpdateInlandTransport = (values: TUpdateInlandTransportSchema) => {
		updateInlandTransport(values);
	};

	return {
		onUpdateInlandTransport,
		isUpdatingInlandTransport,
		updateInlandTransportForm,
	};
};
