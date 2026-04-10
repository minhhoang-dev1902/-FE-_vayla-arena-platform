"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useEffect, useId, useState } from "react";
import { appNavItems } from "@/share/components/layout/app-nav";
import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";

type AppShellChromeProps = {
	children: ReactNode;
};

/**
 * Header + main + sidebar. Sidebar/backdrop dùng `absolute` trong cột app (view zone),
 * không `fixed` theo toàn viewport.
 */
export function AppShellChrome({ children }: AppShellChromeProps) {
	const [open, setOpen] = useState(false);
	const panelId = useId();

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open]);

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<div className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden">
			<header className="sticky top-0 z-60 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80">
				<Link
					href="/"
					className="text-lg font-semibold tracking-tight text-foreground"
					onClick={() => setOpen(false)}
				>
					Spon Live
				</Link>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="shrink-0"
					aria-expanded={open}
					aria-controls={panelId}
					onClick={() => setOpen(v => !v)}
				>
					<span className="sr-only">{open ? "Đóng menu" : "Mở menu"}</span>
					{open ? <X /> : <Menu />}
				</Button>
			</header>

			<main className="relative z-0 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
				{children}
			</main>

			<div
				aria-hidden={!open}
				className={cn(
					"absolute inset-x-0 top-14 bottom-0 z-40 bg-black/40 transition-opacity duration-300",
					open ? "opacity-100" : "pointer-events-none opacity-0",
				)}
				onClick={() => setOpen(false)}
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
						onClick={() => setOpen(false)}
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
							onClick={() => setOpen(false)}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</aside>
		</div>
	);
}
