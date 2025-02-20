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
import { useCreateShippingLine } from "../hooks/shppingLines/useCreateShippingLine";

export const CreateShippingLine = () => {
	const {
		createShippingLineForm,
		isCreatingShippingLine,
		onCreateShippingLine,
	} = useCreateShippingLine();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue hover:bg-cyan-800 text-white">
					Create shipping line
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
				<Form {...createShippingLineForm}>
					<form
						className="flex flex-col gap-5"
						onSubmit={createShippingLineForm.handleSubmit(onCreateShippingLine)}
					>
						<FormField
							control={createShippingLineForm.control}
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
								disabled={isCreatingShippingLine}
							>
								{isCreatingShippingLine
									? "Creating..."
									: "Create shipping line"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
