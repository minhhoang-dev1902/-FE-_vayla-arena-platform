"use client";

import type { ReactNode } from "react";
import { AppShellMobileNav } from "@/share/components/layout/app-shell-mobile-nav";
import { AppShellNavProvider } from "@/share/components/layout/app-shell-nav-context";
import { MainHeader } from "@/share/components/layout/headers/main-header";
import { AppShellFooterNav } from "@/share/components/layout/nav/app-shell-footer-nav";

type AppShellChromeProps = {
	header?: ReactNode;
	children: ReactNode;
};

export function AppShellChrome({ header, children }: AppShellChromeProps) {
	return (
		<AppShellNavProvider>
			<div className="relative flex min-h-dvh w-full flex-col">
				{header ?? <MainHeader />}

				<div className="relative mx-auto flex min-h-0 w-full max-w-(--app-view-max-width,80rem) flex-1 flex-col overflow-hidden  pt-1 pb-20 lg:px-4 lg:pb-3">
					<main className="scrollbar-app relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain bg-background">
						{children}
					</main>
				</div>

				<AppShellFooterNav />
				<AppShellMobileNav />
			</div>
		</AppShellNavProvider>
	);
}
