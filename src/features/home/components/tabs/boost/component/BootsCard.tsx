"use client";

import { isValid, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import imgFundingThumbnailFallback from "@/assets/images/funding-thumnail-fallback.png";
import type { FundingProjectClass } from "@/features/fundings/models/class/funding-list.class";
import { CustomBadgeStatus } from "@/share/components/ui/customs/custom-badge/CustomBadgeStatus";
import { NAVIGATE } from "@/share/contants/navigate";
import { useCountdown } from "@/share/hooks/use-countdown";
import { formatCurrency } from "@/share/utils/number-utils";

function BootsCardCountdownLive({ end }: { end: Date }) {
	const parts = useCountdown(end);

	const endedAlready = end.getTime() <= Date.now();

	if (parts === null) {
		return (
			<span className="text-destructive tabular-nums" aria-busy="true">
				…
			</span>
		);
	}

	const tickingDone = parts.d + parts.h + parts.m + parts.s === 0;

	if (endedAlready || tickingDone) {
		return <span className="text-muted-foreground">Ended</span>;
	}

	const hh = String(parts.h).padStart(2, "0");
	const mm = String(parts.m).padStart(2, "0");
	const ss = String(parts.s).padStart(2, "0");

	return (
		<span
			className="text-destructive tabular-nums"
			suppressHydrationWarning
			role="timer"
			aria-live="polite"
		>
			{parts.d}d {hh}:{mm}:{ss}
		</span>
	);
}

function BootsCardCountdown({ endIso }: { endIso: string }) {
	const parsed = parseISO(endIso);
	if (!isValid(parsed)) {
		return <span className="text-muted-foreground">—</span>;
	}
	return <BootsCardCountdownLive end={parsed} />;
}

type BootsCardProps = {
	funding: FundingProjectClass;
};

export const BootsCard = ({ funding }: BootsCardProps) => {
	const progressRaw = (funding.raised_amount / Math.max(funding.target_amount, 1)) * 100;
	const progress = Math.min(Math.max(progressRaw, 0), 100);

	const cover = funding.cover_image_url?.trim();
	const isRemoteCover = Boolean(cover && /^https?:\/\//i.test(cover));

	return (
		<Link href={NAVIGATE.boostDetail(funding.id)} className="block h-full">
			<article className="flex h-full min-h-[350px] max-h-[452px] min-w-[342px] flex-col overflow-hidden rounded-[20px] border border-[#D6D9E0] bg-white shadow-[0_8px_28px_rgba(11,18,32,0.08)] transition-opacity hover:opacity-[0.97] active:opacity-95 md:max-w-[342px]">
				<div className="relative h-[192px] w-full shrink-0">
					<Image
						src={isRemoteCover ? (cover as string) : imgFundingThumbnailFallback}
						alt={funding.title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, 720px"
						unoptimized={isRemoteCover}
					/>
					<CustomBadgeStatus
						label="LIVE"
						className="absolute top-4 right-3 h-[19px] px-[10px] py-0"
					/>
				</div>

				<div className="flex min-h-0 flex-1 flex-col p-5">
					<p
						className="line-clamp-2 min-h-0 break-words text-lg font-bold leading-tight text-dark-primary"
						title={funding.title}
					>
						{funding.title}
					</p>

					<div className="mt-3 flex shrink-0 flex-col">
						<div className="flex items-center justify-between">
							<p className="text-[11px] font-semibold uppercase text-cus-muted">
								Goal: {formatCurrency(funding.target_amount)}
							</p>
							<p className="text-[11px] font-semibold uppercase text-cus-muted">Time left</p>
						</div>

						<div className="flex items-center justify-between mt-1">
							<p className="text-sm font-semibold text-secondary-button">
								Progress {Math.round(progress)}%
							</p>
							<p className="text-right text-sm font-semibold tabular-nums">
								<BootsCardCountdown endIso={funding.end_date} />
							</p>
						</div>
					</div>

					<div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#DFE3E9]">
						<div
							className={`h-full bg-cus-progress ${progress >= 100 ? "rounded-full" : "rounded-l-full"}`}
							style={{ width: `${progress}%` }}
						/>
					</div>
				</div>
			</article>
		</Link>
	);
};
