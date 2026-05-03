"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { FUNDING_DATA_MOCK } from "@/features/fundings/datas/funding_datas";
import { useGetFundingList } from "@/features/fundings/hooks/useGetFundingList";
import {
	FundingListQueryClass,
	type FundingProjectClass,
} from "@/features/fundings/models/class/funding-list.class";
import { BootsCard } from "@/features/home/components/tabs/boost/component/BootsCard";
import { HeaderWithBackBtn } from "@/share/components/layout/headers/HeadeWithBackBtn";
import { CustomEmpty } from "@/share/components/ui/customs/custom-fallback/CustomEmpty";
import { PageTransitionMotion } from "@/share/components/ui/customs/custom-motion/PageTransitionMotion";
import { RevealMotion } from "@/share/components/ui/customs/custom-motion/RevealMotion";
import { CustomSkeletonSwapper } from "@/share/components/ui/customs/custom-skeleton/CustomSkeletonSwapper";
import { CustomScrollView } from "@/share/components/ui/customs/ScrollView";
import { NAVIGATE } from "@/share/contants/navigate";
import { BoostCuratedFansSection } from "./components/BoostCuratedFansSection";
import { BoostHowFundingWorksSection } from "./components/BoostHowFundingWorksSection";
import { BoostPlatformIntroSection } from "./components/BoostPlatformIntroSection";
import { BoostWhyJoinSection } from "./components/BoostWhyJoinSection";
import { FeaturedBoostGlassHero } from "./components/FeaturedBoostGlassHero";

export default function BoostPage() {
	const router = useRouter();
	const listQuery = useMemo(() => new FundingListQueryClass({}), []);

	const { data: resData, isPending } = useGetFundingList(listQuery);

	const fundingList: FundingProjectClass[] =
		resData?.data?.projects && resData.data.projects.length > 0
			? resData.data.projects
			: FUNDING_DATA_MOCK;

	const showEmptyFallback =
		!isPending && resData?.success === true && (resData.data.projects?.length ?? 0) === 0;

	const revealKey = isPending
		? "boost-page-pending"
		: `boost-page-${fundingList.map(f => f.id).join("|")}`;

	const scrollToBoostList = useCallback(() => {
		document.getElementById("boost-list")?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}, []);

	return (
		<PageTransitionMotion>
			<HeaderWithBackBtn
				title="VAYLA Boost"
				// description="Boost campaigns & funding"
				onBtnBackClick={() => router.push(NAVIGATE.HOME)}
			/>

			<div className="bg-white container mt-5">
				<FeaturedBoostGlassHero onJoinProject={scrollToBoostList} />

				<BoostPlatformIntroSection />
				<BoostCuratedFansSection />
				<BoostWhyJoinSection />
				<BoostHowFundingWorksSection />

				<div className="mt-10 scroll-mt-28" id="boost-list">
					<p className="text-[20px] font-bold text-[#181C1E] leading-[36px]">Explore Projects</p>
					<RevealMotion triggerKey={revealKey} className=" rounded-[20px] overflow-hidden">
						<CustomScrollView fadeFromClassName="">
							{isPending ? (
								<CustomSkeletonSwapper count={4} variant="card" />
							) : showEmptyFallback ? (
								<CustomEmpty
									title="No boosts yet"
									description="Funding projects will appear here when available."
									className="my-8 border-white/25 bg-neutral-950/55 py-10 [&>p:first-of-type]:text-white [&>p:last-of-type]:text-neutral-400"
								/>
							) : (
								<div className="flex flex-col gap-5 max-w-2xl mx-auto w-full">
									{fundingList.map(funding => (
										<BootsCard key={funding.id} funding={funding} />
									))}
								</div>
							)}
						</CustomScrollView>
					</RevealMotion>
				</div>
			</div>
		</PageTransitionMotion>
	);
}
