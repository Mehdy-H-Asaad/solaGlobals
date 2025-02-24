import { useApiMutation } from "@/api/useApiMutation";
import {
	TAuctionFee,
	TUpdateAuctionFeeDTO,
} from "@/components/dashboard/types";
import { useAuctionFeeSchema } from "@/schema/auctionFee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const useUpdateAuctionFees = (id: number) => {
	const {
		mutate: updateAuctionFee,
		isPending: isUpdatingAuctionFee,
		queryClient,
	} = useApiMutation<TAuctionFee, TUpdateAuctionFeeDTO>({
		axiosRequestMethod: "put",
		queryKey: ["auctionFees"],
		requestURL: `/auction-fees/update/${id}`,
		onSuccess: () => {
			toast.success("Auction fee updated successfully");
			queryClient.invalidateQueries({
				queryKey: ["auctionFees"],
				exact: false,
			});
		},
	});

	const updateAuctionFeeSchema = useAuctionFeeSchema().auctionFeeSchema.pick({
		fee: true,
	});

	type TUpdateAuctionFeeSchema = z.infer<typeof updateAuctionFeeSchema>;

	const updateAuctionFeeForm = useForm<TUpdateAuctionFeeSchema>({
		resolver: zodResolver(updateAuctionFeeSchema),
		defaultValues: {
			fee: 0,
		},
	});

	const onUpdateAuctionFee = (values: TUpdateAuctionFeeSchema) => {
		updateAuctionFee(values);
	};

	return {
		onUpdateAuctionFee,
		updateAuctionFeeForm,
		isUpdatingAuctionFee,
	};
};
