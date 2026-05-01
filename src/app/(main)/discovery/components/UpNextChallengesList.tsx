"use client";

import { useGetEvents } from "@/features/discovery/hooks/getEvents";
import {
	EEventSearchType,
	EventSearchClass,
} from "@/features/discovery/models/class/event-search.class";
import type { IChallenge } from "@/features/discovery/models/inteface/challenge.interface";
import { RevealMotion } from "@/share/components/ui/customs/custom-motion/RevealMotion";
import { CustomScrollView } from "@/share/components/ui/customs/ScrollView";
import { UpNextChallengeCard } from "./UpNextChallengeCard";

const scrollAreaClass = "min-h-0 max-h-[min(420px,calc(100dvh-320px))] flex flex-col gap-4 mt-2";

export function UpNextChallengesList() {
	const payload = new EventSearchClass({ typeEvent: EEventSearchType.NONE });
	const { data: resData, isLoading } = useGetEvents(payload);
	const events = resData?.data?.events ?? [];

	if (isLoading) {
		return (
			<div className="mt-12">
				<p className="mt-8 text-lg font-semibold text-dark-primary">Up Next</p>
				<RevealMotion triggerKey="up-next-loading">
					<CustomScrollView className={scrollAreaClass}>
						{[0, 1].map(i => (
							<div key={i} className="h-[78px] animate-pulse rounded-[22px] bg-[#f1f4f6]" />
						))}
					</CustomScrollView>
				</RevealMotion>
			</div>
		);
	}

	if (events.length === 0) return null;

	return (
		<div className="mt-12">
			<p className="mt-8 text-lg font-semibold text-dark-primary">Up Next</p>
			<RevealMotion triggerKey={`up-next-${events.map(e => e.id).join("|")}`}>
				<CustomScrollView className={scrollAreaClass}>
					{events.map(event => {
						const challenge: IChallenge = {
							eventId: event.id,
							name: event.name,
							slug: event.slug,
							contentType: event.contentType,
							description: event.description,
							thumbnailUrl: event.thumbnailUrl,
							startDate: event.startDate,
							endDate: event.endDate,
							vaylaPrizePool: event.vaylaPrizePool,
							submissionCount: event.submissionCount,
							totalVotes: event.totalVotes,
						};
						return <UpNextChallengeCard key={event.id} challenge={challenge} />;
					})}
				</CustomScrollView>
			</RevealMotion>
		</div>
	);
}
