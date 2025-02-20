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
import { useCreateDestination } from "../hooks/destination/useCreateDestination";

export const CreateDestination = () => {
	const { createDestinationForm, isCreatingDestination, onCreateDestination } =
		useCreateDestination();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					Create warehouse
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create warehouse</DialogTitle>
					<DialogDescription>
						Make changes to your warehouses here. Click Create destination when
						you're done.
					</DialogDescription>
				</DialogHeader>

				<Form {...createDestinationForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={createDestinationForm.handleSubmit(onCreateDestination)}
					>
						<FormField
							control={createDestinationForm.control}
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
							control={createDestinationForm.control}
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
							control={createDestinationForm.control}
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
							control={createDestinationForm.control}
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
							>
								{isCreatingDestination ? "Creating..." : "Create warehouse"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
