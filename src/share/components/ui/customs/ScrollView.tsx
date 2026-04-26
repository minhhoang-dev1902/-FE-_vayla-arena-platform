import type { ReactNode } from "react";
import { cn } from "@/share/lib/utils";

type CustomScrollViewProps = {
	children: ReactNode;
	className?: string;
};

export function CustomScrollView({ children, className }: CustomScrollViewProps) {
	return (
		<div className="relative">
			<div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-background to-transparent" />
			<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-background to-transparent" />
			<div className={cn("max-h-[500px] overflow-y-auto", className)}>{children}</div>
		</div>
	);
}
