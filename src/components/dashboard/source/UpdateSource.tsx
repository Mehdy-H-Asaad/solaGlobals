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
import { useUpdateSource } from "../hooks/source/useUpdateSource";
import { TSource } from "../types";
import { useEffect } from "react";

export const UpdateSource = (source: TSource) => {
	const { updateSourceForm, isUpdatingSource, onUpdateSource } =
		useUpdateSource(Number(source.id));

	useEffect(() => {
		if (source) {
			updateSourceForm.reset(source);
		}
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					Update source
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create source</DialogTitle>
					<DialogDescription>
						Make changes to your sources here. Click Create source when you're
						done.
					</DialogDescription>
				</DialogHeader>
				<Form {...updateSourceForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={updateSourceForm.handleSubmit(onUpdateSource)}
					>
						<FormField
							control={updateSourceForm.control}
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
							control={updateSourceForm.control}
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
							control={updateSourceForm.control}
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
							control={updateSourceForm.control}
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
								disabled={isUpdatingSource}
							>
								{isUpdatingSource ? "Updating..." : "Update source"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
