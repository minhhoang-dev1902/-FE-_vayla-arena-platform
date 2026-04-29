import Image from "next/image";
import TrackSlideFallback from "@/assets/images/track-slide-fallback.png";
import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";
import { TrackClass } from "../../models/class/track.class";
export type TrackSlideProps = {
	track: TrackClass | null;
	className?: string;
};

function formatVoteCount(voteCount?: number) {
	if (!voteCount) return "0";
	return new Intl.NumberFormat("en-US").format(voteCount);
}

export function TrackSlide({ track, className }: TrackSlideProps) {
	const {
		trackTitle = "Minting Waves",
		artistName = "Artist Name",
		voteCount,
		eventName,
	} = track || {};
	const voteLabel = formatVoteCount(voteCount);

	return (
		<div className={cn("relative h-[540px] w-full overflow-hidden rounded-3xl", className)}>
			<Image src={TrackSlideFallback} alt={trackTitle} fill priority className="object-cover" />
			<div aria-hidden className="absolute inset-0 bg-black/35" />

			<div className="relative z-10 flex  flex-col px-6 mt-[55%]">
				<div className="rounded-[2rem] border border-white/30 bg-white/20 px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md">
					<p className="truncate text-4xl leading-none font-extrabold text-white">{trackTitle}</p>
					<p className="truncate text-[0.875rem] font-semibold text-white/95">{artistName}</p>
					<p className="mt-1 text-[12px] text-white/60">Challenge: {eventName}</p>

					{/* Progress bar */}
					<div className="mt-7 flex items-center gap-4">
						<div className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
							<div className="h-full w-[40%] rounded-full bg-secondary-button" />
						</div>
						{/* <span className="text-lg font-semibold text-white">00:08 / 0:20</span> */}
					</div>
				</div>

				<div className="flex items-end justify-between gap-3 mt-10">
					<div className="flex-1 flex flex-col items-start gap-1">
						<p className="text-[10px] font-semibold tracking-[0.14em] text-white/75 uppercase">
							Votes
						</p>
						<p className="text-3xl leading-none font-extrabold text-white">{voteLabel}</p>
					</div>

					<div className="flex items-center gap-3">
						<Button className="h-[46px] min-w-[90px] rounded-[12px] bg-primary-button text-[1rem] font-semibold text-white hover:bg-[#00c3b6]">
							Vote
						</Button>
						<Button
							variant="outline"
							className="h-[46px] min-w-[90px] rounded-[12px] border-white/40 bg-black/20 text-[1rem] font-semibold text-white hover:bg-black/35"
						>
							View
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
