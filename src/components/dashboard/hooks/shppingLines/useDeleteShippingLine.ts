import { useApiMutation } from "@/api/useApiMutation";
import toast from "react-hot-toast";

export const useDeleteShippingLine = (id: string) => {
	const { mutate: deleteShippingLine, queryClient } = useApiMutation<
		string,
		void
	>({
		axiosRequestMethod: "delete",
		queryKey: ["shippingLines"],
		requestURL: `/shipping-lines/delete/${id}`,
		onSuccess: () => {
			toast.success("Shipping line deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["shippingLines"],
				exact: true,
			});
		},
	});

	return { deleteShippingLine };
};
