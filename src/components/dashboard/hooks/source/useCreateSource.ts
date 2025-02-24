import { TCreateSourceDTO, TSource } from "../../types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "@/api/useApiMutation";
import toast from "react-hot-toast";
import { useSourceSchema } from "@/schema/source.schema";

export const useCreateSource = () => {
	const {
		mutate,
		isPending: isCreatingSource,
		queryClient,
	} = useApiMutation<TSource, TCreateSourceDTO>({
		axiosRequestMethod: "post",
		queryKey: ["sources"],
		requestURL: `/sources/create`,
		onSuccess: () => {
			toast.success("Source created successfully");
			queryClient.invalidateQueries({ queryKey: ["sources"], exact: false });
		},
	});

	const createSourceSchema = useSourceSchema().sourceSchema;

	type TCreateSourceSchema = z.infer<typeof createSourceSchema>;

	const createSourceForm = useForm<TCreateSourceSchema>({
		resolver: zodResolver(createSourceSchema),
		defaultValues: {
			address: "",
			city: "",
			zipcode: "",
			state: "",
		},
	});

	const onCreateSource = (values: TCreateSourceDTO) => {
		mutate(values);
	};

	return {
		createSourceForm,
		onCreateSource,
		isCreatingSource,
	};
};
