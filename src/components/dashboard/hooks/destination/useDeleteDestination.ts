import { useApiMutation } from "@/api/useApiMutation";
import toast from "react-hot-toast";

export const useDeleteDestination = (destinationId: string) => {
	const { mutate: deleteDestination, queryClient } = useApiMutation<
		string,
		void
	>({
		axiosRequestMethod: "delete",
		queryKey: ["warehouses"],
		requestURL: `/warehouses/delete/${destinationId}`,
		onSuccess: () => {
			toast.success("Warehouse deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["warehouses"], exact: false });
		},
	});

	return { deleteDestination };
};
