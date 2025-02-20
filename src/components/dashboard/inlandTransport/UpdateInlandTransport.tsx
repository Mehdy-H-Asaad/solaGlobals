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
import { TInlandTransports } from "../types";
import { useUpdateInlandTransport } from "../hooks/inlandTransports/useUpdateInlandTransport";
import { useUpdateInlandTransportForm } from "../hooks/inlandTransports/form/useUpdateInlandTransportsForm";

export const UpdateInlandTransport = (inlandTransport: TInlandTransports) => {
	const {
		isUpdatingInlandTransport,
		onUpdateInlandTransport,
		updateInlandTransportForm,
	} = useUpdateInlandTransport(inlandTransport.id.toString());

	const {
		warehouseSearch,
		sourceSearch,
		filteredDestinations,
		filteredSources,
		isFormValid,
		isSourceDropdownOpen,
		isWarehouseDropdownOpen,
		setIsSourceDropdownOpen,
		setIsWarehouseDropdownOpen,
		setSourceSearch,
		setWarehouseSearch,
	} = useUpdateInlandTransportForm();

	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutsideSelectMenu = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsSourceDropdownOpen(false);
				setIsWarehouseDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutsideSelectMenu);

		return () =>
			document.removeEventListener("mousedown", handleClickOutsideSelectMenu);
	}, []);

	useEffect(() => {
		if (inlandTransport) {
			updateInlandTransportForm.reset(inlandTransport);
			setSourceSearch(inlandTransport.source_state);
			setWarehouseSearch(inlandTransport.warehouse_state);
		}
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					Update Inland transport
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update Inland transport</DialogTitle>
					<DialogDescription>
						Make changes to your Inland transports here. Click Create
						destination when you're done.
					</DialogDescription>
				</DialogHeader>
				<div ref={ref}>
					<Form {...updateInlandTransportForm}>
						<form
							className="flex flex-col gap-5"
							onSubmit={updateInlandTransportForm.handleSubmit(
								onUpdateInlandTransport
							)}
						>
							<FormField
								control={updateInlandTransportForm.control}
								name="source_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Source</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													value={sourceSearch}
													onChange={e => {
														setSourceSearch(e.target.value);
													}}
													onClick={() => setIsSourceDropdownOpen(true)}
													onInput={() => setIsSourceDropdownOpen(true)}
													placeholder="Search source"
												/>
												{/* Source Dropdown */}
												{isSourceDropdownOpen &&
													filteredSources &&
													filteredSources.length > 0 && (
														<div className="absolute w-full bg-white border rounded-md shadow-md mt-1 max-h-40 z-10 overflow-y-auto">
															{filteredSources?.map(source => (
																<div
																	key={source.id}
																	className="p-2 cursor-pointer hover:bg-gray-200"
																	onClick={() => {
																		field.onChange(source.id); // Set selected value in the form
																		setSourceSearch(source.state); // Show selected text in input
																		setIsSourceDropdownOpen(false);
																	}}
																>
																	{source.state}
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
								control={updateInlandTransportForm.control}
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
								control={updateInlandTransportForm.control}
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
									{isUpdatingInlandTransport
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
