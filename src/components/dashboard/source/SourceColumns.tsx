import { ColumnDef } from "@tanstack/react-table";
import { TSource } from "../types";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UpdateSource } from "./UpdateSource";
import { useDeleteSource } from "../hooks/source/useDeleteSource";
import { useTranslation } from "react-i18next";

export const SourceColumns: ColumnDef<TSource>[] = [
	{
		accessorKey: "state",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.state");
		},
	},
	{
		accessorKey: "city",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.city");
		},
	},
	{
		accessorKey: "address",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.address");
		},
	},
	{
		accessorKey: "zipcode",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.zip");
		},
	},
	{
		id: "actions",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.options");
		},
		cell: ({ row }) => {
			const sourceId = row.original.id;
			const source = row.original;

			const { deleteSource } = useDeleteSource({ sourceId: sourceId });
			const { t } = useTranslation();
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="rtl:ml-auto" align="end">
						<DropdownMenuLabel className="rtl:text-right">
							{t("dashboard.options")}
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<AlertDialog>
							<AlertDialogTrigger className="mb-2 bg-red-600 duration-200 text-white hover:!bg-red-800 hover:!text-white cursor-pointer w-full text-sm text-center justify-center p-2 flex rounded-sm">
								{t("dashboard.delete.delete", { name: t("dashboard.source") })}
							</AlertDialogTrigger>
							<AlertDialogContent className="bg-white text-black">
								<AlertDialogHeader>
									<AlertDialogTitle className="rtl:text-right">
										{t("dashboard.delete.deleteTitle")}
									</AlertDialogTitle>
									<AlertDialogDescription className="rtl:text-right">
										{t("dashboard.delete.deleteDescription")}
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter className="rtl:justify-start rtl:gap-1">
									<AlertDialogCancel className="bg-black text-white duration-200">
										{t("dashboard.delete.deleteCancel")}
									</AlertDialogCancel>
									<AlertDialogAction asChild onClick={() => deleteSource()}>
										<Button className=" duration-200 hover:bg-black hover:text-white text-white bg-red-600">
											{t("dashboard.delete.deleteBtn")}
										</Button>
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
						<UpdateSource {...source} />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
