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

export const ShippingLineColumns: ColumnDef<TShippingLine>[] = [
	{
		accessorKey: "name",
		header: "Shipping line",
	},

	{
		id: "actions",
		header: "Options",
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
						<DropdownMenuLabel>Options</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<AlertDialog>
							<AlertDialogTrigger className="mb-2 bg-red-600 duration-200 text-white hover:!bg-red-800 hover:!text-white cursor-pointer px-2 py-1 flex rounded-sm">
								Delete shipping line
							</AlertDialogTrigger>
							<AlertDialogContent className="bg-white text-black">
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										your account and remove your data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel className="bg-black text-white duration-200">
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										asChild
										onClick={() => deleteShippingLine()}
									>
										<Button className="!bg-golden duration-200 hover:bg-black hover:text-white text-white bg-red-600">
											Delete
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
