"use client";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { TrackListFeature } from "@/features/discovery/components/track-list-feature/TrackListFeature";
import { useGetEventDetail } from "@/features/discovery/hooks/useGetEventDetail";
import { useGetTracksByEvent } from "@/features/discovery/hooks/useGetTracksByEvent";
import { TrackSearchByEvent } from "@/features/discovery/models/class/track-search.class";
import { HeaderWithBackBtn } from "@/share/components/layout/headers/HeadeWithBackBtn";
import { PageTransitionMotion } from "@/share/components/ui/customs/custom-motion/PageTransitionMotion";
import { NAVIGATE } from "@/share/contants/navigate";
import { HeroCard } from "./components/HeroCard";
import { SectionDescription } from "./components/SectionDescription";

export default function ChallengeDetailPage() {
	const router = useRouter();
	const { id } = useParams();

	const initialPayload = new TrackSearchByEvent({
		eventId: id as string,
	});
	const { data: res_data } = useGetTracksByEvent(initialPayload);
	const { data: event_data } = useGetEventDetail(id as string);

	const tracks = res_data?.data.submissions ?? [];
	const event_detail = event_data?.data;

	const handleBtnBackClick = useCallback(() => {
		router.push(NAVIGATE.DISCOVERY);
	}, [router]);

	return (
		<PageTransitionMotion>
			<HeaderWithBackBtn title="Challenge Detail" onBtnBackClick={handleBtnBackClick} />
			<div className="container mt-[1.5rem]">
				<HeroCard event_detail={event_detail} />
				<SectionDescription />
				<TrackListFeature tracks={tracks ?? []} />
			</div>
		</PageTransitionMotion>
	);
}
