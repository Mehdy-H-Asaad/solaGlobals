import { t } from "i18next";
import { useGetShippingLines } from "../hooks/shppingLines/useGetShippingLines";
import { ShippingLineColumns } from "./ShippingLinesColumns";
import { ShippingLinesDataTable } from "./ShippingLinesDataTable";

export const ShippingLinesList = () => {
	const {
		isLoadingShippingLines,
		pagination,
		total_pages,
		setPagination,
		shippingLines,
	} = useGetShippingLines();

	return (
		<div className="container">
			<div className="text-4xl font-bold w-fit mx-auto my-10">
				<span className="text-blue"> {t("dashboard.Shipping lines")}</span>
			</div>

			<ShippingLinesDataTable
				columns={ShippingLineColumns}
				data={shippingLines || []}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={isLoadingShippingLines}
				pageCount={total_pages || 0}
			/>
		</div>
	);
};
