import { useApiMutation } from "@/api/useApiMutation";
import toast from "react-hot-toast";

export const useDeleteCountry = (id: string) => {
	const { mutate: deleteCountry, queryClient } = useApiMutation<string, void>({
		axiosRequestMethod: "delete",
		queryKey: ["countries"],
		requestURL: `/destinations/delete/${id}`,
		onSuccess: () => {
			toast.success("Destination deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["countries"], exact: false });
		},
	});

	return { deleteCountry };
};
