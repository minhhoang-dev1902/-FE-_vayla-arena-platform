"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { appNavItems } from "@/share/components/layout/app-nav";
import { useAppShellNav } from "@/share/components/layout/app-shell-nav-context";
import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";

export function AppShellMobileNav() {
	const { open, close, panelId } = useAppShellNav();

	return (
		<>
			<div
				aria-hidden={!open}
				className={cn(
					"absolute inset-x-0 top-14 bottom-0 z-40 bg-black/40 transition-opacity duration-300",
					open ? "opacity-100" : "pointer-events-none opacity-0",
				)}
				onClick={close}
			/>

			<aside
				className={cn(
					"absolute top-14 right-0 bottom-0 z-50 flex w-[min(100%,20rem)] flex-col border-l border-border bg-background shadow-xl transition-transform duration-300 ease-out",
					open ? "translate-x-0" : "pointer-events-none translate-x-full",
				)}
				aria-hidden={!open}
				id={panelId}
			>
				<div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-4">
					<span className="text-sm font-semibold text-foreground">Menu</span>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="size-8 shrink-0"
						onClick={close}
					>
						<span className="sr-only">Đóng</span>
						<X className="size-4" />
					</Button>
				</div>
				<nav
					className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3"
					aria-label="Điều hướng chính"
				>
					{appNavItems.map(item => (
						<Link
							key={item.href}
							href={item.href}
							className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
							onClick={close}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</aside>
		</>
	);
}
