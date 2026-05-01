"use client";

import Image from "next/image";
import hourGlassIcon from "@/assets/icons/hourglass-icon.svg";
import rejectedIcon from "@/assets/icons/reject-icon.svg";
import imgTrackThumbnailFallback from "@/assets/images/track-cover-fallback.png";
import type { TrackClass } from "@/features/discovery/models/class/track.class";
import { Button } from "@/share/components/ui/button";
import { CustomImage } from "@/share/components/ui/customs/custom-image/CustomImage";
import { getYoutubeThumbnailUrl } from "@/share/utils/youtube-thumbnail";

interface SubmissionCardProps {
	data: TrackClass;
	onViewDetails?: () => void;
	onResubmit?: () => void;
}

// ─── Status config ───────────────────────────────────────────────────────────

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
	approved: {
		label: "APPROVED",
		className: "bg-[#E7FDFD] text-text-link",
	},
	pending: {
		label: "PENDING",
		className: "bg-[#FEF9C3] text-[#A16207]",
	},
	rejected: {
		label: "REJECTED",
		className: "bg-[#FEE2E2] text-[#DC2626]",
	},
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
	const diff = Date.now() - new Date(dateStr).getTime();
	const mins = Math.floor(diff / 60_000);
	if (mins < 1) return "just now";
	if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
	const hrs = Math.floor(mins / 60);
	if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
	const days = Math.floor(hrs / 24);
	return `${days} day${days > 1 ? "s" : ""} ago`;
}

function formatShortDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
}

function getSubtitle(status: string, createdAt: string): string {
	switch (status.toLowerCase()) {
		case "approved":
			return `Uploaded ${timeAgo(createdAt)}`;
		case "pending":
			return "Under Review";
		case "rejected":
			return `Rejected on ${formatShortDate(createdAt)}`;
		default:
			return `Uploaded ${timeAgo(createdAt)}`;
	}
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ApprovedContent({ voteCount, rank }: { voteCount: number; rank?: number }) {
	const formattedVotes = new Intl.NumberFormat("en-US").format(voteCount ?? 0);
	return (
		<div className="mt-[10px] grid grid-cols-2 gap-3">
			<div className="rounded-[12px] bg-[#F8FAFC] px-[14px] py-[10px]">
				<p className="text-[10px] font-bold uppercase tracking-[0.12em] text-cus-muted-secondary">
					Votes
				</p>
				<p className="text-[18px] font-bold leading-[28px] text-[#0F172A]">{formattedVotes}</p>
			</div>
			<div className="rounded-[12px] bg-[#F8FAFC] px-4 py-3">
				<p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#787F89] leading-[15px]">
					Rank
				</p>
				<p className="text-[18px] font-bold leading-[28px] text-text-link">
					{rank ? `#${rank}` : "—"}
				</p>
			</div>
		</div>
	);
}

function PendingContent() {
	return (
		<div className="mt-4 flex items-start gap-3 rounded-[14px] bg-[#FFFEF9] px-4 py-3">
			<Image src={hourGlassIcon.src} alt="Hourglass" width={18} height={16} />
			<p className="text-[13px] leading-[20px] text-[#B45309]">
				Moderators are checking your track for community guidelines.
			</p>
		</div>
	);
}

function RejectedContent({ reason }: { reason?: string }) {
	return (
		<div className="mt-4 rounded-[14px] bg-[#FFF8F9] px-4 py-3 flex items-start gap-[10px]">
			<Image src={rejectedIcon.src} alt="Rejected" width={15} height={15} />
			<div>
				<p className="text-[10px] font-extrabold uppercase tracking-[1px] text-[#EF4444] leading-[15px]">
					Reason
				</p>
				<p className="text-[13px] leading-[20px] text-[#BE123C]">
					{reason ?? "Your submission did not meet our quality standards."}
				</p>
			</div>
		</div>
	);
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SubmissionCard({ data, onViewDetails, onResubmit }: SubmissionCardProps) {
	const status = data.status?.toLowerCase() ?? "pending";
	const thumbnailUrl = getYoutubeThumbnailUrl(data.youtubeUrl) ?? imgTrackThumbnailFallback.src;
	const badge = STATUS_BADGE[status] ?? STATUS_BADGE.pending;
	const subtitle = getSubtitle(status, data.createdAt);

	return (
		<article className="w-full rounded-[20px] border border-[#F0F0F0] bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
			{/* Top row */}
			<div className="flex gap-4">
				<CustomImage
					src={thumbnailUrl}
					fallback={imgTrackThumbnailFallback.src}
					alt={data.trackTitle}
					width={72}
					height={72}
					className="size-[64px] shrink-0 rounded-[12px] object-cover"
				/>

				<div className="min-w-0 flex-1">
					<div className="flex items-start justify-between gap-2">
						<p className="truncate text-[18px] font-bold leading-[22.5px] text-[#0F172A] tracking-[-0.45px]">
							{data.trackTitle}
						</p>
						<span
							className={`shrink-0 rounded-full px-3 py-[5px] text-[10px] font-bold tracking-[0.1em] ${badge.className}`}
						>
							{badge.label}
						</span>
					</div>

					<p className="truncate text-[12px] leading-[18px] text-cus-muted-secondary font-semibold">
						{data.eventName}
					</p>

					<p className="mt-1 text-[13px] leading-[19.5px] text-text-link">{subtitle}</p>
				</div>
			</div>

			{/* Status-specific middle content */}
			{status === "approved" && <ApprovedContent voteCount={data.voteCount} rank={data.rank} />}
			{status === "pending" && <PendingContent />}
			{status === "rejected" && <RejectedContent reason={data.rejectionReason} />}

			{/* CTA button */}
			{status === "approved" && (
				<Button
					type="button"
					onClick={onViewDetails}
					className="mt-4 h-[55px] w-full rounded-[16px] bg-primary-button text-[16px] font-bold text-white transition-opacity active:opacity-80  leading-[24px]"
				>
					View Details
				</Button>
			)}
			{status === "pending" && (
				<Button
					type="button"
					onClick={onViewDetails}
					className="mt-4 h-[55px] w-full rounded-[16px] bg-[#F8FAFC] text-[16px] font-bold text-[#787F89] transition-opacity active:opacity-80  leading-[24px] border border-[#E0E0E0] hover:bg-[#F8FAFC]/80"
				>
					View Submission
				</Button>
			)}
			{status === "rejected" && (
				<Button
					type="button"
					onClick={onResubmit}
					className="mt-4 h-[55px] w-full rounded-[16px] bg-[#FDFEFF] text-[16px] font-semibold text-[#0D1B1B] transition-opacity active:opacity-80  leading-[24px] border border-[#8B919D] hover:bg-[#F8FAFC]/80"
				>
					Re-submit
				</Button>
			)}
		</article>
	);
}
