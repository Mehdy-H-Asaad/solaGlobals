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
import { TShippingLine } from "../types";
import { useEffect } from "react";
import { useUpdateShippingLine } from "../hooks/shppingLines/useUpdateShippingLine";

export const UpdateShippingLine = (shippingLine: TShippingLine) => {
	const {
		isUpdatingShippingLine,
		onUpdateShippingLine,
		updateShippingLineForm,
	} = useUpdateShippingLine(shippingLine.id.toString());

	useEffect(() => {
		if (shippingLine) {
			updateShippingLineForm.reset(shippingLine);
		}
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					Update shipping line
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create shipping line</DialogTitle>
					<DialogDescription>
						Make changes to your shipping lines here. Click Create shipping line
						when you're done.
					</DialogDescription>
				</DialogHeader>
				<Form {...updateShippingLineForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={updateShippingLineForm.handleSubmit(onUpdateShippingLine)}
					>
						<FormField
							control={updateShippingLineForm.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Shipping line</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Name" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								className="bg-blue hover:bg-cyan-800 text-white"
								type="submit"
								disabled={isUpdatingShippingLine}
							>
								{isUpdatingShippingLine
									? "Updating..."
									: "Update shipping line"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
