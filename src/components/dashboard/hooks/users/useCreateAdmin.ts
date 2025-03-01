import { adminSchema } from "@/schema/admin.schema";
import { TCreateAdminDTO, TUsers } from "../../types";
import { useApiMutation } from "@/api/useApiMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const useCreateAdmin = () => {
	const {
		mutate: createAdmin,
		isPending: isCreatingAdmin,
		queryClient,
	} = useApiMutation<TUsers, TCreateAdminDTO>({
		axiosRequestMethod: "post",
		queryKey: ["admin"],
		requestURL: `/auth/signup`,
		onSuccess: () => {
			toast.success("New admin created successfully");
			queryClient.invalidateQueries({
				queryKey: ["admin"],
				exact: false,
			});
		},
	});

	const createAdminSchema = adminSchema;
	type TCreateAdminSchema = z.infer<typeof createAdminSchema>;

	const createAdminForm = useForm<TCreateAdminSchema>({
		resolver: zodResolver(createAdminSchema),
		defaultValues: {
			password: "",
			username: "",
		},
	});

	const onCreateAdmin = (values: TCreateAdminSchema) => {
		createAdmin(values);
	};

	return {
		onCreateAdmin,
		createAdminForm,
		isCreatingAdmin,
	};
};
