"use client";

import imgChallengeThumnail from "@/assets/images/challenge-slide-thumnail-fallback.png";
import { CountdownPill } from "@/share/components/countdown/countdown-pill";
import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";
import { parseOptionalEndDate } from "@/share/utils/countdown";
import type { IChallenge } from "../../models/inteface/challenge.interface";

const DEFAULT_ENDS_AT = "2026-05-01T15:00:00+09:00";

export type ChallengeSlideProps = {
	challenge: IChallenge;
	className?: string;
};

export function ChallengeSlide({ challenge, className }: ChallengeSlideProps) {
	const { name, endDate, description } = challenge || {};
	const end = parseOptionalEndDate(endDate, DEFAULT_ENDS_AT);
	const backgroundImage = imgChallengeThumnail.src;
	const detailLines = description
		? description
				.split("\n")
				.map(line => line.trim())
				.filter(Boolean)
		: [];

	return (
		<div
			className={cn(
				"relative h-full w-full overflow-hidden px-6 py-6 sm:px-6  rounded-3xl   ",
				className,
			)}
		>
			<div
				aria-hidden
				style={{ backgroundImage: `url(${backgroundImage})` }}
				className="absolute inset-0 scale-110 bg-cover bg-center blur-[6px]"
			/>
			<div aria-hidden className="absolute inset-0 bg-[#020617]/55" />

			<div className="relative h-full">
				<span className="mt-2 rounded-full bg-point-2 px-3 py-2 text-[10px] font-semibold tracking-[0.12em] text-white uppercase ">
					This Month Discovery
				</span>

				<p className="mt-6 text-white px-2 text-left text-[2rem] leading-none font-bold tracking-tight text-white sm:text-5xl">
					{name}
				</p>

				<div className="w-full flex justify-center mt-11">
					<CountdownPill
						end={end}
						className="mx-auto bg-[transparent] border-none shadow-none backdrop-blur-none backdrop-saturate-none px-7 py-4"
					/>
				</div>

				<div className="mt-6 w-full rounded-3xl border border-white/30 bg-white/12 py-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md ">
					<ul className="px-6">
						{detailLines.map(item => (
							<li key={item} className="list-disc marker:text-white/90">
								{item}
							</li>
						))}
					</ul>
				</div>

				<div className="mt-8 flex w-full max-w-[32rem] flex-col gap-4">
					<Button className="h-[40px] w-full rounded-2xl bg-primary-button text-[1rem] font-semibold text-white hover:bg-[#13b4a4]">
						Join Challenge
					</Button>
					<Button className="h-[40px] w-full rounded-2xl bg-third-button text-[1rem] font-semibold text-dark-primary hover:bg-[#b5e8e1]">
						Start Listening
					</Button>
				</div>
			</div>
		</div>
	);
}
