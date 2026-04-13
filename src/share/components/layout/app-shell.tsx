import type { ReactNode } from "react";

import { AppShellChrome } from "@/share/components/layout/app-shell-chrome";
import { cn } from "@/share/lib/utils";

type AppShellProps = {
	className?: string;
	header?: ReactNode;
	children: ReactNode;
};

export function AppShell({ header, children, className }: AppShellProps) {
	return (
		<div className={cn("min-h-dvh w-full bg-white dark:bg-neutral-950", className)}>
			<AppShellChrome header={header}>{children}</AppShellChrome>
		</div>
	);
}
