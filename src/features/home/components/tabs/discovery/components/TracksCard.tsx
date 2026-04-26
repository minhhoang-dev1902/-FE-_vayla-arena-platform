import Image from "next/image";
import type { ITrack } from "@/features/discovery/models/inteface/track.interface";
import { Button } from "@/share/components/ui/button";
import { getYoutubeThumbnailUrl } from "@/share/utils/youtube-thumbnail";

export type TracksCardProps = {
	track: ITrack;
	onVote?: () => void;
};

export function TracksCard({ track, onVote }: TracksCardProps) {
	const thumbUrl = getYoutubeThumbnailUrl(track.youtubeUrl);
	const alt = `${track.trackTitle} — YouTube thumbnail`;

	return (
		<article className="flex gap-4 rounded-[1.25rem] bg-background-card p-3 shadow-sm sm:gap-5 sm:p-4">
			<div className="relative h-[7.5rem] w-[7.5rem] shrink-0 overflow-hidden rounded-2xl sm:h-[8.5rem] sm:w-[8.5rem]">
				{thumbUrl ? (
					<Image
						src={thumbUrl}
						alt={alt}
						fill
						sizes="(max-width: 640px) 7.5rem, 8.5rem"
						className="object-cover"
						unoptimized
					/>
				) : null}
			</div>

			<div className="flex min-w-0 flex-1 flex-col">
				<p className="font-sans text-lg font-bold tracking-tight text-dark-primary sm:text-xl">
					{track.trackTitle}
				</p>
				<p className="mt-1 font-sans text-[0.8125rem] leading-snug text-dark-sub-primary sm:text-sm">
					<span>by: {track.artistName}</span>
					<span className="mx-1.5 text-dark-sub-primary/80">•</span>
					<span>Challenge: {track.eventName}</span>
				</p>
				<div className="mt-auto flex items-end justify-between gap-3 pt-3">
					<p className="font-sans text-[0.8125rem] font-bold text-dark-secondary sm:text-sm">
						Votes: {track.voteCount.toLocaleString()}
					</p>
					<Button
						type="button"
						onClick={onVote}
						className="shrink-0 rounded-lg bg-secondary-button px-5 py-2 font-semibold text-white hover:bg-secondary-button/80 active:bg-secondary-button/90"
					>
						Vote
					</Button>
				</div>
			</div>
		</article>
	);
}
