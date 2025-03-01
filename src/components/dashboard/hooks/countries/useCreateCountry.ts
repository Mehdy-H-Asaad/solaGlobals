import { useApiMutation } from "@/api/useApiMutation";
import { countrySchema } from "@/schema/country.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { TCountry, TCreateCountryDTO } from "../../types";

export const useCreateCountry = () => {
	const {
		mutate: createCountry,
		isPending: isCreatingCountry,
		queryClient,
	} = useApiMutation<TCountry, TCreateCountryDTO>({
		axiosRequestMethod: "post",
		queryKey: ["countries"],
		requestURL: `/destinations/create`,
		onSuccess: () => {
			toast.success("Destination created successfully");
			queryClient.invalidateQueries({
				queryKey: ["countries"],
				exact: false,
			});
		},
	});

	const createCountrySchema = countrySchema;

	type TCreateCountrySchema = z.infer<typeof createCountrySchema>;

	const createCountryForm = useForm<TCreateCountrySchema>({
		resolver: zodResolver(createCountrySchema),
		defaultValues: {
			country: "",
			port: "",
		},
	});

	const onCreateCountry = (values: TCreateCountrySchema) => {
		createCountry(values);
	};

	return { onCreateCountry, createCountryForm, isCreatingCountry };
};
