"use client";
import { useState } from "react";
import { TRACK_DATA_TEST } from "@/app/(common)/home/data_test";
import { ChallengeSlide } from "@/features/discovery/components/hero-sliders/ChallengeSlide";
import { TrackSlide } from "@/features/discovery/components/hero-sliders/TrackSlide";
import { DiscoveryTrackListSection } from "@/features/discovery/components/TrackListSection/DiscoveryTrackListSection";
import { useGetEvents } from "@/features/discovery/hooks/getEvents";
import { useGetTracks } from "@/features/discovery/hooks/useGetTracks";
import {
	EEventSearchType,
	EventSearchClass,
} from "@/features/discovery/models/class/event-search.class";
import {
	TrackClass,
	TracksSearchClass,
	type TTypeSearchTracks,
} from "@/features/discovery/models/class/track.class";
import type { IChallenge } from "@/features/discovery/models/inteface/challenge.interface";
import { MainHeader } from "@/share/components/layout/headers/MainHeader";
import { CustomSlider } from "@/share/components/ui";
import { Button } from "@/share/components/ui/button";
import { PageTransitionMotion } from "@/share/components/ui/customs/custom-motion/PageTransitionMotion";
import { HightlightChallengeCard } from "./components/HightlightChallengeCard";
import { TopChallengesCard } from "./components/TopChallengesCard";
import { WhatIsDiscovery } from "./components/WhatIsDiscovery";
import { CHALLENGE_DATA_TEST } from "./data-test";

type EventLike = {
	id?: string;
	name?: string;
	slug?: string;
	contentType?: string;
	thumbnailUrl?: string;
	startDate?: string;
	endDate?: string;
	vaylaPrizePool?: string;
	submissionCount?: number;
	totalVotes?: number;
};

function toChallenge(event: EventLike): IChallenge {
	return {
		eventId: event.id ?? "",
		name: event.name ?? "",
		slug: event.slug ?? "",
		contentType: event.contentType ?? "",
		description: "Join this challenge and submit your best track.",
		thumbnailUrl: event.thumbnailUrl ?? "",
		startDate: event.startDate ?? "",
		endDate: event.endDate ?? "",
		vaylaPrizePool: event.vaylaPrizePool ?? "0",
		submissionCount: event.submissionCount ?? 0,
		totalVotes: event.totalVotes ?? 0,
	};
}

export default function DiscoveryPage() {
	const initEventSearch = new EventSearchClass({
		typeEvent: EEventSearchType.LIVE,
	});
	const { data: resDataEvent } = useGetEvents(initEventSearch);
	const challenge = toChallenge(resDataEvent?.data?.events?.[0] ?? CHALLENGE_DATA_TEST[0] ?? {});

	const tracksFallBack: TrackClass[] = TRACK_DATA_TEST.map(track => new TrackClass(track));

	const [paramsSearch, setParamsSearch] = useState<TracksSearchClass>(
		new TracksSearchClass({ type: "hot" }),
	);

	const { data: resData, isPending } = useGetTracks(paramsSearch);
	const tracksData = resData?.data.tracks ?? tracksFallBack;
	const trackForSlide = tracksData[0] ?? null;

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
					<Button className="w-full cursor-pointer rounded-xl bg-primary-button text[1rem] h-[60px] font-semibold">
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
						tracks={tracksData}
						isPending={isPending}
					/>
				</div>
			</div>
		</PageTransitionMotion>
	);
}
