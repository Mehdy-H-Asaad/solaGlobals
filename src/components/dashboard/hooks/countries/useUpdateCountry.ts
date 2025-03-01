import { countrySchema } from "@/schema/country.schema";
import { TCountry, TUpdateCountry } from "../../types";
import toast from "react-hot-toast";
import { useApiMutation } from "@/api/useApiMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useUpdateCountry = (id: string) => {
	const {
		mutate: updateCountry,
		isPending: isUpdatingCountry,
		queryClient,
	} = useApiMutation<TCountry, TUpdateCountry>({
		axiosRequestMethod: "put",
		queryKey: ["countries"],
		requestURL: `/destinations/update/${id}`,
		onSuccess: () => {
			toast.success("Destination updated successfully");
			queryClient.invalidateQueries({
				queryKey: ["countries"],
				exact: false,
			});
		},
	});

	const updateCountrySchema = countrySchema;

	type TUpdateCountrySchema = z.infer<typeof updateCountrySchema>;

	const updateCountryForm = useForm<TUpdateCountrySchema>({
		resolver: zodResolver(updateCountrySchema),
		defaultValues: {
			country: "",
			port: "",
		},
	});

	const onUpdateCountry = (values: TUpdateCountrySchema) => {
		updateCountry(values);
	};

	return { updateCountryForm, onUpdateCountry, isUpdatingCountry };
};
