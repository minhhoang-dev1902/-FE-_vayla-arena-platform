import type { ReactNode } from "react";

import { AppShellChrome } from "@/share/components/layout/app-shell-chrome";
import { cn } from "@/share/lib/utils";

type AppShellProps = {
	className?: string;
	children: ReactNode;
};

/**
 * Mobile-first: full width on small viewports.
 * From `lg` up, the app is centered with a max width; horizontal overflow is white.
 */
export function AppShell({ children, className }: AppShellProps) {
	return (
		<div className="min-h-dvh bg-black ">
			<div
				className={cn(
					"mx-auto flex h-dvh max-h-dvh min-h-0 w-full max-w-full flex-col overflow-hidden bg-background",
					"lg:max-w-(--app-view-max-width,80rem)",
					className,
				)}
			>
				<AppShellChrome>{children}</AppShellChrome>
			</div>
		</div>
	);
}
