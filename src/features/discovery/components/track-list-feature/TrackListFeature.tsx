"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/share/components/ui/button";
import { CustomEmpty } from "@/share/components/ui/customs/custom-fallback/CustomEmpty";
import { RevealMotion } from "@/share/components/ui/customs/custom-motion/RevealMotion";
import { CustomScrollView } from "@/share/components/ui/customs/ScrollView";
import { NAVIGATE } from "@/share/contants/navigate";
import type { TrackClass } from "../../models/class/track.class";
import { TrackCardFeature } from "../TrackCardFeature";

interface ITrackListFeatureProps {
	tracks: TrackClass[];
}
export function TrackListFeature(props: ITrackListFeatureProps) {
	const { tracks } = props;
	const router = useRouter();
	return (
		<div>
			<div className="flex items-center justify-between mt-[40px] mb-[24px]">
				<p className="text-[20px] leading-[28;px] font-bold text-dark-primary">Featured Tracks</p>
				<p className="text-[14px] leading-[20px] text-secondary-button leading-[20px]">Trending</p>
			</div>
			<RevealMotion triggerKey={tracks?.length}>
				<CustomScrollView className="flex flex-col gap-4">
					{tracks.length > 0 ? (
						tracks.map(track => <TrackCardFeature key={track.submissionId} track={track} />)
					) : (
						<CustomEmpty
							title="No Tracks Found"
							description="There are currently no tracks to display. Please check back later or try a different filter."
							className="my-5"
						/>
					)}
				</CustomScrollView>
			</RevealMotion>

			<Button
				variant="ghost"
				className="mt-6 h-[68px] w-full rounded-full bg-linear-to-b from-[#006857] to-[#005B4C] text-180px] leading-[28px] font-semibold text-white shadow-[0_12px_24px_0_rgba(0,104,87,0.3)] hover:from-[#006857] hover:to-[#005B4C] hover:text-white"
				onClick={() => router.push(NAVIGATE.SUBMIT_TRACK)}
			>
				Join Challenge
			</Button>
		</div>
	);
}
