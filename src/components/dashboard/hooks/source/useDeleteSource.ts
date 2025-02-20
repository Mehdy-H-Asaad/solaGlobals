import { useApiMutation } from "@/api/useApiMutation";
import toast from "react-hot-toast";

export const useDeleteSource = ({ sourceId }: { sourceId: string }) => {
	const { mutate: deleteSource, queryClient } = useApiMutation<string, void>({
		queryKey: ["sources"],
		axiosRequestMethod: "delete",
		requestURL: `/sources/delete/${sourceId}`,
		onSuccess: () => {
			toast.success("source deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["sources"], exact: false });
		},
	});

	return { deleteSource };
};
