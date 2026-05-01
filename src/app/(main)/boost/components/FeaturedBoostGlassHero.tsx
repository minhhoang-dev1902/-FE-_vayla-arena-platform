"use client";

import { differenceInCalendarDays, isValid, parseISO } from "date-fns";
import Image from "next/image";
import cardFundingFallback from "@/assets/images/card_funding_web3.png";
import type { FundingProjectClass } from "@/features/fundings/models/class/funding-list.class";
import { cn } from "@/share/lib/utils";

const TEAL = "#00C4A7";

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
				"relative flex min-h-[min(520px,calc(100dvh-220px))] w-full flex-col justify-center overflow-hidden rounded-[28px] px-5 py-10 shadow-lg sm:px-8 sm:py-12",
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

			<div className="relative z-10 mx-auto w-full max-w-[440px]">
				<div
					className="rounded-[26px] border border-white/[0.22] px-7 py-8 shadow-[0_28px_64px_-12px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
					style={{ backgroundColor: "rgba(8,15,22,0.42)" }}
				>
					{showFeaturedBadge ? (
						<span
							className="inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em]"
							style={{ backgroundColor: TEAL, color: "#0d1b1b" }}
						>
							FEATURED
						</span>
					) : null}

					<h2 className="mt-6 text-[1.65rem] font-bold leading-tight tracking-tight text-white sm:text-[1.85rem]">
						{funding.title}
					</h2>
					<p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-white/92">
						{subtitleForFunding(funding)}
					</p>

					<div className="mt-8 flex flex-wrap items-center justify-between gap-3">
						<span className="text-[15px] font-bold tabular-nums" style={{ color: TEAL }}>
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
								backgroundColor: TEAL,
							}}
						/>
					</div>

					<button
						type="button"
						disabled={days.ended}
						onClick={onJoinProject}
						className="mt-10 w-full rounded-2xl py-4 text-[16px] font-bold text-[#08221c] transition-opacity hover:opacity-95 disabled:pointer-events-none disabled:opacity-40"
						style={{ backgroundColor: TEAL }}
					>
						{days.ended ? "Funding closed" : "Join Project"}
					</button>
				</div>
			</div>
		</div>
	);
}
