"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { TRACK_DATA_TEST } from "@/app/(common)/home/data_test";
import imgChallengeThumnail from "@/assets/images/challenge-thumnails.png";
import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";
import { TracksCard } from "./components/TracksCard";

type DiscoveryFilter = "trending" | "new" | "ending_soon";
const FILTERS: { id: DiscoveryFilter; label: string }[] = [
	{ id: "trending", label: "Trending" },
	{ id: "new", label: "New" },
	{ id: "ending_soon", label: "Ending Soon" },
];

export function DiscoveryTab() {
	const [filter, setFilter] = useState<DiscoveryFilter>("trending");

	const tracks = useMemo(() => {
		const list = [...TRACK_DATA_TEST];
		if (filter === "trending") {
			list.sort((a, b) => b.voteCount - a.voteCount);
		} else if (filter === "new") {
			list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
		}
		return list;
	}, [filter]);

	return (
		<div className="flex flex-col pb-8">
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

			<div className="mt-[3rem]">
				<div className="flex flex-wrap gap-2">
					{FILTERS.map(({ id, label }) => {
						const active = filter === id;
						return (
							<Button
								key={id}
								type="button"
								onClick={() => setFilter(id)}
								className={cn(
									"rounded-lg px-5 py-[10px]  text-sm font-bold transition-colors",
									active
										? "bg-secondary-button text-white shadow-sm"
										: "border border-border bg-card text-[#64748b] hover:text-foreground dark:text-muted-foreground",
								)}
							>
								{label}
							</Button>
						);
					})}
				</div>

				<div className="flex items-center justify-between mt-[1.25rem] mb-[2rem]">
					<p className="text-lg font-bold text-black">Discovery Track List</p>
					<p className="flex items-center text-text-link">
						View All <ChevronRight className="w-4 h-4" />
					</p>
				</div>

				<div className="flex flex-col gap-4">
					{tracks.map(track => (
						<TracksCard key={track.submissionId} track={track} />
					))}
				</div>
			</div>
		</div>
	);
}
