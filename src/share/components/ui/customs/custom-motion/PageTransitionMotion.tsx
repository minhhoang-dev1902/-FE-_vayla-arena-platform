"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/share/lib/utils";

type PageTransitionMotionProps = {
	children: ReactNode;
	transitionKey?: string | number;
	className?: string;
};

export function PageTransitionMotion({
	children,
	transitionKey,
	className,
}: PageTransitionMotionProps) {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={transitionKey}
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -8 }}
				transition={{ duration: 0.22, ease: "easeOut" }}
				className={cn(className)}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
