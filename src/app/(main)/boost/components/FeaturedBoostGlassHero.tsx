"use client";

import { differenceInCalendarDays, isValid, parseISO } from "date-fns";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useMemo } from "react";
import cardFundingFallback from "@/assets/images/card_funding_web3.png";
import { FUNDING_DATA_MOCK } from "@/features/fundings/datas/funding_datas";
import { useGetFundingList } from "@/features/fundings/hooks/useGetFundingList";
import {
	EFundingBoostStatus,
	FundingListQueryClass,
	type FundingProjectClass,
} from "@/features/fundings/models/class/funding-list.class";
import "@/share/components/ui/customs/custom-sliders/custom-slider.css";
import {
	NextButton,
	PrevButton,
	usePrevNextButtons,
} from "@/share/components/ui/customs/custom-sliders/CustomSliderArrowButton";
import {
	DotButton,
	useDotButton,
} from "@/share/components/ui/customs/custom-sliders/CustomSliderDot";
import { cn } from "@/share/lib/utils";
import { BOOST_BRAND_TEAL } from "../constants";

const HERO_VIEWPORT_HEIGHT_CLASS = "h-[540px] min-h-[540px] max-h-[540px]";

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

type BoostHeroGlassSlideProps = {
	funding: FundingProjectClass;
	showFeaturedBadge: boolean;
	onJoinProject?: () => void;
};

function BoostHeroGlassSlide({
	funding,
	showFeaturedBadge,
	onJoinProject,
}: BoostHeroGlassSlideProps) {
	const pctRaw = (funding.raised_amount / Math.max(funding.target_amount, 1)) * 100;
	const pctFunded = Math.min(Math.round(pctRaw), 100);
	const bgUrl = funding.cover_image_url?.trim();
	const days = formatDaysLeft(funding.end_date);

	return (
		<div
			className={cn(
				"relative isolate flex w-full shrink-0 overflow-hidden px-5 sm:px-8",
				HERO_VIEWPORT_HEIGHT_CLASS,
			)}
		>
			<div className="pointer-events-none absolute inset-0">
				{bgUrl && /^https?:\/\//i.test(bgUrl) ? (
					<Image src={bgUrl} alt="" fill className="object-cover" unoptimized sizes="100vw" />
				) : (
					<Image
						src={cardFundingFallback}
						alt=""
						fill
						className="object-cover"
						priority
						sizes="100vw"
					/>
				)}
			</div>

			<div className="relative z-10 flex size-full min-h-0 flex-col items-center justify-end pb-12 sm:pb-[3.75rem]">
				<div className="relative w-full max-w-[295px] -translate-y-2 sm:-translate-y-3">
					<div
						className="flex h-[357px] min-h-[357px] max-h-[357px] shrink-0 flex-col overflow-hidden rounded-[26px] border border-white/10 p-[25px] shadow-[0_28px_64px_-12px_rgba(0,0,0,0.55)] backdrop-blur-2xl
						bg-[#0F172A66]"
					>
						{showFeaturedBadge ? (
							<span className="inline-flex shrink-0 rounded-full bg-[#00D1C1] px-3 py-1.5 text-[9px] font-semibold tracking-[1px] text-[#0F172A] uppercase w-fit">
								FEATURED
							</span>
						) : null}

						<p className="mt-3 line-clamp-3 text-[28px] font-bold leading-[40px] tracking-tight text-white sm:text-[1.85rem]">
							{funding.title}
						</p>
						<p className="line-clamp-2 text-[13px] leading-[22px] font-normal tracking-[1px] text-white/92">
							{subtitleForFunding(funding)}
						</p>

						<div className="mt-4 flex shrink-0 flex-wrap items-center justify-between gap-3">
							<span className="text-[16px] font-bold tabular-nums text-cus-progress italic">
								{pctFunded}% Funded
							</span>
							<span
								className="rounded-full bg-white/10 px-3.5 py-1 text-[12px] font-semibold text-white/70 "
								suppressHydrationWarning
							>
								{days.label}
							</span>
						</div>

						<div className="mt-[13px] h-2.5 w-full shrink-0 overflow-hidden rounded-full bg-black/45">
							<div
								className="h-full rounded-full transition-[width] duration-500 ease-out bg-[#00D1C1]"
								style={{
									width: `${pctFunded}%`,
								}}
							/>
						</div>

						<button
							type="button"
							disabled={days.ended}
							onClick={onJoinProject}
							className="mt-6 w-full shrink-0 h-[56px] bg-primary-button text-white text-[16px] font-semibold rounded-[16px] flex items-center justify-center"
							style={{ backgroundColor: BOOST_BRAND_TEAL }}
						>
							{days.ended ? "Funding closed" : "Join Project"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

const HERO_IN_PROGRESS_QUERY = (): FundingListQueryClass =>
	new FundingListQueryClass({
		status: EFundingBoostStatus.IN_PROGRESS,
		limit: 15,
		offset: 0,
		sort_by: "created_at",
	});

function resolveHeroSlides(
	success: boolean,
	projects: FundingProjectClass[] | undefined,
): FundingProjectClass[] {
	if (success && Array.isArray(projects)) {
		return projects;
	}
	const fromMock = FUNDING_DATA_MOCK.filter(p => p.status === EFundingBoostStatus.IN_PROGRESS);
	if (fromMock.length > 0) return fromMock;
	return FUNDING_DATA_MOCK.slice(0, Math.min(FUNDING_DATA_MOCK.length, 5));
}

function BoostInProgressCarousel({
	slides,
	showFeaturedBadge,
	onJoinProject,
	className,
}: {
	slides: FundingProjectClass[];
	showFeaturedBadge: boolean;
	onJoinProject?: () => void;
	className?: string;
}) {
	const emblaOptions = useMemo<EmblaOptionsType>(
		() => ({ loop: slides.length > 1, align: "start" }),
		[slides.length],
	);

	const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
		usePrevNextButtons(emblaApi);
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

	return (
		<div
			className={cn("embla w-full rounded-[28px] shadow-lg", className)}
			style={{ maxWidth: "100%" }}
		>
			<div className="embla__stage">
				<div
					className={cn(
						"embla__viewport overflow-hidden rounded-[28px]",
						HERO_VIEWPORT_HEIGHT_CLASS,
					)}
					ref={emblaRef}
				>
					<div className="embla__container">
						{slides.map(funding => (
							<div
								key={funding.id}
								className={cn("embla__slide min-w-0", HERO_VIEWPORT_HEIGHT_CLASS)}
							>
								<BoostHeroGlassSlide
									funding={funding}
									showFeaturedBadge={showFeaturedBadge}
									onJoinProject={onJoinProject}
								/>
							</div>
						))}
					</div>
				</div>

				{slides.length > 1 ? (
					<>
						<div className="embla__buttons">
							<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
							<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
						</div>
						<div className="embla__dots">
							{scrollSnaps.map((snap, index) => (
								<DotButton
									key={`${String(snap)}-${String(index)}`}
									onClick={() => {
										onDotButtonClick(index);
									}}
									className={`embla__dot${index === selectedIndex ? " embla__dot--selected" : ""}`}
								/>
							))}
						</div>
					</>
				) : null}
			</div>
		</div>
	);
}

export type FeaturedBoostGlassHeroProps = {
	showFeaturedBadge?: boolean;
	className?: string;
	onJoinProject?: () => void;
};

export function FeaturedBoostGlassHero({
	showFeaturedBadge = true,
	className,
	onJoinProject,
}: FeaturedBoostGlassHeroProps) {
	const heroListQuery = useMemo(() => HERO_IN_PROGRESS_QUERY(), []);

	const { data: resData, isPending } = useGetFundingList(heroListQuery);

	const slides = useMemo(
		() => resolveHeroSlides(resData?.success === true, resData?.data?.projects),
		[resData],
	);

	const carouselKey = slides.map(s => s.id).join("|");

	if (isPending) {
		return (
			<div
				className={cn(
					"w-full animate-pulse rounded-[28px] bg-neutral-800",
					HERO_VIEWPORT_HEIGHT_CLASS,
					className,
				)}
				aria-hidden
			/>
		);
	}

	if (slides.length === 0) {
		return (
			<div
				className={cn(
					"relative flex min-h-[320px] w-full items-center justify-center rounded-[28px] bg-neutral-900 px-6 text-center text-sm text-neutral-400",
					className,
				)}
			>
				No campaigns in progress.
			</div>
		);
	}

	return (
		<BoostInProgressCarousel
			key={carouselKey}
			slides={slides}
			showFeaturedBadge={showFeaturedBadge}
			onJoinProject={onJoinProject}
			className={className}
		/>
	);
}
