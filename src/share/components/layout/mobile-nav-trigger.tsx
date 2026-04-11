"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/share/components/ui/button";
import { useAppShellNav } from "@/share/components/layout/app-shell-nav-context";

type MobileNavTriggerProps = {
	className?: string;
};

export function MobileNavTrigger({ className }: MobileNavTriggerProps) {
	const { open, toggle, panelId } = useAppShellNav();

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			className={className}
			aria-expanded={open}
			aria-controls={panelId}
			onClick={toggle}
		>
			<span className="sr-only">{open ? "Đóng menu" : "Mở menu"}</span>
			{open ? <X /> : <Menu />}
		</Button>
	);
}
