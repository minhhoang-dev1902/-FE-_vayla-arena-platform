"use client";

import Image from "next/image";
import { useState } from "react";
import { TRACK_DATA_TEST } from "@/app/(common)/home/data_test";
import imgChallengeThumnail from "@/assets/images/challenge-thumnails.png";
import { DiscoveryTrackListSection } from "@/features/discovery/components/TrackListSection/DiscoveryTrackListSection";
import { useGetTracks } from "@/features/discovery/hooks/useGetTracks";
import {
	TrackClass,
	TracksSearchClass,
	type TTypeSearchTracks,
} from "@/features/discovery/models/class/track.class";
import { Button } from "@/share/components/ui/button";

export function DiscoveryTab() {
	const tracksFallBack: TrackClass[] = TRACK_DATA_TEST.map(track => new TrackClass(track));

	const [paramsSearch, setParamsSearch] = useState<TracksSearchClass>(
		new TracksSearchClass({ type: "hot" }),
	);

	const { data: resData } = useGetTracks(paramsSearch);

	const handleFilter = (filter: TTypeSearchTracks) => {
		setParamsSearch(new TracksSearchClass({ type: filter }));
	};
	const tracks_data = resData?.data.tracks ?? tracksFallBack;

	return (
		<div className="flex flex-col ">
			<section
				aria-label="Create and earn"
				className="w-full rounded-xl bg-[#D6EEEB] p-6 sm:p-8 shadow-lg shadow-black/5 mt-[2rem]"
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
								Create - Earn
							</p>
							<p className="mt-1.5 text-sm leading-relaxed text-dark-sub-primary sm:[0.875rem]">
								Create a synth-driven 16-bar loop that evokes a late-night city…
							</p>
						</div>
					</div>
					<Button className="w-full cursor-pointer rounded-[10px] bg-primary-button py-6 text-center text-base font-bold text-white transition-opacity hover:opacity-95 sm:text-lg">
						Go to Discovery
					</Button>
				</div>
			</section>

			<DiscoveryTrackListSection
				activeFilter={paramsSearch.type}
				onFilterChange={handleFilter}
				tracks={tracks_data}
				// isPending={isPending}
				isPending={false}
				wrapperClassName="mt-10"
			/>
		</div>
	);
}
