import { useApiMutation } from "@/api/useApiMutation";
import { TSource, TUpdateSourceDTO } from "../../types";
import { z } from "zod";
import { useSourceSchema } from "@/schema/source.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export const useUpdateSource = (id: number) => {
	const {
		mutate: updateSource,
		isPending: isUpdatingSource,
		queryClient,
	} = useApiMutation<TSource, TUpdateSourceDTO>({
		axiosRequestMethod: "put",
		queryKey: ["sources"],
		requestURL: `/sources/update/${id}`,
		onSuccess: () => {
			toast.success("Source updated successfully");
			queryClient.invalidateQueries({ queryKey: ["sources"], exact: false });
		},
	});

	const updateSourceSchema = useSourceSchema().sourceSchema;

	type TUpdateSourceSchema = z.infer<typeof updateSourceSchema>;

	const updateSourceForm = useForm<TUpdateSourceSchema>({
		resolver: zodResolver(updateSourceSchema),
		defaultValues: {
			address: "",
			city: "",
			state: "",
			zipcode: "",
		},
	});

	const onUpdateSource = (values: TUpdateSourceSchema) => {
		updateSource(values);
	};

	return { updateSourceForm, isUpdatingSource, onUpdateSource };
};
