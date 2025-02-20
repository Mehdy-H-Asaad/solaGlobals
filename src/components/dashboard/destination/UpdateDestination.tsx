import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { TDestination } from "../types";
import { useEffect } from "react";
import { useUpdateDestination } from "../hooks/destination/useUpdateDestination";

export const UpdateDestination = (destination: TDestination) => {
	const { updateDestinationForm, isUpdatingDestination, onUpdateDestination } =
		useUpdateDestination(Number(destination.id));

	useEffect(() => {
		if (destination) {
			updateDestinationForm.reset(destination);
		}
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					Update warehouse
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update warehouse</DialogTitle>
					<DialogDescription>
						Make changes to your warehouses here. Click Create source when
						you're done.
					</DialogDescription>
				</DialogHeader>
				<Form {...updateDestinationForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={updateDestinationForm.handleSubmit(onUpdateDestination)}
					>
						<FormField
							control={updateDestinationForm.control}
							name="state"
							render={({ field }) => (
								<FormItem>
									<FormLabel>State</FormLabel>
									<FormControl>
										<Input {...field} placeholder="State" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={updateDestinationForm.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input {...field} placeholder="city" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={updateDestinationForm.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Input {...field} placeholder="address" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={updateDestinationForm.control}
							name="zipcode"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Zip Code</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Zip Code" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								className="bg-blue hover:bg-cyan-800 text-white"
								type="submit"
								disabled={isUpdatingDestination}
							>
								{isUpdatingDestination ? "Updating..." : "Update destination"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
