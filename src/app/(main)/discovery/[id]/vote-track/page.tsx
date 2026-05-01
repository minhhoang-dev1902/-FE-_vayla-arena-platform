"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import infoIcon from "@/assets/icons/info-icon.svg";
import imgTrackThumbnailFallback from "@/assets/images/track-cover-fallback.png";
import { useGetTrackDetailById } from "@/features/discovery/hooks/useGetTrackDetailById";
import { HeaderWithBackBtn } from "@/share/components/layout/headers/HeadeWithBackBtn";
import { Button } from "@/share/components/ui/button";
import { CustomImage } from "@/share/components/ui/customs/custom-image/CustomImage";

// ─── Cost row ────────────────────────────────────────────────────────────────

interface CostRowProps {
	label: string;
	amount: number;
	bold?: boolean;
}

function CostRow({ label, amount, bold = false }: CostRowProps) {
	return (
		<div className="flex items-center justify-between py-[10px]">
			<p className={`text-[13px] text-dark-primary ${bold ? "font-bold" : "font-medium"}`}>
				{label}
			</p>
			<div className="flex items-baseline gap-[3px]">
				<span
					className={`${bold ? "text-[16px] font-bold" : "text-[13px] font-semibold"} text-dark-primary`}
				>
					{amount}
				</span>
				<span
					className={`${bold ? "text-[12px]" : "text-[11px]"} font-semibold text-secondary-button`}
				>
					VAYLA
				</span>
			</div>
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────

const COST_PER_VOTE = 10;
const NETWORK_FEE = 0.8;
const MAX_VOTES = 10;
const PLATFORM_BALANCE = 50;

export default function VoteTrackPage() {
	const router = useRouter();
	const { id } = useParams();
	const [voteCount, setVoteCount] = useState(1);

	const { data: resTrack } = useGetTrackDetailById(id as string);
	const track = resTrack?.data ?? null;

	const totalVoteCost = voteCount * COST_PER_VOTE;
	const totalCost = totalVoteCost + NETWORK_FEE;

	const handleDecrement = useCallback(() => {
		setVoteCount(c => Math.max(1, c - 1));
	}, []);

	const handleIncrement = useCallback(() => {
		setVoteCount(c => Math.min(MAX_VOTES, c + 1));
	}, []);

	const handleConfirm = useCallback(() => {
		// TODO: call vote mutation
	}, []);

	const handleCancel = useCallback(() => {
		router.back();
	}, [router]);

	return (
		<main className="flex  flex-col ">
			<HeaderWithBackBtn title="Voting Process" onBtnBackClick={handleCancel} />
			<div className="container pt-[30px]">
				<div className="container py-[20px] shadow-[0_8px_40px_0_rgba(0,0,0,0.10)] rounded-[19px]">
					<p className="text-[16px] font-bold leading-[28px] text-[#0D1B1B]">Confirm Your Vote</p>

					{/* track info */}
					<div className="mt-4 flex items-center gap-[14px] rounded-[16px] bg-[#0035310D] py-[18px] px-[15px]">
						<CustomImage
							src={track?.thumbnailUrl ?? ""}
							fallback={imgTrackThumbnailFallback.src}
							alt={track?.trackTitle ?? ""}
							width={86}
							height={86}
							className="size-[86px] shrink-0 rounded-[12px] object-cover"
						/>
						<div className="min-w-0 flex-1">
							<p className="truncate text-[18px] font-bold leading-[22.5px] text-dark-primary">
								{track?.trackTitle ?? ""}
							</p>
							<p className="mt-0.5 truncate text-[14px] text-[#2A655FB2]">
								{track?.artistName ?? ""}
							</p>
							<div className="mt-[13px] inline-flex items-center gap-2 rounded-[10px] bg-[#0068571A] px-[10px] py-1">
								<span className="text-[10px] font-bold uppercase tracking-[0.1em] text-dark-secondary">
									Total Votes
								</span>
								<span className="text-[12px] font-bold text-secondary-button">
									{new Intl.NumberFormat("en-US").format(track?.voteCount ?? 0)}
								</span>
							</div>
						</div>
					</div>

					{/* Cost per vote */}
					<div className="mt-5 flex items-center justify-between">
						<p className="text-[14px] text-dark-primary">Cost per vote</p>
						<p className="text-[14px] font-bold text-dark-primary">
							{COST_PER_VOTE} <span className="font-normal text-dark-primary">VAYLA</span>
						</p>
					</div>

					{/* Number of votes stepper */}
					<div className="border border-[#0035310D] mt-[10px] p-[21px] rounded-[10px]">
						{/* Row 1: label + max badge */}
						<div className="flex items-center justify-between">
							<p className="text-[15px] font-bold text-dark-primary">Number of votes</p>
							<span className="rounded-[10px] bg-[#FEF3C7] px-3 py-1 text-[12px] font-bold text-[#D97706]">
								MAX {MAX_VOTES}
							</span>
						</div>

						{/* Row 2: stepper + votes selected */}
						<div className="mt-4 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<button
									type="button"
									onClick={handleDecrement}
									disabled={voteCount <= 1}
									className="flex size-[52px] items-center justify-center rounded-full bg-[#F1F4F6] text-[22px] font-bold text-dark-primary transition-opacity disabled:opacity-30"
								>
									−
								</button>
								<div className="flex size-[52px] items-center justify-center rounded-full bg-[#F1F4F6]">
									<span className="text-[18px] font-bold text-dark-primary">{voteCount}</span>
								</div>
								<button
									type="button"
									onClick={handleIncrement}
									disabled={voteCount >= MAX_VOTES}
									className="flex size-[52px] items-center justify-center rounded-full bg-[#F1F4F6] text-[22px] font-bold text-dark-primary transition-opacity disabled:opacity-30"
								>
									+
								</button>
							</div>

							<div className="text-right">
								<p className="text-[11px] font-semibold uppercase leading-[12px] text-[#2A655F99] max-w-[60px]">
									Votes Selected
								</p>
								<p className="mt-1 text-[28px] font-bold leading-[32px] text-dark-primary">
									{voteCount}
								</p>
							</div>
						</div>
					</div>

					{/* Cost breakdown */}
					<div className="rounded-[12px] bg-[#F2F5F5] px-5 py-1 mt-[10px]">
						<CostRow label="Vote Cost" amount={totalVoteCost} />
						<CostRow label="Network Fee" amount={NETWORK_FEE} />
						<div className="h-px bg-[#CBCBCB]" />
						<CostRow label="Total Cost" amount={totalCost} bold />
					</div>

					{/* Platform balance */}
					<div className="mt-4 rounded-[10px] border border-[#E5EBEA] bg-white p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-[11px] font-bold uppercase tracking-[0.14em] text-dark-primary">
									Platform Balance
								</p>
								<div className=" leading-[24px] text-dark-primary flex items-center gap-[4px]">
									<span className="text-[20px] font-bold">{PLATFORM_BALANCE}</span>
									<span className="text-[16px]">VAYLA</span>
								</div>
							</div>
							<p className="text-[12px] text-[#2A655F99]">Available for voting</p>
						</div>
					</div>

					{/* Max votes note */}
					<p className="mt-[10px] text-center text-[12px] font-semibold uppercase tracking-[1.1px] text-text-link">
						Max {MAX_VOTES} Votes per Track
					</p>

					{/* CTA buttons */}
					<Button
						type="button"
						onClick={handleConfirm}
						disabled={totalCost > PLATFORM_BALANCE}
						className="mt-5 h-[56px] w-full rounded-[16px] bg-primary-button text-[16px] font-semibold text-white mx-auto"
					>
						Confirm Vote
					</Button>

					<Button
						type="button"
						variant="outline"
						onClick={handleCancel}
						className="mt-5 h-[56px] w-full rounded-[16px]  text-[16px] font-semibold text-[#55847F] mx-auto border border-[#878683]"
					>
						Cancel
					</Button>

					{/* Disclaimer */}
					<div className="mt-5 flex items-start gap-2">
						<Image
							src={infoIcon.src}
							alt="info"
							width={15}
							height={15}
							className="mt-0.5 shrink-0"
						/>
						<p className="text-[12px] leading-[18px] text-[#787F89]">
							Note: Voting uses Platform Balance only. Confirmed votes are immutable and immediately
							registered on-chain for the <span>{track?.eventName ?? "challenge"}</span> challenge.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
