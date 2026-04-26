"use client";

import Image from "next/image";
import imgChallengeThumnail from "@/assets/images/challenge-thumnails.png";
import { DiscoveryTrackListSection } from "@/features/discovery";
import { Button } from "@/share/components/ui/button";

export function DiscoveryTab() {
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

			<DiscoveryTrackListSection wrapperClassName="mt-10" />
		</div>
	);
}
