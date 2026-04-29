"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useAnimationControls } from "motion/react";
import { cn } from "@/share/lib/utils";

type RevealMotionProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
	duration?: number;
	y?: number;
	once?: boolean;
	triggerKey?: string | number;
};

export function RevealMotion({
	children,
	className,
	delay = 0,
	duration = 0.35,
	y = 12,
	once = true,
	triggerKey,
}: RevealMotionProps) {
	const controls = useAnimationControls();

	useEffect(() => {
		if (triggerKey === undefined) return;

		controls.set({ opacity: 0, y });
		controls.start({
			opacity: 1,
			y: 0,
			transition: { duration, delay, ease: "easeOut" },
		});
	}, [triggerKey, controls, y, duration, delay]);

	return (
		<motion.div
			initial={{ opacity: 0, y }}
			whileInView={triggerKey === undefined ? { opacity: 1, y: 0 } : undefined}
			animate={triggerKey !== undefined ? controls : undefined}
			transition={{ duration, delay, ease: "easeOut" }}
			viewport={{ once, amount: 0.2 }}
			className={cn(className)}
		>
			{children}
		</motion.div>
	);
}
