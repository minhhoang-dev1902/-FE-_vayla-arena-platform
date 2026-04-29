"use client";
import { TRACK_DATA_TEST } from "@/app/(common)/home/data_test";
import { ChallengeSlide } from "@/features/discovery/components/hero-sliders/ChallengeSlide";
import { TrackSlide } from "@/features/discovery/components/hero-sliders/TrackSlide";
import type { IChallenge } from "@/features/discovery/models/inteface/challenge.interface";
import type { ITrack } from "@/features/discovery/models/inteface/track.interface";
import { CustomSlider } from "@/share/components/ui";
import { Button } from "@/share/components/ui/button";
import { HightlightChallengeCard } from "./components/HightlightChallengeCard";
import { TopChallengesCard } from "./components/TopChallengesCard";
import { WhatIsDiscovery } from "./components/WhatIsDiscovery";
import { CHALLENGE_DATA_TEST } from "./data-test";
import { useEffect, useRef, useState } from "react";
import { useGetTracks } from "@/features/discovery/hooks/useGetTracks";
import { DiscoveryTrackListSection } from "@/features/discovery/components/TrackListSection/DiscoveryTrackListSection";
import {
	TrackClass,
	TracksSearchClass,
	type TTypeSearchTracks,
} from "@/features/discovery/models/class/track.class";
import { MainHeader } from "@/share/components/layout/headers/MainHeader";
import { DiscoverySearchClass } from "@/features/discovery/models/class/discovery-search.class";
import { useGetEventsLive } from "@/features/discovery/hooks/getEventLive";
import { DiscoveryClass } from "@/features/discovery/models/class/discovery.class";
import { PageTransitionMotion } from "@/share/components/ui/customs/custom-motion/PageTransitionMotion";

export default function DiscoveryPage() {
	const InitEventSearch = new DiscoverySearchClass({});
	const { data: resDataEvent } = useGetEventsLive(InitEventSearch);
	const challenge: DiscoveryClass = resDataEvent?.data?.[0] ?? CHALLENGE_DATA_TEST[0];

	const tracksFallBack: TrackClass[] = TRACK_DATA_TEST.map(track => new TrackClass(track));

	const [paramsSearch, setParamsSearch] = useState<TracksSearchClass>(
		new TracksSearchClass({ type: "hot" }),
	);

	const { data: resData, isPending } = useGetTracks(paramsSearch);
	const firstTrackRef = useRef<ITrack>(null);
	const tracks_data = resData?.data.tracks ?? tracksFallBack;


	useEffect(() => {
		const firstTrack = tracks_data?.[0];
		if (firstTrack) {
			firstTrackRef.current = firstTrack;
		}
	}, [resData?.data.tracks]);

	const trackForSlide = tracks_data?.[0] ?? firstTrackRef.current;

	const handleFilter = (filter: TTypeSearchTracks) => {
		setParamsSearch(new TracksSearchClass({ type: filter }));
	};


	return (
		<PageTransitionMotion>
			<MainHeader />
			<div className="container">

				<CustomSlider
					slides={[
						<ChallengeSlide key={1} challenge={challenge} />,
						<TrackSlide key={2} track={trackForSlide} />,
					]}
				/>

				<div className="mt-[40px]">
					<Button className="w-full cursor-pointer bg-primary-button  text[1rem] font-semibold rounded-xl h-[60px]">
						<p className="text-white">Submit Track</p>
					</Button>

					<div>
						<TopChallengesCard challenge={challenge} />
						<WhatIsDiscovery />
					</div>

					<HightlightChallengeCard challenge={challenge} />

					<DiscoveryTrackListSection
						activeFilter={paramsSearch.type}
						onFilterChange={handleFilter}
						tracks={tracks_data}
						// isPending={isPending}
						isPending={false}
					/>
				</div>
			</div>
		</PageTransitionMotion>
	);
}
