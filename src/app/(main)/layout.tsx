import { AppShellMobileNav } from "@/share/components/layout/app-shell-mobile-nav";
import { AppShellNavProvider } from "@/share/components/layout/app-shell-nav-context";
import { MainHeader } from "@/share/components/layout/headers/MainHeader";
import { AppShellFooterNav } from "@/share/components/layout/nav/app-shell-footer-nav";
export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<AppShellNavProvider>
			<div className="relative flex min-h-dvh w-full flex-col">
				<div className="relative mx-auto flex w-full max-w-(--app-view-max-width,80rem) flex-1 flex-col pb-20 lg:px-4 lg:pb-3">
					<main className="relative flex w-full flex-1 flex-col bg-background">{children}</main>
				</div>

				<AppShellFooterNav />
				<AppShellMobileNav />
			</div>
		</AppShellNavProvider>
	);
}
