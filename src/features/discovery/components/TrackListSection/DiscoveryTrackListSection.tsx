"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/share/components/ui/button";
import { CustomEmpty } from "@/share/components/ui/customs/custom-fallback/CustomEmpty";
import { RevealMotion } from "@/share/components/ui/customs/custom-motion/RevealMotion";
import { CustomSkeletonSwapper } from "@/share/components/ui/customs/custom-skeleton/CustomSkeletonSwapper";
import { CustomScrollView } from "@/share/components/ui/customs/ScrollView";
import { cn } from "@/share/lib/utils";
import type {
	TrackClass,
	TTypeSearchTracks,
} from "../../models/class/track.class";
import { TracksCard } from "../TracksCard";

interface IDiscoveryTrackListSectionProps {
	wrapperClassName?: string;
	activeFilter: TTypeSearchTracks;
	onFilterChange: (filter: TTypeSearchTracks) => void;
	tracks?: TrackClass[];
	isPending?: boolean;
}
const FILTERS: { id: TTypeSearchTracks; label: string }[] = [
	{ id: "hot", label: "Hot" },
	{ id: "new", label: "New" },
	{ id: "ending-soon", label: "Ending Soon" },
];

export function DiscoveryTrackListSection({
	wrapperClassName,
	activeFilter,
	onFilterChange,
	tracks = [],
	isPending = false,
}: IDiscoveryTrackListSectionProps) {
	return (
		<div className={cn("mt-[3rem]", wrapperClassName)}>
			<div className="flex items-center justify-between mb-[1rem]">
				<p className="text-lg font-bold text-black">Discovery Track List</p>
				<p className="flex items-center text-text-link">
					View All <ChevronRight className="w-4 h-4" />
				</p>
			</div>

			<div className="flex flex-wrap gap-2 mb-[20px]">
				{FILTERS.map(({ id, label }) => {
					const active = activeFilter === id;
					return (
						<Button
							key={id}
							type="button"
							onClick={() => onFilterChange(id)}
							className={cn(
								"h-[42px] rounded-lg px-5 text-sm font-bold transition-colors",
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

			<RevealMotion triggerKey={tracks?.length}>
				<CustomScrollView className="flex flex-col gap-4">
					{isPending ? (
						<CustomSkeletonSwapper count={3} variant="card" />
					) : tracks.length > 0 ? (
						tracks.map(track => <TracksCard key={track.submissionId} track={track} />)
					) : (
						<CustomEmpty
							title="No Tracks Found"
							description="There are currently no tracks to display. Please check back later or try a different filter."
							className="my-10"
						/>
					)}
				</CustomScrollView>
			</RevealMotion>

			<Button
				variant="outline"
				className="h-15 w-full rounded-[15px] border-1 border-cus-muted-secondary bg-white text-[15px] font-semibold text-cus-muted-secondary mt-[29px]"
			>
				View All
			</Button>
		</div>
	);
}
