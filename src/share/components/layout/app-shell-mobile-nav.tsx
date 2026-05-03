"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useAppShellNav } from "@/share/components/layout/app-shell-nav-context";
import { Button } from "@/share/components/ui/button";
import { CustomButtonConnectWallet } from "@/share/components/ui/customs/custom-button/CustomButtonConnectWallet";
import { NAVIGATE } from "@/share/contants/navigate";
import { cn } from "@/share/lib/utils";

/** Mock menu — chữ teal đậm */
const MENU_LINK_TEAL = "text-[#002B2B]";

const mobilePrimaryLinks = [
	{ href: NAVIGATE.DISCOVERY, label: "Discovery", inactive: false },
	{ href: NAVIGATE.BOOST, label: "Web3.0 Boost", inactive: false },
	{ href: NAVIGATE.MY_PAGE, label: "My Page", inactive: false },
	{ href: "#", label: "Language", inactive: true },
] as const satisfies ReadonlyArray<{ href: string; label: string; inactive: boolean }>;

export function AppShellMobileNav() {
	const { open, close, panelId } = useAppShellNav();

	return (
		<>
			<div
				aria-hidden={!open}
				className={cn(
					"fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300",
					open ? "opacity-100" : "pointer-events-none opacity-0",
				)}
				onClick={close}
			/>

			<aside
				className={cn(
					"fixed inset-y-0 right-0 z-[110] flex w-[min(100%,18rem)] flex-col pt-[env(safe-area-inset-top)] shadow-xl transition-transform duration-300 ease-out",
					"bg-white",
					open ? "translate-x-0" : "pointer-events-none translate-x-full",
				)}
				aria-hidden={!open}
				id={panelId}
			>
				<div className="flex shrink-0 justify-end px-4 pb-2 pt-3">
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="size-8 shrink-0"
						onClick={close}
					>
						<span className="sr-only">Đóng</span>
						<X className="size-4 text-neutral-700" />
					</Button>
				</div>

				<div className="scrollbar-app flex flex-1 flex-col gap-4 overflow-y-auto px-5">
					<nav className="flex flex-col pt-1" aria-label="Điều hướng chính">
						{mobilePrimaryLinks.map(item =>
							item.inactive ? (
								<span
									key={item.label}
									className={cn(
										"cursor-default py-3 text-[15px] font-medium opacity-70",
										MENU_LINK_TEAL,
									)}
								>
									{item.label}
								</span>
							) : (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										"py-3 text-[15px] font-medium transition-opacity hover:opacity-80 active:opacity-70",
										MENU_LINK_TEAL,
									)}
									onClick={close}
								>
									{item.label}
								</Link>
							),
						)}
					</nav>

					<div className="rounded-[10px] border border-[#E2E8F0] bg-white p-3 shadow-sm">
						<CustomButtonConnectWallet />
					</div>
				</div>
			</aside>
		</>
	);
}
