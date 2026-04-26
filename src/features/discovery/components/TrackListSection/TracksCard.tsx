"use client";

import Image from "next/image";
import { useState } from "react";
import trackCoverFallback from "@/assets/images/track-cover-fallback.png";
import { Button } from "@/share/components/ui/button";
import { getYoutubeThumbnailUrl } from "@/share/utils/youtube-thumbnail";
import type { TrackClass } from "../../models/class/track.class";

export type TracksCardProps = {
	track: TrackClass;
	onVote?: () => void;
};

export function TracksCard({ track, onVote }: TracksCardProps) {
	const fallbackThumbnailUrl = trackCoverFallback.src;
	const [thumbUrl, setThumbUrl] = useState(
		() => getYoutubeThumbnailUrl(track.youtubeUrl, fallbackThumbnailUrl) ?? fallbackThumbnailUrl,
	);

	const alt = `${track.trackTitle} — YouTube thumbnail`;
	return (
		<article className="flex gap-4 rounded-[1.25rem] bg-background-card p-3 shadow-sm sm:gap-5 sm:p-4 items-center">
			<div className="relative shrink-0  sm:h-16 sm:w-16">
				<Image
					src={thumbUrl}
					alt={alt}
					width={64}
					height={64}
					className="object-cover h-[64px] w-[64px] rounded-xl"
					unoptimized
					onError={_e => {
						setThumbUrl(fallbackThumbnailUrl);
					}}
				/>
			</div>

			<div className="flex min-w-0 flex-1 flex-col">
				<p className="font-sans text-[14px] font-bold tracking-tight text-dark-primary">
					{track.trackTitle}
				</p>
				<p className="font-sans text-[11px] text-dark-sub-primary">
					<span>by: {track.artistName}</span>
					<span className="mx-1.5 text-dark-sub-primary/80">•</span>
					<span>Challenge: {track.eventName}</span>
				</p>
				<div className="flex items-end justify-between gap-3 mt-2">
					<p className="font-sans text-[0.8125rem] font-bold text-dark-secondary sm:text-sm">
						Votes: {track.voteCount.toLocaleString()}
					</p>

					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							type="button"
							className=" text-[11px] shrink-0 rounded-[8px] bg-transparent border border-text-link text-text-link px-5 h-[25px] font-semibold"
						>
							View
						</Button>
						<Button
							type="button"
							onClick={onVote}
							className=" text-[11px] shrink-0 rounded-[8px] bg-secondary-button px-5 h-[25px] font-semibold text-white hover:bg-secondary-button/80 active:bg-secondary-button/90"
						>
							Vote
						</Button>
					</div>
				</div>
			</div>
		</article>
	);
}
