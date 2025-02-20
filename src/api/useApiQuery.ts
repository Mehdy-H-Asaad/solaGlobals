import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axiosClient } from "./axiosClient";

type UseApiQueryOptions<TResponse> = {
	queryKey: QueryKey;
	requestURL: string;
} & Omit<UseQueryOptions<TResponseData<TResponse>>, "queryFn" | "queryKey">;

type TResponseData<T> = {
	data: T;
	total_rows: number;
	total_pages: number;
	current_page: number;
	limit: number;
};

export const useApiQuery = <TResponse>({
	queryKey,
	requestURL,
	...queryOptions
}: UseApiQueryOptions<TResponse>) => {
	const query = useQuery({
		queryKey: queryKey,
		queryFn: async () => {
			try {
				const { data }: { data: TResponseData<TResponse> } =
					await axiosClient.get(requestURL);

				return data;
			} catch (error: any) {
				throw new Error(error.response.data.detail);
			}
		},
		...queryOptions,
	});

	return query;
};
