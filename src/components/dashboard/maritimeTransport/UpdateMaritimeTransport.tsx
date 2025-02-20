import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { useRef, useEffect } from "react";
import { TMaritimeTransports } from "../types";
import { useUpdateMaritimeTransport } from "../hooks/maritimeTransports/useUpdateMaritimeTransport";
import { useUpdateMaritimeTransportForm } from "../hooks/maritimeTransports/form/useUpdateMaritimeTransportForm";

export const UpdateMaritimeTransport = (
	maritimeTransport: TMaritimeTransports
) => {
	const {
		isUpdatingMaritimeTransport,
		onUpdateMaritimeTransport,
		updateMaritimeTransportForm,
	} = useUpdateMaritimeTransport(maritimeTransport.id.toString());

	const {
		filteredDestinations,
		filteredshippingLines,
		isFormValid,
		isShippingLineDropdownOpen,
		isWarehouseDropdownOpen,
		setIsShippingLineDropdownOpen,
		setIsWarehouseDropdownOpen,
		setShippingLineSearch,
		setWarehouseSearch,
		shippingLineSearch,

		warehouseSearch,
	} = useUpdateMaritimeTransportForm();

	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutsideSelectMenu = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsShippingLineDropdownOpen(false);
				setIsWarehouseDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutsideSelectMenu);

		return () =>
			document.removeEventListener("mousedown", handleClickOutsideSelectMenu);
	}, []);

	useEffect(() => {
		if (maritimeTransport) {
			updateMaritimeTransportForm.reset(maritimeTransport);
			setShippingLineSearch(maritimeTransport.shipping_line_name);
			setWarehouseSearch(maritimeTransport.warehouse_state);
		}
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					Update Maritime transport
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update Maritime transport</DialogTitle>
					<DialogDescription>
						Make changes to your Maritime transports here. Click Create
						destination when you're done.
					</DialogDescription>
				</DialogHeader>
				<div ref={ref}>
					<Form {...updateMaritimeTransportForm}>
						<form
							className="flex flex-col gap-5"
							onSubmit={updateMaritimeTransportForm.handleSubmit(
								onUpdateMaritimeTransport
							)}
						>
							<FormField
								control={updateMaritimeTransportForm.control}
								name="shipping_line_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Source</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													value={shippingLineSearch}
													onChange={e => {
														setShippingLineSearch(e.target.value);
													}}
													onClick={() => setIsShippingLineDropdownOpen(true)}
													onInput={() => setIsShippingLineDropdownOpen(true)}
													placeholder="Search source"
												/>
												{/* Source Dropdown */}
												{isShippingLineDropdownOpen &&
													filteredshippingLines &&
													filteredshippingLines.length > 0 && (
														<div className="absolute w-full bg-white border rounded-md shadow-md mt-1 max-h-40 z-10 overflow-y-auto">
															{filteredshippingLines?.map(shippingLine => (
																<div
																	key={shippingLine.id}
																	className="p-2 cursor-pointer hover:bg-gray-200"
																	onClick={() => {
																		field.onChange(shippingLine.id); // Set selected value in the form
																		setShippingLineSearch(shippingLine.name); // Show selected text in input
																		setIsShippingLineDropdownOpen(false);
																	}}
																>
																	{shippingLine.name}
																</div>
															))}
														</div>
													)}
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={updateMaritimeTransportForm.control}
								name="warehouse_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Warehouse</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													value={warehouseSearch}
													onChange={e => {
														setWarehouseSearch(e.target.value);
													}}
													onClick={() => setIsWarehouseDropdownOpen(true)}
													onInput={() => setIsWarehouseDropdownOpen(true)}
													placeholder="Search warehouses"
												/>
												{/* Warehouse Dropdown */}
												{isWarehouseDropdownOpen &&
													filteredDestinations &&
													filteredDestinations.length > 0 && (
														<div className="absolute w-full bg-white border rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
															{filteredDestinations?.map(destination => (
																<div
																	key={destination.id}
																	className="p-2 cursor-pointer hover:bg-gray-200"
																	onClick={() => {
																		field.onChange(destination.id);
																		setWarehouseSearch(destination.state);
																		setIsWarehouseDropdownOpen(false);
																	}}
																>
																	{destination.state}
																</div>
															))}
														</div>
													)}
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={updateMaritimeTransportForm.control}
								name="cost"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cost</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Cost"
												onChange={e => {
													if (/^\d*$/.test(e.target.value))
														field.onChange(Number(e.target.value));
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter>
								<Button
									className="bg-blue hover:bg-cyan-800 text-white"
									type="submit"
									disabled={!isFormValid}
								>
									{isUpdatingMaritimeTransport
										? "Updating..."
										: "Update Inland transport"}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};
