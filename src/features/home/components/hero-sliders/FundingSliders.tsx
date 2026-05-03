"use client";

import Link from "next/link";
import thumbnail from "@/assets/images/card_funding_web3.png";
// import type { TFunding } from "@/features/fundings/models/type/funding.type";
import { CountdownPill } from "@/share/components/countdown/countdown-pill";
import { buttonVariants } from "@/share/components/ui/button";
import { NAVIGATE } from "@/share/contants/navigate";
import { cn } from "@/share/lib/utils";
import { parseOptionalEndDate } from "@/share/utils/countdown";

const DEFAULT_ENDS_AT = "2026-05-01T15:00:00+09:00";

export type FundingSlidersProps = {
	className?: string;
	funding_data?: {
		title: string;
		end_date: string;
	};
	/** Ẩn nút sang trang Boost (khi đã ở `/boost`). */
	hideParticipateCta?: boolean;
	/** Đích khi bấm nút. Mặc định `/boost`. */
	participateHref?: string;
};

export function FundingSliders({
	className,
	funding_data,
	hideParticipateCta,
	participateHref = NAVIGATE.BOOST,
}: FundingSlidersProps) {
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
					{!hideParticipateCta ? (
						<Link
							href={participateHref}
							className={cn(
								buttonVariants({ variant: "default", size: "lg" }),
								"rounded-2xl px-12 py-7 text-[1rem] font-semibold md:max-w-[340px] min-w-[340px]",
							)}
						>
							Participate in
							<span className="">VAYLA Boost</span>
						</Link>
					) : null}
				</div>
			</div>
		</div>
	);
}
