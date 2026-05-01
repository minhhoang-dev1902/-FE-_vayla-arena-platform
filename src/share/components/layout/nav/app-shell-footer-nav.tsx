"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appMainNavItems, MainNavIcon } from "@/share/components/layout/nav/app-main-nav";
import { cn } from "@/share/lib/utils";

/** Màu tab đang active trong footer mobile (chuẩn thương hiệu) */
export const APP_FOOTER_NAV_ACTIVE_COLOR_CLASS = "text-[#01A88E]" as const;

export function AppShellFooterNav() {
	const pathname = usePathname();

	return (
		<div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
			<div className="mx-auto w-full max-w-(--app-view-max-width,80rem) border-t border-border bg-background pb-[env(safe-area-inset-bottom)]">
				<nav
					className="flex h-14 items-stretch justify-around gap-1 px-1"
					aria-label="Điều hướng chính"
				>
					{appMainNavItems.map(({ href, label, icon }) => {
						const active =
							href === "/"
								? pathname === "/"
								: pathname === href || pathname.startsWith(`${href}/`);

						return (
							<Link
								key={href}
								href={href}
								aria-current={active ? "page" : undefined}
								className={cn(
									"flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1 text-[10px] font-medium transition-colors",
									active
										? APP_FOOTER_NAV_ACTIVE_COLOR_CLASS
										: "text-muted-foreground hover:text-foreground",
								)}
							>
								<span className="inline-flex shrink-0 text-inherit">
									<MainNavIcon icon={icon} followForegroundColor className="size-5" />
								</span>
								<span className="truncate text-inherit">{label}</span>
							</Link>
						);
					})}
				</nav>
			</div>
		</div>
	);
}
