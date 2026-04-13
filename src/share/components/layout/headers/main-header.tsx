"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoWithText from "@/assets/images/logo-with-text.png";
import {
	appShellHeaderInnerClassName,
	appShellHeaderNavClassName,
	appShellHeaderOuterClassName,
} from "@/share/components/layout/app-shell-header-classes";
import { useAppShellNav } from "@/share/components/layout/app-shell-nav-context";
import { appMainNavItems, MainNavIcon } from "@/share/components/layout/nav/app-main-nav";
import { MobileNavTrigger } from "@/share/components/layout/nav/mobile-nav-trigger";
import { cn } from "@/share/lib/utils";

export function MainHeader() {
	const { close } = useAppShellNav();
	const pathname = usePathname();

	return (
		<header className={appShellHeaderOuterClassName}>
			<div className={appShellHeaderInnerClassName}>
				<Link
					href="/"
					className="relative z-10 min-w-0 shrink-0 text-lg font-semibold tracking-tight text-white"
					onClick={close}
				>
					<Image src={logoWithText} alt="Vayla Arena" width={100} height={100} />
				</Link>

				<nav className={appShellHeaderNavClassName} aria-label="Điều hướng chính">
					<ul className="flex items-center gap-0.5 rounded-full bg-white/10 p-1">
						{appMainNavItems.map(({ href, label, icon }) => {
							const active =
								href === "/"
									? pathname === "/"
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
