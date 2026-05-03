import { AppShellMobileNav } from "@/share/components/layout/app-shell-mobile-nav";
import { AppShellNavProvider } from "@/share/components/layout/app-shell-nav-context";
import { AppShellFooterNav } from "@/share/components/layout/nav/app-shell-footer-nav";
export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<AppShellNavProvider>
			<div className="relative flex min-h-dvh w-full flex-col">
				{/* pb-20 reserves space for the fixed footer nav — see LAYOUT.FOOTER_NAV_HEIGHT in src/constants/layout.ts */}
				<div className="relative mx-auto flex w-full max-w-screen-xl flex-1 flex-col pb-20 lg:pb-3">
					<main className="relative flex w-full flex-1 flex-col bg-background">{children}</main>
				</div>

				<AppShellFooterNav />
				<AppShellMobileNav />
			</div>
		</AppShellNavProvider>
	);
}
