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

export function FundingSliders({ funding_data, className }: FundingSlidersProps) {
	const { end_date, title } = funding_data || {};
	const end = parseOptionalEndDate(end_date, DEFAULT_ENDS_AT);

	return (
		<div className={cn("relative h-full w-full overflow-hidden", className)}>
			<div
				aria-hidden
				className="absolute inset-0 scale-110 bg-cover bg-center blur-[5px]"
				style={{ backgroundImage: `url(${thumbnail.src})` }}
			/>
			<div aria-hidden className="absolute inset-0 bg-black/45" />

			<div className="relative flex h-full">
				<div className="flex flex-col items-center justify-start w-full gap-6 absolute top-30 left-0 right-0">
					<h1 className="text-center text-balance text-2xl font-semibold tracking-wide md:text-3xl text-white">
						{title}
					</h1>

					<CountdownPill end={end} />
				</div>

				<div className="flex justify-center absolute bottom-15 left-0 right-0">
					<Button className="px-12 py-7 text-lg font-semibold">Participate in Web3 Funding</Button>
				</div>
			</div>
		</div>
	);
}
