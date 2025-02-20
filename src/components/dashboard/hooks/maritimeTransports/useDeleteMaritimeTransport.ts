import { useApiMutation } from "@/api/useApiMutation";
import toast from "react-hot-toast";

export const useDeleteMaritimeTransport = (id: string) => {
	const { mutate: deleteMaritimeTransport, queryClient } = useApiMutation<
		string,
		void
	>({
		axiosRequestMethod: "delete",
		queryKey: ["maritimeTransports"],
		requestURL: `/maritime-transport/delete/${id}`,
		onSuccess: () => {
			toast.success("Maritime transport deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["maritimeTransports"],
				exact: true,
			});
		},
	});

	return { deleteMaritimeTransport };
};
