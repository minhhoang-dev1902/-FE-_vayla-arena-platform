"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import imgChallengeThumnail from "@/assets/images/challenge-thumnails.png";
import { FUNDING_DATA_MOCK } from "@/features/fundings/datas/funding_datas";
import { useGetFundingList } from "@/features/fundings/hooks/useGetFundingList";
import {
	FundingListQueryClass,
	type FundingProjectClass,
} from "@/features/fundings/models/class/funding-list.class";
import { Button } from "@/share/components/ui/button";
import { CustomEmpty } from "@/share/components/ui/customs/custom-fallback/CustomEmpty";
import { RevealMotion } from "@/share/components/ui/customs/custom-motion/RevealMotion";
import { CustomSkeletonSwapper } from "@/share/components/ui/customs/custom-skeleton/CustomSkeletonSwapper";
import { CustomScrollView } from "@/share/components/ui/customs/ScrollView";
import { BootsCard } from "./component/BootsCard";

export type BoostTabProps = {
	/** Share cùng instance với trang chủ / khu vực khác để React Query gộp request. */
	listQuery?: FundingListQueryClass;
};

export const BoostTab = ({ listQuery: listQueryProp }: BoostTabProps) => {
	const [fallbackQuery] = useState(() => new FundingListQueryClass({}));
	const listQuery = listQueryProp ?? fallbackQuery;

	const { data: resData, isPending } = useGetFundingList(listQuery);

	const fundingList: FundingProjectClass[] =
		resData?.data?.projects && resData.data.projects.length > 0
			? resData.data.projects
			: FUNDING_DATA_MOCK;

	const revealKey = isPending
		? "boost-pending"
		: `boost-list-${fundingList.map(f => f.id).join("|")}`;

	const showEmptyFallback =
		!isPending && resData?.success === true && (resData.data.projects?.length ?? 0) === 0;

	const listBody = (
		<>
			{isPending ? (
				<CustomSkeletonSwapper count={3} variant="card" />
			) : showEmptyFallback ? (
				<CustomEmpty
					title="No boosts yet"
					description="Funding projects will appear here when available."
					className="my-6 py-8"
				/>
			) : (
				<div className="flex flex-col gap-4 mt-[10px]">
					{fundingList.map(funding => (
						<BootsCard key={funding.id} funding={funding} />
					))}
				</div>
			)}
		</>
	);

	return (
		<div>
			<section
				aria-label="Create and earn"
				className="mt-[2rem] w-full rounded-xl bg-[#D7E5FC] p-6 shadow-lg shadow-black/5 sm:p-8"
			>
				<div className="flex flex-col gap-6">
					<div className="flex flex-row items-start gap-4 sm:gap-5">
						<div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0a0f14] sm:h-24 sm:w-24">
							<Image
								src={imgChallengeThumnail}
								alt=""
								width={120}
								height={120}
								className="h-[85%] w-[85%] object-contain"
							/>
						</div>
						<div className="min-w-0 flex-1">
							<p className="text-lg font-bold tracking-wide text-dark-primary uppercase sm:text-xl">
								WEB 3.0 Boost
							</p>
							<p className="mt-1.5 text-sm leading-relaxed text-dark-sub-primary sm:[0.875rem]">
								Create a synth-driven 16-bar loop that evokes a late-night city...
							</p>
						</div>
					</div>
					<Button className="w-full cursor-pointer rounded-[10px] bg-primary-button py-6 text-center text-base font-bold text-white transition-opacity hover:opacity-95 sm:text-lg">
						Go to Boost
					</Button>
				</div>
			</section>

			<div className="mt-10">
				<div className="flex items-center justify-between">
					<p className="text-lg font-bold text-black">Boost List</p>
					<p className="flex items-center text-text-link">
						View All <ChevronRight className="size-4" />
					</p>
				</div>

				<RevealMotion triggerKey={revealKey}>
					<CustomScrollView>{listBody}</CustomScrollView>
				</RevealMotion>
			</div>
		</div>
	);
};
