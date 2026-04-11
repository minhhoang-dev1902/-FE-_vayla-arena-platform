"use client";

import Link from "next/link";
import { useAppShellNav } from "@/share/components/layout/app-shell-nav-context";
import { appShellHeaderRootClassName } from "@/share/components/layout/app-shell-header-classes";
import { MobileNavTrigger } from "@/share/components/layout/mobile-nav-trigger";

export function MainHeader() {
    const { close } = useAppShellNav();

    return (
        <header className={appShellHeaderRootClassName}>
            <Link
                href="/"
                className="text-lg font-semibold tracking-tight text-foreground"
                onClick={close}
            >
                Spon Live
            </Link>
            <MobileNavTrigger className="shrink-0" />
        </header>
    );
}
