import Image from "next/image";

import heroIcon from "@/assets/images/vayla-token-slider.png";
import { cn } from "@/share/lib/utils";

const accent = "#4FD1C5";

export type VoteOnTrendsSlidersProps = {
	className?: string;
};

export function VoteOnTrendsSliders({ className }: VoteOnTrendsSlidersProps) {
	return (
		<div className={cn("relative flex h-full w-full flex-col overflow-hidden bg-black", className)}>
			<div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-6 pt-10">
				<div className="relative size-30 shrink-0 md:size-32">
					<Image fill alt="" priority sizes="128px" src={heroIcon} />
				</div>

				<div className="flex max-w-md flex-col items-center gap-3 text-center">
					<h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
						The Protocol for{" "}
						<span
							className="font-bold"
							style={{
								color: accent,
								textShadow: "0 0 24px rgba(79, 209, 197, 0.45)",
							}}
						>
							Borderless
						</span>{" "}
						Fandom
					</h1>
					<p className="text-balance text-sm font-normal text-white/90 md:text-base">
						Fund Music. Vote on Trends. Earn Rewards.
					</p>
				</div>

				<div
					className={cn(
						"flex w-full max-w-md items-stretch justify-between gap-2 rounded-xl border border-white/20",
						"bg-white/6 px-4 py-3 backdrop-blur-md md:px-6 md:py-4",
					)}
				>
					<div className="flex min-w-0 flex-1 flex-col items-center gap-0.5 text-center">
						<span className="text-[0.65rem] font-medium uppercase tracking-wide text-white/80 md:text-xs">
							User
						</span>
						<div className="text-lg font-bold tabular-nums text-white md:text-xl">12K</div>
					</div>
					<div className="flex min-w-0 flex-1 flex-col items-center gap-0.5 text-center">
						<span className="text-[0.65rem] font-medium uppercase tracking-wide text-white/80 md:text-xs">
							Funding
						</span>
						<div className="text-lg font-bold tabular-nums text-white md:text-xl">
							<span className="inline-flex flex-wrap items-baseline justify-center gap-1">
								<span>29M</span>
								<span className="text-xs font-medium text-white/80 md:text-sm">USDT</span>
							</span>
						</div>
					</div>
					<div className="flex min-w-0 flex-1 flex-col items-center gap-0.5 text-center">
						<span className="text-[0.65rem] font-medium uppercase tracking-wide text-white/80 md:text-xs">
							Vote
						</span>
						<div className="text-lg font-bold tabular-nums text-white md:text-xl">43K</div>
					</div>
				</div>
			</div>
		</div>
	);
}
