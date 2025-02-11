import { useInView } from "framer-motion";
import { useRef } from "react";

export const useAnimationOptions = () => {
	const staggerVariants = {
		initial: {
			y: 50,
			opacity: 0,
		},
		animate: (index: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				delay: 0.2 * index,
			},
		}),
	};

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-25%" });

	const textAnimation = {
		initial: {
			y: "100%",
		},
		enter: {
			y: "0",
			transition: {
				duration: 0.75,
				ease: [0.33, 1, 0.68, 1],
				delay: 0.075,
			},
		},
	};

	return { isInView, ref, textAnimation, staggerVariants };
};
