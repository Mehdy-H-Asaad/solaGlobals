import { useApiMutation } from "@/api/useApiMutation";
import toast from "react-hot-toast";

export const useDeleteInlandTransport = (id: string) => {
	const { mutate: deleteInlandTransPort, queryClient } = useApiMutation<
		string,
		void
	>({
		axiosRequestMethod: "delete",
		queryKey: ["inlandTransports"],
		requestURL: `/inland-transport/delete/${id}`,
		onSuccess: () => {
			toast.success("Inland transport deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["inlandTransports"],
				exact: false,
			});
		},
	});

	return { deleteInlandTransPort };
};
