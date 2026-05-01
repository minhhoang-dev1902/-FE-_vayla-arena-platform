"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import plusIcon from "@/assets/icons/plus-icon.svg";
import { useGetMySubmissions } from "@/features/discovery/hooks/useGetMySubmissions";
import { TrackStatusEnum } from "@/features/discovery/models/class/track.class";
import { MySubmissionsSearchClass } from "@/features/discovery/models/class/track-search.class";
import { Button } from "@/share/components/ui/button";
import { RevealMotion } from "@/share/components/ui/customs/custom-motion/RevealMotion";
import { CustomScrollView } from "@/share/components/ui/customs/ScrollView";
import { NAVIGATE } from "@/share/contants/navigate";
import { SubmissionCard } from "./(components)/SubmissionCard";

export default function MySubmissionPage() {
	const router = useRouter();
	const _handleBtnBackClick = useCallback(() => {
		router.push(NAVIGATE.DISCOVERY);
	}, [router]);

	const initialPayload = new MySubmissionsSearchClass({
		status: TrackStatusEnum.NONE,
	});
	const { data: res_data } = useGetMySubmissions(initialPayload);
	const submissions = res_data?.data?.submissions ?? [];

	return (
		<main className="bg-white ">
			<div className="container flex w-full max-w-[420px] flex-col gap-4 ">
				<Button className="flex items-center gap-2 bg-primary-button rounded-[16px] max-w-[340px] w-full mx-auto h-[60px] mt-[30px] mb-10">
					<Image src={plusIcon.src} alt="Plus" width={20} height={20} />
					<span className="text-[16px] font-semibold leading-[21px] text-white">
						Submit New Track
					</span>
				</Button>

				<RevealMotion>
					<CustomScrollView className="flex flex-col gap-4 min-h-[600px]">
						{submissions?.map(item => (
							<SubmissionCard
								key={item.submissionId}
								data={item}
								onViewDetails={() => router.push(`${NAVIGATE.MY_SUBMISSIONS}/${item.submissionId}`)}
								onResubmit={() => router.push(NAVIGATE.SUBMIT_TRACK)}
							/>
						))}
					</CustomScrollView>
				</RevealMotion>
			</div>
		</main>
	);
}
