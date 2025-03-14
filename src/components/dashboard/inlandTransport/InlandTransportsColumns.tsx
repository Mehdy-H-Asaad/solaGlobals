import { ColumnDef } from "@tanstack/react-table";
import { TInlandTransports } from "../types";
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
import { UpdateInlandTransport } from "./UpdateInlandTransport";
import { useDeleteInlandTransport } from "../hooks/inlandTransports/useDeleteInladTransport";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

export const InlandTransportsColumns: ColumnDef<TInlandTransports>[] = [
	{
		accessorKey: "source_state",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.sourceState");
		},
	},
	{
		accessorKey: "source_city",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.sourceCity");
		},
	},
	{
		accessorKey: "source_address",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.sourceAddress");
		},
	},
	{
		accessorKey: "source_zipcode",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.sourceZip");
		},
	},
	{
		accessorKey: "warehouse_state",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.warehouseState");
		},
	},
	{
		accessorKey: "warehouse_zipcode",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.warehouseZip");
		},
	},
	{
		accessorKey: "cost",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.cost");
		},
	},

	{
		id: "actions",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.options");
		},
		cell: ({ row }) => {
			const inlandTransport = row.original;
			const inlandTransportId = row.original.id;

			const { deleteInlandTransPort } = useDeleteInlandTransport(
				inlandTransportId.toString()
			);

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel className="rtl:text-right">
							{t("dashboard.options")}
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<AlertDialog>
							<AlertDialogTrigger className=" mb-2 bg-red-600 duration-200 text-white hover:!bg-red-800 hover:!text-white cursor-pointer w-full text-sm text-center justify-center p-2 flex rounded-sm">
								{t("dashboard.delete.delete", {
									name: t("dashboard.inlandTransport"),
								})}
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
									<AlertDialogAction
										asChild
										onClick={() => deleteInlandTransPort()}
									>
										<Button className="duration-200 hover:bg-black hover:text-white text-white bg-red-600 cursor-pointer flex rounded-sm text-sm">
											{t("dashboard.delete.deleteBtn")}
										</Button>
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
						<UpdateInlandTransport {...inlandTransport} />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
