"use client";

import { differenceInCalendarDays, isValid, parseISO } from "date-fns";
import Image from "next/image";
import cardFundingFallback from "@/assets/images/card_funding_web3.png";
import type { FundingProjectClass } from "@/features/fundings/models/class/funding-list.class";
import { cn } from "@/share/lib/utils";
import { BOOST_BRAND_TEAL } from "../constants";

function formatDaysLeft(endIso: string): { label: string; ended: boolean } {
	const end = parseISO(endIso);
	if (!isValid(end)) return { label: "—", ended: false };
	const days = differenceInCalendarDays(end, new Date());
	if (days < 0) return { label: "Ended", ended: true };
	if (days === 0) return { label: "Last day", ended: false };
	return { label: `${days} days left`, ended: false };
}

function subtitleForFunding(funding: FundingProjectClass): string {
	if (funding.category?.trim()) {
		const label = funding.category.replace(/_/g, " ");
		return `Support this ${label} campaign on VAYLA.`;
	}
	return "The world's most exciting water dance music festival.";
}

export type FeaturedBoostGlassHeroProps = {
	funding: FundingProjectClass;
	showFeaturedBadge?: boolean;
	className?: string;
	onJoinProject?: () => void;
};

export function FeaturedBoostGlassHero({
	funding,
	showFeaturedBadge = true,
	className,
	onJoinProject,
}: FeaturedBoostGlassHeroProps) {
	const pctRaw = (funding.raised_amount / Math.max(funding.target_amount, 1)) * 100;
	const pctFunded = Math.min(Math.round(pctRaw), 100);

	const bgUrl = funding.cover_image_url?.trim();
	const days = formatDaysLeft(funding.end_date);

	return (
		<div
			className={cn(
				"relative flex min-h-[540px] w-full flex-col justify-center overflow-hidden rounded-[28px] px-5 py-10 shadow-lg sm:px-8 sm:py-12",
				className,
			)}
		>
			<div className="pointer-events-none absolute inset-0">
				{bgUrl && /^https?:\/\//i.test(bgUrl) ? (
					<Image src={bgUrl} alt="" fill className="object-cover" unoptimized />
				) : (
					<Image src={cardFundingFallback} alt="" fill className="object-cover" priority />
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
			</div>

			<div className="relative z-10 mx-auto w-full max-w-[295px]">
				<div
					className="rounded-[26px] border border-white/[0.22] p-[25px] shadow-[0_28px_64px_-12px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
					style={{ backgroundColor: "rgba(8,15,22,0.42)" }}
				>
					{showFeaturedBadge ? (
						<span className="inline-flex rounded-full px-3 py-1.5 text-[10px] text-[#0F172A] font-semibold uppercase tracking-[1px] bg-[#00D1C1]">
							FEATURED
						</span>
					) : null}

					<p className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-white sm:text-[1.85rem]">
						{funding.title}
					</p>
					<p className="mt-3 text-[13px] leading-[21px] text-white/92 tracking-[1px] font-normal">
						{subtitleForFunding(funding)}
					</p>

					{/* Progress */}
					<div className="mt-11 flex flex-wrap items-center justify-between gap-3">
						<span className="text-[16px] font-bold tabular-nums text-cus-progress italic">
							{pctFunded}% Funded
						</span>
						<span
							className="rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[12px] font-semibold text-white/95 backdrop-blur-sm"
							suppressHydrationWarning
						>
							{days.label}
						</span>
					</div>

					<div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-black/45">
						<div
							className="h-full rounded-full transition-[width] duration-500 ease-out"
							style={{
								width: `${pctFunded}%`,
								backgroundColor: BOOST_BRAND_TEAL,
							}}
						/>
					</div>

					<button
						type="button"
						disabled={days.ended}
						onClick={onJoinProject}
						className="mt-10 w-full rounded-2xl py-4 text-[16px] font-bold text-white transition-opacity hover:opacity-95 disabled:pointer-events-none disabled:opacity-40"
						style={{ backgroundColor: BOOST_BRAND_TEAL }}
					>
						{days.ended ? "Funding closed" : "Join Project"}
					</button>
				</div>
			</div>
		</div>
	);
}
