import { ColumnDef } from "@tanstack/react-table";
import { TMaritimeTransports } from "../types";
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
import { useDeleteMaritimeTransport } from "../hooks/maritimeTransports/useDeleteMaritimeTransport";
import { UpdateMaritimeTransport } from "./UpdateMaritimeTransport";

export const MaritimeTransportsColumns: ColumnDef<TMaritimeTransports>[] = [
	{
		accessorKey: "warehouse_state",
		header: "Warehouse State",
	},
	{
		accessorKey: "warehouse_zipcode",
		header: "Warehouse zipcode",
	},
	{
		accessorKey: "shipping_line_name",
		header: "Shipping line",
	},
	{
		accessorKey: "cost",
		header: "Cost",
	},

	{
		id: "actions",
		header: "Options",
		cell: ({ row }) => {
			const maritimeTransport = row.original;
			const maritimeTransportId = row.original.id;

			const { deleteMaritimeTransport } = useDeleteMaritimeTransport(
				maritimeTransportId.toString()
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
							<AlertDialogTrigger className=" mb-2 bg-red-600 duration-200 text-white hover:!bg-red-800 hover:!text-white cursor-pointer w-full text-sm text-center justify-center p-2 flex rounded-sm">
								Delete maritime transport
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
										onClick={() => deleteMaritimeTransport()}
									>
										<Button className="duration-200 hover:bg-black hover:text-white text-white bg-red-600 cursor-pointer flex rounded-sm text-sm">
											Delete
										</Button>
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
						<UpdateMaritimeTransport {...maritimeTransport} />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
