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
import { UpdateDestination } from "./UpdateDestination";
import { useDeleteDestination } from "../hooks/destination/useDeleteDestination";

export const DestiantionColumns: ColumnDef<TSource>[] = [
	{
		accessorKey: "state",
		header: "State",
	},
	{
		accessorKey: "city",
		header: "City",
	},
	{
		accessorKey: "address",
		header: "Address",
	},
	{
		accessorKey: "zipcode",
		header: "Zip code",
	},

	{
		id: "actions",
		header: "Options",
		cell: ({ row }) => {
			const destination = row.original;
			const destinationId = row.original.id;

			const { deleteDestination } = useDeleteDestination(destinationId);

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
								Delete warehouse
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
										onClick={() => deleteDestination()}
									>
										<Button className="duration-200 hover:bg-black hover:text-white text-white bg-red-600 cursor-pointer flex rounded-sm text-sm">
											Delete
										</Button>
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
						<UpdateDestination {...destination} />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
