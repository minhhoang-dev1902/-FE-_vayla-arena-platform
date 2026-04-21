import Image from "next/image";

import heroIcon from "@/assets/images/vayla-token-slider.png";
import { cn } from "@/share/lib/utils";

const _accent = "#4FD1C5";

export type VoteOnTrendsSlidersProps = {
	className?: string;
};

export function VoteOnTrendsSliders({ className }: VoteOnTrendsSlidersProps) {
	return (
		<div
			className={cn(
				"relative flex h-full w-full flex-col overflow-hidden bg-black px-6 pb-20",
				className,
			)}
		>
			<div className="flex flex-1 flex-col items-center justify-center gap-3 mt-10">
				<div className="relative size-40 shrink-0 md:size-32">
					<Image fill alt="" priority sizes="10rem" src={heroIcon} />
				</div>

				<div className="flex flex-col items-center gap-3 text-center">
					<p className="text-balance text-[36px] font-bold leading-tight tracking-tight text-white">
						The Protocol for
						<span className="font-bold text-accent-secondary drop-shadow-md italic">
							Borderless
						</span>{" "}
						Fandom
					</p>
					<p className="text-balance font-normal text-text-subtle text-[0.875rem]">
						Fund Music. Vote on Trends. Earn Rewards.
					</p>
				</div>

				<div
					className={cn(
						"flex w-full max-w-md items-stretch justify-between gap-2 rounded-3xl border border-white/20",
						"bg-white/15 backdrop-blur-md py-4 max-w-[300px] mt-8",
					)}
				>
					<div className="flex min-w-0 flex-1 flex-col items-center gap-0.5 text-center">
						<span className="text-[0.8rem] font-medium uppercase tracking-wide text-white/80 md:text-xs mb-2">
							User
						</span>
						<div className="text-xl font-bold tabular-nums text-white md:text-xl">
							12<span className="text-xs font-normal">K</span>
						</div>
					</div>
					<div className="flex min-w-0 flex-1 flex-col items-center gap-0.5 text-center">
						<span className="text-[0.8rem] font-medium uppercase tracking-wide text-white/80 md:text-xs mb-2">
							Funding
						</span>
						<div className="text-xl font-bold tabular-nums text-white md:text-xl">
							<span className="inline-flex flex-wrap items-baseline justify-center gap-1">
								<span>
									29<span className="text-xs font-normal">M</span>
								</span>
							</span>
						</div>
					</div>
					<div className="flex min-w-0 flex-1 flex-col items-center gap-0.5 text-center">
						<span className="text-[0.8rem] font-medium uppercase tracking-wide text-white/80 md:text-xs mb-2">
							Vote
						</span>
						<div className="text-xl font-bold tabular-nums text-white md:text-xl">
							43<span className="text-xs font-normal">K</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
