"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserTabPanel } from "@/features/my-page/components/UserTabPanel";
import { HeaderWithBackBtn } from "@/share/components/layout/headers/HeadeWithBackBtn";
import { buttonVariants } from "@/share/components/ui/button";
import { PageTransitionMotion } from "@/share/components/ui/customs/custom-motion/PageTransitionMotion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/share/components/ui/tabs";
import { NAVIGATE } from "@/share/contants/navigate";
import { cn } from "@/share/lib/utils";

const TEAL = "#01A88E";

const myPageTabTriggerClass =
	"flex-1 rounded-full border-transparent bg-transparent py-5 shadow-none transition-all duration-200 data-active:bg-white data-active:font-bold data-active:text-[#0F172A] data-active:shadow-sm text-[#64748B] hover:text-[#0F172A]/80";

export default function MyPage() {
	const router = useRouter();

	return (
		<PageTransitionMotion className="min-h-dvh bg-white pb-6">
			<HeaderWithBackBtn title="My Page" onBtnBackClick={() => router.push(NAVIGATE.HOME)} />

			<div className="container px-4 pt-3">
				<div className="w-full">
					<Tabs defaultValue="user" className="w-full">
						<TabsList className="flex h-auto w-full gap-0 rounded-full bg-[#E5E7EB80] py-6">
							<TabsTrigger value="user" className={myPageTabTriggerClass}>
								<p className="text-[1rem] font-semibold">User</p>
							</TabsTrigger>
							<TabsTrigger value="creator" className={myPageTabTriggerClass}>
								<p className="text-[1rem] font-semibold">Creator</p>
							</TabsTrigger>
						</TabsList>

						<div>
							<TabsContent value="user" className="mt-6 space-y-6">
								<UserTabPanel />
							</TabsContent>
							<TabsContent value="creator" className="mt-6 space-y-6">
								<section className="rounded-2xl border border-[#F1F5F9] bg-[#FAFAFA] px-5 py-8 text-center shadow-sm">
									<h2 className="text-[18px] font-bold text-[#0F172A]">Creator</h2>
									<p className="mt-2 text-[13px] leading-relaxed text-[#64748B]">
										Đăng bài, Boost và các công cụ dành cho creator sẽ hiển thị tại đây.
									</p>
									<div className="mt-6 flex justify-center gap-3">
										<Link
											href={NAVIGATE.MY_SUBMISSIONS}
											className={cn(
												buttonVariants({ variant: "outline" }),
												"rounded-xl border-[#E2E8F0]",
											)}
										>
											My submissions
										</Link>
										<Link
											href={NAVIGATE.SUBMIT_TRACK}
											className={cn(
												buttonVariants({ variant: "default" }),
												"rounded-xl border-transparent text-white",
											)}
											style={{ backgroundColor: TEAL }}
										>
											Submit track
										</Link>
									</div>
								</section>
							</TabsContent>
						</div>
					</Tabs>
				</div>
			</div>
		</PageTransitionMotion>
	);
}
