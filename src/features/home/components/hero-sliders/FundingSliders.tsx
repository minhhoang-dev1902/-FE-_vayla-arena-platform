"use client";

import thumbnail from "@/assets/images/card_funding_web3.png";
import type { TFunding } from "@/features/fundings/models/type/funding.type";
import { CountdownPill } from "@/share/components/countdown/countdown-pill";
import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";
import { parseOptionalEndDate } from "@/share/utils/countdown";

const DEFAULT_ENDS_AT = "2026-05-01T15:00:00+09:00";

export type FundingSlidersProps = {
	className?: string;
	funding_data?: TFunding;
};

export function FundingSliders({ className, funding_data }: FundingSlidersProps) {
	const { title, end_date } = funding_data || {};
	const end = parseOptionalEndDate(end_date, DEFAULT_ENDS_AT);

	return (
		<div className={cn("relative h-full w-full overflow-hidden px-6", className)}>
			<div
				aria-hidden
				style={{ backgroundImage: `url(${thumbnail.src})` }}
				className="absolute inset-0 scale-110 bg-cover bg-center blur-[5px]"
			/>
			<div aria-hidden className="absolute inset-0 bg-black/45" />

			<div className="relative flex h-full">
				<div className="flex flex-col items-center justify-start w-full gap-6 absolute top-30 left-0 right-0">
					<p className="text-center text-balance text-3xl font-semibold tracking-wide md:text-3xl text-white">
						{title}
					</p>
					<CountdownPill end={end} />
				</div>

				<div className="flex justify-center absolute bottom-15 left-0 right-0">
					<Button className="px-12 py-7 text-[1rem] font-semibold rounded-2xl ">
						Participate in
						<span className="">VAYLA Boost</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
