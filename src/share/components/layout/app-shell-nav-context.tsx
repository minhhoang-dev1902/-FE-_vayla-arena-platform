"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useId,
	useMemo,
	useState,
} from "react";

type AppShellNavContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
	toggle: () => void;
	close: () => void;
	panelId: string;
};

const AppShellNavContext = createContext<AppShellNavContextValue | null>(null);

export function AppShellNavProvider({ children }: { children: ReactNode }) {
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

	const value = useMemo<AppShellNavContextValue>(
		() => ({
			open,
			setOpen,
			toggle: () => setOpen(v => !v),
			close: () => setOpen(false),
			panelId,
		}),
		[open, panelId],
	);

	return <AppShellNavContext.Provider value={value}>{children}</AppShellNavContext.Provider>;
}

export function useAppShellNav() {
	const ctx = useContext(AppShellNavContext);
	if (!ctx) {
		throw new Error("useAppShellNav must be used within AppShellNavProvider");
	}
	return ctx;
}
