import {
	QueryKey,
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { axiosClient } from "./axiosClient";
import toast from "react-hot-toast";

type TUseApiMutationOptions<TResponse, TParams> = {
	queryKey?: QueryKey;
	requestURL: string;
	axiosRequestMethod: "post" | "put" | "delete";
} & Omit<
	UseMutationOptions<TResponse, unknown, TParams>,
	"mutationFn" | "mutationKey"
>;

export const useApiMutation = <TResponse, TParams = void>({
	queryKey,
	requestURL,
	axiosRequestMethod,
	...mutationOptions
}: TUseApiMutationOptions<TResponse, TParams>) => {
	const queryClient = useQueryClient();
	const mutation = useMutation<TResponse, unknown, TParams>({
		// mutationKey: queryKey,
		mutationFn: async (values: TParams) => {
			try {
				const { data }: { data: TResponse } = await axiosClient[
					axiosRequestMethod
				](requestURL, values ? values : undefined);
				return data;
			} catch (error: any) {
				throw new Error(error.response?.data?.detail || "An error occurred");
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKey });
		},
		onError: (error: any) => toast.error(error.message),
		...mutationOptions,
	});

	return { ...mutation, queryClient };
};
