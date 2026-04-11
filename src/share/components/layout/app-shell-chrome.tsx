"use client";

import type { ReactNode } from "react";

import { AppShellMobileNav } from "@/share/components/layout/app-shell-mobile-nav";
import { AppShellNavProvider } from "@/share/components/layout/app-shell-nav-context";
import { MainHeader } from "@/share/components/layout/headers/main-header";

type AppShellChromeProps = {
	/** Header tùy chỉnh; mặc định dùng `MainHeader` (cùng `MobileNavTrigger` + sidebar từ context). */
	header?: ReactNode;
	children: ReactNode;
};

export function AppShellChrome({ header, children }: AppShellChromeProps) {
	return (
		<AppShellNavProvider>
			<div className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden">
				{header ?? <MainHeader />}

				<main className="relative z-0 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
					{children}
				</main>

				<AppShellMobileNav />
			</div>
		</AppShellNavProvider>
	);
}
