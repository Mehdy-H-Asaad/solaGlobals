import { maritimeTransportSchema } from "@/schema/maritimeTransport.schema";
import { TMaritimeTransports, TUpdateMaritimeTransportsDTO } from "../../types";
import { useApiMutation } from "@/api/useApiMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const useUpdateMaritimeTransport = (id: string) => {
	const {
		mutate: updateMaritimeTransport,
		isPending: isUpdatingMaritimeTransport,
		queryClient,
	} = useApiMutation<TMaritimeTransports, TUpdateMaritimeTransportsDTO>({
		axiosRequestMethod: "put",
		queryKey: ["maritimeTransports"],
		requestURL: `/maritime-transport/update/${id}`,
		onSuccess: () => {
			toast.success("Maritime transport updated successfully");
			queryClient.invalidateQueries({
				queryKey: ["maritimeTransports"],
				exact: false,
			});
		},
	});

	const updateMaritimeTransportSchema = maritimeTransportSchema.pick({
		cost: true,
		shipping_line_id: true,
		warehouse_id: true,
		destination_id: true,
	});

	type TUpdateMarriTimeTransportSchema = z.infer<
		typeof updateMaritimeTransportSchema
	>;

	const updateMaritimeTransportForm = useForm<TUpdateMarriTimeTransportSchema>({
		resolver: zodResolver(updateMaritimeTransportSchema),
		defaultValues: {
			cost: undefined,
			shipping_line_id: 0,
			warehouse_id: 0,
			destination_id: 0,
		},
	});

	const onUpdateMaritimeTransport = (
		values: TUpdateMarriTimeTransportSchema
	) => {
		updateMaritimeTransport(values);
	};

	return {
		onUpdateMaritimeTransport,
		isUpdatingMaritimeTransport,
		updateMaritimeTransportForm,
	};
};
