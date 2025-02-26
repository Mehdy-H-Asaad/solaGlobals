import { t } from "i18next";
import { useGetUsers } from "../hooks/users/useGetUsers";
import { UsersColumns } from "./UsersColumns";
import { UsersDataTable } from "./UsersDataTable";

export const UsersList = () => {
	const { isLoadingUsers, pagination, setPagination, users, total_pages } =
		useGetUsers();
	return (
		<div className="container h-auto sm:min-h-[calc(100vh-96px-40px)]">
			<div className="text-4xl font-bold w-fit mx-auto my-10">
				<span className="text-blue">{t("dashboard.Settings")}</span>
			</div>

			<UsersDataTable
				columns={UsersColumns}
				data={users || []}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={isLoadingUsers}
				pageCount={total_pages || 0}
			/>
		</div>
	);
};
