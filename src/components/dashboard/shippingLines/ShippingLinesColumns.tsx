import { ColumnDef } from "@tanstack/react-table";
import { TShippingLine } from "../types";
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

import { useDeleteShippingLine } from "../hooks/shppingLines/useDeleteShippingLine";
import { UpdateShippingLine } from "./UpdateShippingLines";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

export const ShippingLineColumns: ColumnDef<TShippingLine>[] = [
	{
		accessorKey: "name",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.shippingLine");
		},
	},

	{
		id: "actions",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.options");
		},
		cell: ({ row }) => {
			const shippingLineId = row.original.id;
			const shippingLine = row.original;

			const { deleteShippingLine } = useDeleteShippingLine(
				shippingLineId.toString()
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
							<AlertDialogTrigger className="mb-2 bg-red-600 duration-200 text-white hover:!bg-red-800 text-sm hover:!text-white cursor-pointer w-full text-center justify-center p-2 flex rounded-sm">
								{t("dashboard.delete.delete", {
									name: t("dashboard.shippingLine"),
								})}
							</AlertDialogTrigger>
							<AlertDialogContent className="bg-white text-black">
								<AlertDialogHeader>
									<AlertDialogTitle className="rtl:text-right">
										{t("dashboard.delete.delete", {
											name: t("dashboard.shippingLine"),
										})}
									</AlertDialogTitle>
									<AlertDialogDescription className="rtl:text-right">
										{t("dashboard.delete.deleteDescription", {
											name: t("dashboard.shippingLine"),
											names: t("dashboard.shipping lines"),
										})}
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter className="rtl:justify-start rtl:gap-1">
									<AlertDialogCancel className="bg-black text-white duration-200">
										{t("dashboard.delete.deleteCancel")}
									</AlertDialogCancel>
									<AlertDialogAction
										asChild
										onClick={() => deleteShippingLine()}
									>
										<Button className="!bg-golden duration-200 hover:bg-black hover:text-white text-white bg-red-600">
											{t("dashboard.delete.deleteBtn")}
										</Button>
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>

						<UpdateShippingLine {...shippingLine} />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
