import { useApiMutation } from "@/api/useApiMutation";
import { TCreateMaritimeTransportDTO, TMaritimeTransports } from "../../types";
import toast from "react-hot-toast";
import { useMaritimeTransportSchema } from "@/schema/maritimeTransport.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useCreateMaritimeTransport = () => {
	const {
		mutate: createMaritimeTransport,
		isPending: isCreatingMaritimeTransport,
		queryClient,
	} = useApiMutation<TMaritimeTransports, TCreateMaritimeTransportDTO>({
		axiosRequestMethod: "post",
		queryKey: ["maritimeTransports"],
		requestURL: `/maritime-transport/create`,
		onSuccess: () => {
			toast.success("Maritime transport created successfully");
			queryClient.invalidateQueries({
				queryKey: ["maritimeTransports"],
				exact: false,
			});
		},
	});

	const createMaritimeTransportSchema = useMaritimeTransportSchema()
		.maritimeTransportSchema.pick({
			cost: true,
			shipping_line_id: true,
			warehouse_id: true,
		})
		.extend({
			warehouse_id: z.number().min(1, "Warehouse is required"),
			shipping_line_id: z.number().min(1, "Shipping line is required"),
			cost: z.number().min(1, "Cost is required"),
		});

	type TCreateMaritimeTransportSchema = z.infer<
		typeof createMaritimeTransportSchema
	>;

	const createMaritimeTransportForm = useForm<TCreateMaritimeTransportSchema>({
		resolver: zodResolver(createMaritimeTransportSchema),
		defaultValues: {
			cost: 0,
			shipping_line_id: 0,
			warehouse_id: 0,
		},
	});

	const onCreateMaritimeTransport = (
		values: TCreateMaritimeTransportSchema
	) => {
		createMaritimeTransport(values);
	};

	return {
		onCreateMaritimeTransport,
		createMaritimeTransportForm,
		isCreatingMaritimeTransport,
	};
};
