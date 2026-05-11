import { CONTENT_HEIGHT } from "@/constants/layout";
import { AppShellMobileNav } from "@/share/components/layout/app-shell-mobile-nav";
import { AppShellNavProvider } from "@/share/components/layout/app-shell-nav-context";
import { CommonHeaderV2 } from "@/share/components/layout/headers/CommonHeaderV2";
import { AppShellFooterNav } from "@/share/components/layout/nav/app-shell-footer-nav";

export default function CommonLayout({ children }: { children: React.ReactNode }) {
	return (
		<AppShellNavProvider>
			<div className="relative flex min-h-dvh w-full flex-col">
				<CommonHeaderV2 />

				<div className="relative mx-auto flex w-full max-w-screen-xl flex-1 flex-col">
					<main
						id="common-layout-main-scroll"
						className="relative flex w-full flex-col bg-background lg:flex-1"
						style={{ height: CONTENT_HEIGHT, overflowY: "auto" }}
					>
						{children}
					</main>
				</div>

				<AppShellFooterNav />
				<AppShellMobileNav />
			</div>
		</AppShellNavProvider>
	);
}
