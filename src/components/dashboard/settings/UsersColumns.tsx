import { ColumnDef } from "@tanstack/react-table";
import { TUsers } from "../types";
import { formatDate } from "@/utils/formatDate";
import { useTranslation } from "react-i18next";

export const UsersColumns: ColumnDef<TUsers>[] = [
	{
		accessorKey: "username",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.username");
		},
	},
	{
		accessorKey: "created_at",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.createdAt");
		},
		cell: ({ row }) => {
			const createdAt = new Date(row.original.created_at);

			return formatDate(createdAt);
		},
	},
];
