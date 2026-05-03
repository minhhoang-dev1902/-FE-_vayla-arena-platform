import type { ReactNode } from "react";
import { cn } from "@/share/lib/utils";

type CustomScrollViewProps = {
	children: ReactNode;
	className?: string;
	/** Applied to the outer `relative` wrapper (e.g. `w-max`). */
	rootClassName?: string;
	fadeFromClassName?: string;
};

export function CustomScrollView({
	children,
	className,
	rootClassName,
	fadeFromClassName = "from-background",
}: CustomScrollViewProps) {
	return (
		<div className={cn("relative", rootClassName)}>
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
			<div className={cn("scrollbar-hide min-h-[500px] max-h-[500px] overflow-y-auto", className)}>
				{children}
			</div>
		</div>
	);
}
