import { ColumnDef } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import { TAuctionFee } from "../types";
import { UpdateAuctionFee } from "./UpdateAuctionFees";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

export const AuctinFeeColumns: ColumnDef<TAuctionFee>[] = [
	{
		id: "range",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.range");
		},
		cell: ({ row }) => {
			var range;
			if (row.original.range_to !== -1)
				range = `${formatCurrency(
					Number(row.original.range_from)
				)} - ${formatCurrency(Number(row.original.range_to))}`;
			else {
				range = `${formatCurrency(Number(row.original.range_from))} +`;
			}
			return <div>{range}</div>;
		},
	},

	{
		accessorKey: "fee",
		sortingFn: "alphanumeric",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.fee");
		},
		cell: ({ row }) => {
			return (
				<div>
					{row.original.range_to !== -1
						? formatCurrency(row.original.fee)
						: `${row.original.fee}%`}
				</div>
			);
		},
	},
	{
		id: "actions",
		header: () => {
			const { t } = useTranslation();
			return t("dashboard.options");
		},
		cell: ({ row }) => {
			const auctionFee = row.original;
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

						<UpdateAuctionFee {...auctionFee} />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
