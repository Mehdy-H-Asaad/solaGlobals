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
import { useCreateInlandTransport } from "../hooks/inlandTransports/useCreateInlandTransport";
import { useEffect, useRef, useState } from "react";
import { useGetSources } from "../hooks/source/useGetSources";
import { useGetDestinations } from "../hooks/destination/useGetDestinations";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

export const CreateInlandTransport = () => {
	const {
		createInlandTransportForm,
		isCreatingInlandTransport,
		onCreateInlandTransport,
	} = useCreateInlandTransport();

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

	const [sourceSearch, setSourceSearch] = useState("");
	const [warehouseSearch, setWarehouseSearch] = useState("");
	const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
	const [isWarehouseDropdownOpen, setIsWarehouseDropdownOpen] = useState(false);
	const { sources } = useGetSources();
	const { destinations } = useGetDestinations();

	const filteredSources = sources?.filter(source =>
		source.state.toLowerCase().includes(sourceSearch.toLowerCase())
	);

	const filteredDestinations = destinations?.filter(destination =>
		destination.state.toLowerCase().includes(warehouseSearch.toLowerCase())
	);

	const isValidSource = filteredSources?.some(
		source => source.state.toLowerCase() === sourceSearch.toLowerCase()
	);
	const isValidDestination = filteredDestinations?.some(
		destination =>
			destination.state.toLowerCase() === warehouseSearch.toLowerCase()
	);

	const isFormValid = isValidSource && isValidDestination;

	useEffect(() => {
		if (createInlandTransportForm.formState.errors) {
			console.log(createInlandTransportForm.formState.errors);
		}
	}, [createInlandTransportForm.formState.errors]);

	if (!filteredDestinations || !filteredSources)
		return <Skeleton className="w-[250px] h-8" />;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					Create Inland transport
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Inland transport</DialogTitle>
					<DialogDescription>
						Make changes to your Inland transports here. Click Create
						destination when you're done.
					</DialogDescription>
				</DialogHeader>
				<div ref={ref}>
					<Form {...createInlandTransportForm}>
						<form
							className="flex flex-col gap-5"
							onSubmit={createInlandTransportForm.handleSubmit(
								onCreateInlandTransport
							)}
						>
							<FormField
								control={createInlandTransportForm.control}
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
													filteredSources?.length > 0 && (
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
								control={createInlandTransportForm.control}
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
								control={createInlandTransportForm.control}
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
									disabled={isCreatingInlandTransport || !isFormValid}
								>
									{isCreatingInlandTransport
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
