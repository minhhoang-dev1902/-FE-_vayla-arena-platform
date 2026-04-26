"use client";

import { ChevronRight } from "lucide-react";
import type { ITrack } from "@/features/discovery/models/inteface/track.interface";
import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";
import { TracksCard } from "./TracksCard";

export type DiscoveryFilter = "trending" | "new" | "ending-soon";

const FILTERS: { id: DiscoveryFilter; label: string }[] = [
	{ id: "trending", label: "Trending" },
	{ id: "new", label: "New" },
	{ id: "ending-soon", label: "Ending Soon" },
];

type DiscoveryTrackListSectionProps = {
	filter: DiscoveryFilter;
	onFilterChange: (filter: DiscoveryFilter) => void;
	tracks: ITrack[];
};

export function DiscoveryTrackListSection({
	filter,
	onFilterChange,
	tracks,
}: DiscoveryTrackListSectionProps) {
	return (
		<div className="mt-[3rem]">
			<div className="flex flex-wrap gap-2">
				{FILTERS.map(({ id, label }) => {
					const active = filter === id;
					return (
						<Button
							key={id}
							type="button"
							onClick={() => onFilterChange(id)}
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
	);
}
