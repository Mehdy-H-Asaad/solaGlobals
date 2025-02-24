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
import { t } from "i18next";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination: PaginationState;
	isLoading: boolean;
	pageCount: number;
	setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export function AuctionFeeDataTable<TData, TValue>({
	columns,
	data,
	pagination,
	setPagination,
	pageCount,
	isLoading,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns,
		pageCount: pageCount,
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
					placeholder={t("dashboard.search.searchFee")}
					value={(table.getColumn("fee")?.getFilterValue() as string) ?? ""}
					onChange={event =>
						table.getColumn("fee")?.setFilterValue(event.target.value)
					}
					className="max-w-sm bg-transparent border-gray-500"
				/>
			</div>
			<div className="rounded-md border border-gray-500">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow className="border border-gray-500" key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead className="rtl:text-right" key={header.id}>
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
							[...Array(3)].map((_, index) => (
								<TableRow key={index} className="border border-gray-500">
									{[...Array(3)].map((_, cellIndex) => (
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
					{t("dashboard.previous")}
				</Button>
				<Button
					className="bg-transparent hover:bg-black hover:text-white duration-200 border text-black border-gray-500 cursor-pointer"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{t("dashboard.next")}
				</Button>
			</div>
		</div>
	);
}
