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
import { FeaturedBoostGlassHero } from "./components/FeaturedBoostGlassHero";

const _boostListScrollClass =
	"min-h-0 max-h-[min(560px,calc(100dvh-300px))] flex flex-col gap-4 mt-4";

export default function BoostPage() {
	const router = useRouter();
	const listQuery = useMemo(() => new FundingListQueryClass({}), []);

	const { data: resData, isPending } = useGetFundingList(listQuery);

	const fundingList: FundingProjectClass[] =
		resData?.data?.projects && resData.data.projects.length > 0
			? resData.data.projects
			: FUNDING_DATA_MOCK;

	const hero = fundingList[0] ?? FUNDING_DATA_MOCK[0];

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
				description="Boost campaigns & funding"
				onBtnBackClick={() => router.push(NAVIGATE.HOME)}
			/>

			<div className="container px-4 pb-10 pt-4">
				{isPending ? (
					<div
						className="min-h-[min(520px,calc(100dvh-220px))] w-full animate-pulse rounded-[28px] bg-muted"
						aria-hidden
					/>
				) : (
					<FeaturedBoostGlassHero funding={hero} onJoinProject={scrollToBoostList} />
				)}

				<div className="mt-10 scroll-mt-28" id="boost-list">
					<p className="text-lg font-bold text-dark-primary">Boost list</p>

					<RevealMotion triggerKey={revealKey}>
						<CustomScrollView>
							{isPending ? (
								<CustomSkeletonSwapper count={4} variant="card" />
							) : showEmptyFallback ? (
								<CustomEmpty
									title="No boosts yet"
									description="Funding projects will appear here when available."
									className="my-8 py-10"
								/>
							) : (
								fundingList.map(funding => <BootsCard key={funding.id} funding={funding} />)
							)}
						</CustomScrollView>
					</RevealMotion>
				</div>
			</div>
		</PageTransitionMotion>
	);
}
