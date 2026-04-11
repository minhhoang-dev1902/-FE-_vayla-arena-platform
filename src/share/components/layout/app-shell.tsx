import type { ReactNode } from "react";

import { AppShellChrome } from "@/share/components/layout/app-shell-chrome";
import { cn } from "@/share/lib/utils";

type AppShellProps = {
	className?: string;
	header?: ReactNode;
	children: ReactNode;
};

export function AppShell({ children, className, header }: AppShellProps) {
	return (
		<div className="min-h-dvh bg-black ">
			<div
				className={cn(
					"mx-auto flex h-dvh max-h-dvh min-h-0 w-full max-w-full flex-col overflow-hidden bg-background",
					"lg:max-w-(--app-view-max-width,80rem)",
					className,
				)}
			>
				<AppShellChrome header={header}>{children}</AppShellChrome>
			</div>
		</div>
	);
}
