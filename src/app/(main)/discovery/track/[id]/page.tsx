"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import dowloadIcon from "@/assets/icons/download-icon.svg";
import filmIcon from "@/assets/icons/film-icon.svg";
import loveIcon from "@/assets/icons/like-icon.svg";
import play2Icon from "@/assets/icons/play-2-icon.svg";
import rankIcon from "@/assets/icons/rank-icon.svg";
import voteIcon from "@/assets/icons/vote-icon.svg";
import imgTrackThumbnailFallback from "@/assets/images/track-cover-fallback.png";
import { useGetTrackDetailById } from "@/features/discovery/hooks/useGetTrackDetailById";
import { useGetTracksByEvent } from "@/features/discovery/hooks/useGetTracksByEvent";
import { TrackSearchByEvent } from "@/features/discovery/models/class/track-search.class";
import { HeaderWithBackBtn } from "@/share/components/layout/headers/HeadeWithBackBtn";
import { Button } from "@/share/components/ui/button";
import { CustomImage } from "@/share/components/ui/customs/custom-image/CustomImage";
import { NAVIGATE } from "@/share/contants/navigate";
import { getYoutubeThumbnailUrl } from "@/share/utils/youtube-thumbnail";

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
	live: { label: "LIVE", className: "bg-secondary-button text-white" },
	approved: { label: "APPROVED", className: "bg-secondary-button text-white" },
	pending: { label: "PENDING", className: "bg-[#F59E0B] text-white" },
	rejected: { label: "REJECTED", className: "bg-[#EF4444] text-white" },
};

// ─── Reusable stat cell ───────────────────────────────────────────────────────

interface StatItemProps {
	icon: React.ReactNode;
	label: string;
	value: React.ReactNode;
}

function StatItem({ icon, label, value }: StatItemProps) {
	return (
		<div className="flex flex-col items-center gap-1 px-4 bg-white shadow-[0px_6px_20px_0px_rgba(0,0,0,0.05)] rounded-[16px]">
			{icon}
			<p className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#3B4A46]">
				{label}
			</p>
			<p className="text-[18px] font-bold leading-[28px] text-[#181C1E]">{value}</p>
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────

export default function SubmissionDetailPage() {
	const router = useRouter();
	const params = useParams();
	const id = params?.id as string;

	const handleBack = useCallback(() => {
		router.back();
	}, [router]);

	const { data: resTrackDetail, isLoading } = useGetTrackDetailById(id);
	const submission = resTrackDetail?.data ?? null;

	// Fetch other tracks in the same event
	const { data: resEventTracks } = useGetTracksByEvent(
		new TrackSearchByEvent({ eventId: submission?.eventId ?? "", limit: 4 }),
	);
	const eventTracks = (resEventTracks?.data?.submissions ?? [])
		.filter(t => t.submissionId !== id)
		.slice(0, 3);

	const badge = STATUS_BADGE[submission?.status?.toLowerCase() ?? ""] ?? STATUS_BADGE.pending;

	const formattedVotes = new Intl.NumberFormat("en-US").format(submission?.voteCount ?? 0);

	const genreTags = submission?.genre
		? submission.genre.split(/[,/]/).map(g => `#${g.trim()}`)
		: [];

	if (isLoading || !submission) {
		return (
			<main className="min-h-dvh bg-white">
				<HeaderWithBackBtn title="Track Detail" onBtnBackClick={handleBack} />
				<div className="flex min-h-[60vh] items-center justify-center">
					<p className="text-[14px] text-dark-sub-primary">
						{isLoading ? "Loading..." : "Track not found."}
					</p>
				</div>
			</main>
		);
	}

	return (
		<>
			<HeaderWithBackBtn title="My Submissions" onBtnBackClick={handleBack} />
			<main className="pt-[30px] pb-10 container">
				<div className="relative h-[340px] w-full overflow-hidden bg-[#0A0F0E] rounded-[24px]">
					<CustomImage
						src={submission.thumbnailUrl}
						fallback={imgTrackThumbnailFallback.src}
						alt={submission.trackTitle}
						fill
						className="object-cover opacity-60 size-[340px] mx-auto rounded-[24px] "
					/>
					{/* Gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0E] via-[#0A0F0E55] to-transparent" />

					{/* Status badge */}
					<span
						className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${badge.className}`}
					>
						{badge.label}
					</span>

					{/* Track info */}
					<div className="absolute bottom-5 left-4 right-4">
						<p className="text-[14px] font-semibold leading-[20px] text-white/80">
							{submission.eventName}
						</p>

						<p
							className="font-[700]  text-[30px] leading-[30px] tracking-[-0.75px] text-white"
							style={{ verticalAlign: "middle" }}
						>
							{submission.trackTitle}
						</p>

						<p
							className="mt-1  font-semibold text-[16px] leading-[24px] text-white/90"
							style={{
								letterSpacing: "0px",
								verticalAlign: "middle",
							}}
						>
							{submission.artistName}
						</p>
					</div>
				</div>

				<div className="mx-auto w-full max-w-[480px] px-4 mt-[30px]">
					{/* ── Stats row ── */}
					<div className=" grid grid-cols-3 divide-x divide-[#F0F0F0] gap-3">
						<StatItem
							icon={<Image src={voteIcon.src} alt="Vote" width={18} height={19.5} />}
							label="Votes"
							value={formattedVotes}
						/>
						<StatItem
							icon={<Image src={rankIcon.src} alt="Rank" width={18} height={18} />}
							label="Rank"
							value={submission.rank ? `#${submission.rank}` : "—"}
						/>
						<StatItem
							icon={<Image src={loveIcon.src} alt="Likes" width={18} height={18} />}
							label="Likes"
							value="—"
						/>
					</div>

					{/* ── Reward + Vote ── */}
					<div
						className="mt-[15px] flex justify-between items-center min-w-[340px] h-[96px] rounded-[20px] bg-[#F1F4F6] px-5 py-5"
						style={{ padding: "20px" }}
					>
						<div>
							<p className="text-[12px] font-bold uppercase tracking-[1.2px] leading-[16px] text-[#3B4A46]">
								Est. Reward
							</p>
							<p className="mt-1 text-[20px] font-bold leading-[32px] text-[#0D1B1B]">
								150 <span className="text-[16px] font-normal text-[#0D1B1B]">VAYLA</span>
							</p>
						</div>
						<Button
							type="button"
							className="h-[56px] min-w-[136px] max-w-[136px] rounded-[16px] bg-primary-button text-[15px] font-bold text-white transition-opacity active:opacity-80 shadow-[0_4px_6px_-4px_rgba(0,106,96,0.2),0_10px_15px_-3px_rgba(0,106,96,0.2)]"
							onClick={() => router.push(`${NAVIGATE.DISCOVERY}/${id}/vote-track`)}
						>
							Vote Now
						</Button>
					</div>

					{/* ── Like + Share ── */}
					<div className="mt-4 flex gap-3">
						<Button
							variant="outline"
							className="flex items-center gap-2 min-w-[264px]  py-[16px] h-[56px] rounded-[16px] border border-[#787F89] flex-1"
						>
							<Image src={loveIcon.src} alt="Like" width={20} height={18} />
							<span className="text-[15px] leading-[24px] text-[#787F89] font-semibold">
								Like Track
							</span>
						</Button>
						<Button
							variant="outline"
							className="flex size-[56px] items-center justify-center rounded-[14px] border border-[#787F89] bg-white text-dark-primary"
						>
							<Image src={dowloadIcon.src} alt="Download" width={16} height={21} />
						</Button>
					</div>

					{/* ── YouTube preview ── */}
					<Button
						type="button"
						onClick={() => window.open(submission.youtubeUrl, "_blank")}
						className="relative mt-5 h-[191px] w-full overflow-hidden rounded-[15px] bg-[#003531]"
					>
						{/* Thumbnail */}
						<div className="absolute inset-x-1 inset-y-1 overflow-hidden rounded-[10px]">
							<CustomImage
								src={getYoutubeThumbnailUrl(submission.youtubeUrl) ?? imgTrackThumbnailFallback.src}
								fallback={imgTrackThumbnailFallback.src}
								alt={submission.trackTitle}
								fill
								className="object-cover"
							/>
						</div>

						{/* Play button overlay */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="flex size-[60px] items-center justify-center rounded-full bg-secondary-button shadow-[0_0_24px_rgba(67,245,242,0.4)]">
								<Image src={play2Icon.src} alt="Play" width={17} height={21} className="ml-1" />
							</div>
						</div>

						{/* Dark gradient overlay — fades from transparent to dark at bottom */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

						{/* Bottom label — sits above overlay */}
						<div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 px-4 py-3">
							<Image src={filmIcon.src} alt="watch" width={13} height={11} />
							<span className="text-[12px] font-semibold text-white drop-shadow-sm">
								Watch Preview on YouTube
							</span>
						</div>
					</Button>

					{/* ── About ── */}
					<section className="mt-6 rounded-[16px]  bg-[#F1F4F6] p-6">
						<p className="text-[18px] font-bold leading-[28px] text-[#181C1E]">About this track</p>
						<p className="mt-3 text-[14px] leading-[22px] text-dark-sub-primary">
							{submission.description || "—"}
						</p>
						{genreTags.length > 0 && (
							<div className="mt-4 flex flex-wrap gap-2">
								{genreTags.map(tag => (
									<span
										key={tag}
										className="rounded-[8px] bg-[#85F6E5] px-3 py-1 text-[12px] semibold text-[#00201C] leading-[16px]"
									>
										{tag}
									</span>
								))}
							</div>
						)}
					</section>

					{/* ── More from Challenge ── */}
					{eventTracks.length > 0 && (
						<section className="mt-10">
							<div className="mb-4 flex items-center justify-between">
								<p className="text-[16px] font-bold leading-[22px] text-[#181C1E]">
									More from Challenge
								</p>
								<Button
									variant="ghost"
									onClick={() => router.push(`${NAVIGATE.DISCOVERY}/${submission.eventId}`)}
									className="p-0 text-[12px] font-bold uppercase tracking-[1.2px] text-[#006A60]"
								>
									View All
								</Button>
							</div>

							<div className="flex flex-col gap-3 mt-4">
								{eventTracks.map(track => (
									<div
										key={track.submissionId}
										className="flex items-center gap-3 bg-white rounded-[12px] p-4"
										style={{
											boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)",
										}}
									>
										<CustomImage
											src={track.thumbnailUrl}
											fallback={imgTrackThumbnailFallback.src}
											alt={track.trackTitle}
											width={64}
											height={64}
											className="size-[64px] rounded-[8px] object-cover"
										/>
										<div className="min-w-0 flex-1 font-bold">
											<p className="truncate text-[14px] font-bold leading-[20px] text-[#181C1E]">
												{track.trackTitle}
											</p>
											<p className="truncate text-[10px] leading-[16px] text-[#181C1E]">
												BY {track.artistName.toUpperCase()}
											</p>
										</div>
										<div className="shrink-0 text-right">
											<p className="text-[14px] font-bold leading-[18px] text-[#006A60]">
												{new Intl.NumberFormat("en-US").format(track.voteCount)}
											</p>
											<p className="text-[10px] uppercase tracking-[0.1em] text-[#3B4A46] font-bold">
												Votes
											</p>
										</div>
									</div>
								))}
							</div>
						</section>
					)}
				</div>
			</main>
		</>
	);
}
