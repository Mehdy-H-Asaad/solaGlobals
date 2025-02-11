import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { useSendEmail } from "@/hooks/useSendEmail";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useMemo } from "react";
import { contactDetails } from "@/data";
import { motion } from "framer-motion";
import { useAnimationOptions } from "@/animation/animationOptions";

export const Contact = () => {
	const { emailForm, onSendEmail } = useSendEmail();

	const googleMap = useMemo(
		() => (
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d206253.5324458531!2d-115.33981002985016!3d36.12488712378223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1706555913762!5m2!1sen!2s"
				width="100%"
				height="400px"
				style={{ border: "0" }}
				allowFullScreen={false}
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
			></iframe>
		),
		[]
	);

	const { isInView, ref, staggerVariants, textAnimation } =
		useAnimationOptions();

	return (
		<div className="py-20" id="contact">
			<div className="container">
				<div className="flex justify-between flex-col lg:flex-row gap-20">
					<div className="flex-1 flex-col flex gap-10">
						<div>{googleMap}</div>

						<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-10">
							{contactDetails.map((contact, index) => (
								<motion.div
									variants={staggerVariants}
									initial="initial"
									whileInView="animate"
									custom={index}
									viewport={{ once: true }}
									key={contact.id}
									className="flex flex-col gap-2 border border-blue rounded-md py-4 px-6 items-center justify-center text-center"
								>
									<div className="text-lg font-bold">{contact.contact}</div>
									<a href={contact.href} className="text-sm">
										{contact.hrefTitle}
									</a>
									<div className="text-sm">{contact.description}</div>
									<p className="text-sm">{contact.secAddress}</p>
								</motion.div>
							))}
						</div>
					</div>

					<div className="flex-1">
						<div ref={ref}>
							<div className="overflow-hidden">
								<motion.div
									variants={textAnimation}
									initial="initial"
									animate={isInView ? "enter" : ""}
									className="text-4xl font-bold"
								>
									Contact <span className="text-blue">Us</span>
								</motion.div>
							</div>
							<div className="overflow-hidden mb-6">
								<motion.p
									variants={textAnimation}
									initial="initial"
									animate={isInView ? "enter" : ""}
								>
									Feel free to contact us.
								</motion.p>
							</div>
							{/* </div> */}
						</div>
						<motion.div
							viewport={{ once: true }}
							initial={{ opacity: 0, x: 60 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
						>
							<Form {...emailForm}>
								<form
									className="flex flex-col gap-6"
									onSubmit={emailForm.handleSubmit(onSendEmail)}
								>
									<FormField
										control={emailForm.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Name" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={emailForm.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Email" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={emailForm.control}
										name="phone"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Phone</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Phone" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={emailForm.control}
										name="subject"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Subject</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Subject" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={emailForm.control}
										name="message"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Message</FormLabel>
												<FormControl>
													<Textarea {...field} placeholder="Message" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button className="w-fit font-bold bg-blue duration-200 hover:bg-black text-white p-2 px-4 rounded-md">
										Send Email
									</Button>
								</form>
							</Form>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};
