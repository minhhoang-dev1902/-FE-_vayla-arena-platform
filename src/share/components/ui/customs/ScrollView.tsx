import type { ReactNode } from "react";
import { cn } from "@/share/lib/utils";

type CustomScrollViewProps = {
	children: ReactNode;
	className?: string;
	/** Fade edges (same as scroll surface), e.g. `from-black` on dark pages */
	fadeFromClassName?: string;
};

export function CustomScrollView({
	children,
	className,
	fadeFromClassName = "from-background",
}: CustomScrollViewProps) {
	return (
		<div className="relative">
			<div
				className={cn(
					"pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b to-transparent",
					fadeFromClassName,
				)}
			/>
			<div
				className={cn(
					"pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t to-transparent",
					fadeFromClassName,
				)}
			/>
			<div className={cn("min-h-[500px] max-h-[500px] overflow-y-auto", className)}>{children}</div>
		</div>
	);
}
