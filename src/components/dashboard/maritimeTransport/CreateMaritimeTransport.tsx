import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useGetDestinations } from "../hooks/destination/useGetDestinations";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateMaritimeTransport } from "../hooks/maritimeTransports/useCreateMaritimeTransport";
import { useGetShippingLines } from "../hooks/shppingLines/useGetShippingLines";

export const CreateMaritimeTransport = () => {
	const {
		createMaritimeTransportForm,
		isCreatingMaritimeTransport,
		onCreateMaritimeTransport,
	} = useCreateMaritimeTransport();

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

	const [shippingLineSearch, setShippingLineSearch] = useState<string>("");
	const [warehouseSearch, setWarehouseSearch] = useState<string>("");
	const [isShippingLineDropdownOpen, setIsShippingLineDropdownOpen] =
		useState(false);
	const [isWarehouseDropdownOpen, setIsWarehouseDropdownOpen] = useState(false);

	const { shippingLines } = useGetShippingLines();
	const { destinations } = useGetDestinations();

	const filteredShippingLines = shippingLines?.filter(shippingLine =>
		shippingLine.name.toLowerCase().includes(shippingLineSearch.toLowerCase())
	);

	const filteredDestinations = destinations?.filter(destination =>
		destination.state.toLowerCase().includes(warehouseSearch.toLowerCase())
	);

	const filteredshippingLines = shippingLines?.filter(shippingLine =>
		shippingLine.name.toLowerCase().includes(shippingLineSearch.toLowerCase())
	);

	const isValidShippingLine = filteredshippingLines?.some(
		source => source.name.toLowerCase() === shippingLineSearch.toLowerCase()
	);
	const isValidDestination = filteredDestinations?.some(
		destination =>
			destination.state.toLowerCase() === warehouseSearch.toLowerCase()
	);

	const isFormValid = isValidShippingLine && isValidDestination;

	if (!filteredDestinations || !filteredShippingLines)
		return <Skeleton className="w-[250px] h-8" />;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					Create maritime transport
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Maritime transport</DialogTitle>
					<DialogDescription>
						Make changes to your Maritime transports here. Click Create
						destination when you're done.
					</DialogDescription>
				</DialogHeader>
				<div ref={ref}>
					<Form {...createMaritimeTransportForm}>
						<form
							className="flex flex-col gap-5"
							onSubmit={createMaritimeTransportForm.handleSubmit(
								onCreateMaritimeTransport
							)}
						>
							<FormField
								control={createMaritimeTransportForm.control}
								name="shipping_line_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Shipping line</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													value={shippingLineSearch}
													onChange={e => {
														setShippingLineSearch(e.target.value);
													}}
													onClick={() => setIsShippingLineDropdownOpen(true)}
													onInput={() => setIsShippingLineDropdownOpen(true)}
													placeholder="Search Shipping line"
												/>
												{/* Shipping Line Dropdown */}
												{isShippingLineDropdownOpen &&
													filteredShippingLines?.length > 0 && (
														<div className="absolute w-full bg-white border rounded-md shadow-md mt-1 max-h-40 z-10 overflow-y-auto">
															{filteredShippingLines?.map(shippingLine => (
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
								control={createMaritimeTransportForm.control}
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
													filteredDestinations?.length > 0 && (
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
								control={createMaritimeTransportForm.control}
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
									disabled={isCreatingMaritimeTransport || !isFormValid}
								>
									{isCreatingMaritimeTransport
										? "Creating..."
										: "Create Inland transport"}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};
