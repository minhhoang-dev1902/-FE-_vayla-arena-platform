"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LAYOUT } from "@/constants/layout";
import {
	appShellHeaderInnerClassName,
	appShellHeaderNavClassName,
	appShellHeaderOuterClassName,
} from "@/share/components/layout/app-shell-header-classes";
import { useAppShellNav } from "@/share/components/layout/app-shell-nav-context";
import { appMainNavItems, MainNavIcon } from "@/share/components/layout/nav/app-main-nav";
import { MobileNavTrigger } from "@/share/components/layout/nav/mobile-nav-trigger";
import { NAVIGATE } from "@/share/contants/navigate";
import { cn } from "@/share/lib/utils";

const COMMON_MAIN_SCROLL_ID = "common-layout-main-scroll";
const HEADER_SOLID_AFTER_SCROLL_PX = 8;

export function CommonHeaderV2() {
	const { close } = useAppShellNav();
	const pathname = usePathname();
	const isHomeHeroOverlay = pathname === NAVIGATE.HOME || pathname === "/";
	const [mainScrolled, setMainScrolled] = useState(false);

	useEffect(() => {
		if (!isHomeHeroOverlay) {
			setMainScrolled(false);
			return;
		}

		const main = document.getElementById(COMMON_MAIN_SCROLL_ID);
		if (!main) return;

		const update = () => {
			setMainScrolled(main.scrollTop > HEADER_SOLID_AFTER_SCROLL_PX);
		};

		update();
		main.addEventListener("scroll", update, { passive: true });
		return () => main.removeEventListener("scroll", update);
	}, [isHomeHeroOverlay]);

	const homeBarSolid = isHomeHeroOverlay && mainScrolled;

	return (
		<header
			className={cn(
				"z-[60] w-full text-white transition-[background-color,border-color,backdrop-filter,-webkit-backdrop-filter] duration-300 ease-out",
				isHomeHeroOverlay
					? cn(
							"pointer-events-none fixed inset-x-0 top-0 shrink-0",
							homeBarSolid
								? "border-b border-white/15 bg-black/55 backdrop-blur-xl backdrop-saturate-150"
								: "border-transparent bg-transparent shadow-none backdrop-blur-none",
						)
					: cn(appShellHeaderOuterClassName, "shrink-0"),
			)}
			style={{ height: LAYOUT.HEADER_HEIGHT }}
		>
			<div className={cn(appShellHeaderInnerClassName, isHomeHeroOverlay && "pointer-events-auto")}>
				<Link
					href={NAVIGATE.HOME}
					className="relative z-10 min-w-0 shrink-0 text-lg font-semibold tracking-tight text-white"
					onClick={close}
				>
					<span className="uppercase font-bold text-[20px] leading-[32px]">Vayla </span>

					<span className="uppercase font-normal text-[20px] leading-[32px]">Arena</span>
				</Link>

				<nav className={appShellHeaderNavClassName} aria-label="Điều hướng chính">
					<ul className="flex items-center gap-0.5 rounded-full bg-white/10 p-1">
						{appMainNavItems.map(({ href, label, icon }) => {
							const active =
								href === NAVIGATE.HOME
									? pathname === NAVIGATE.HOME || pathname === "/"
									: pathname === href || pathname.startsWith(`${href}/`);

							return (
								<li key={href}>
									<Link
										href={href}
										aria-current={active ? "page" : undefined}
										className={cn(
											"flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
											active
												? "bg-black/40 text-white"
												: "text-white/70 hover:bg-white/10 hover:text-white",
										)}
									>
										<MainNavIcon
											icon={icon}
											alt=""
											lightOnDark
											className={cn("size-2.5 shrink-0", !active && "opacity-40")}
										/>
										<span>{label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className="relative z-10 flex shrink-0">
					<MobileNavTrigger className="shrink-0 text-white hover:bg-white/10 hover:text-white" />
				</div>
			</div>
		</header>
	);
}
