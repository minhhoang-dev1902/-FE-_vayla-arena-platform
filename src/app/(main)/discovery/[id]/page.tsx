"use client";
import { HeaderWithBackBtn } from "@/share/components/layout/headers/HeadeWithBackBtn";
import { HeroCard } from "./components/HeroCard";
import { SectionDescription } from "./components/SectionDescription";
import { useRouter } from "next/navigation";
import { NAVIGATE } from "@/share/contants/navigate";
import { useCallback } from "react";
import { useParams } from "next/navigation";
import { TrackSearchByEvent } from "@/features/discovery/models/class/track-search.class";
import { useGetTracksByEvent } from "@/features/discovery/hooks/useGetTracksByEvent";
import { TrackListFeature } from "@/features/discovery/components/track-list-feature/TrackListFeature";
import { PageTransitionMotion } from "@/share/components/ui/customs/custom-motion/PageTransitionMotion";

export default function ChallengeDetailPage() {
    const router = useRouter();
    const { id } = useParams();

    const initialPayload = new TrackSearchByEvent({
        eventId: id as string,
    });
    const { data: res_data } = useGetTracksByEvent(initialPayload);

    const tracks = res_data?.data.submissions ?? [];
    const handleBtnBackClick = useCallback(() => {
        router.push(NAVIGATE.DISCOVERY);
    }, [router]);

    return (
        <PageTransitionMotion>
            <HeaderWithBackBtn title="Challenge Detail" onBtnBackClick={handleBtnBackClick} />
            <div className="container mt-[1.5rem]">
                <HeroCard />
                <SectionDescription />
                <TrackListFeature tracks={tracks ?? []} />
            </div>
        </PageTransitionMotion>
    )
}