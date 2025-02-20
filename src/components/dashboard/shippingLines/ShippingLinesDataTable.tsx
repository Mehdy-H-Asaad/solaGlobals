import { Button } from "@/components/ui/button";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	SortingState,
	getSortedRowModel,
	VisibilityState,
	ColumnFiltersState,
	getFilteredRowModel,
	useReactTable,
	PaginationState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateShippingLine } from "./CreateShippingLine";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination: PaginationState;
	isLoading: boolean;
	setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export function ShippingLinesDataTable<TData, TValue>({
	columns,
	data,
	pagination,
	setPagination,
	isLoading,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns,
		pageCount: 2,
		manualPagination: true,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			pagination,
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		onRowSelectionChange: setRowSelection,
	});

	return (
		<div>
			<div className="flex items-center justify-between py-4 gap-10">
				<Input
					placeholder="Search state"
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={event =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="max-w-sm bg-transparent border-gray-500"
				/>

				<CreateShippingLine />
			</div>
			<div className="rounded-md border border-gray-500">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow className="border border-gray-500" key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									className="border border-gray-500"
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : isLoading ? (
							[...Array(2)].map((_, index) => (
								<TableRow key={index} className="border border-gray-500">
									{[...Array(2)].map((_, cellIndex) => (
										<TableCell key={cellIndex} className="h-24 text-center">
											<div className="space-y-2">
												<Skeleton className="h-4 w-[100px]" />
											</div>
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					className="bg-transparent hover:bg-black hover:text-white duration-200 border text-black border-gray-500 cursor-pointer"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					className="bg-transparent hover:bg-black hover:text-white duration-200 border text-black border-gray-500 cursor-pointer"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
