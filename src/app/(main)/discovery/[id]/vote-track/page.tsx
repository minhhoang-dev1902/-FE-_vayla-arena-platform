"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import infoIcon from "@/assets/icons/info-icon.svg";
import imgTrackThumbnailFallback from "@/assets/images/track-cover-fallback.png";
import { useGetTrackDetailById } from "@/features/discovery/hooks/useGetTrackDetailById";
import { useMutateTrackVote } from "@/features/voting/hooks/useMutateTrackVote";
import {
	type TrackVoteErrorData,
	TrackVotePayloadClass,
	type TrackVoteResponseClass,
} from "@/features/voting/models/class/track-vote.class";
import { HeaderWithBackBtn } from "@/share/components/layout/headers/HeadeWithBackBtn";
import { Button } from "@/share/components/ui/button";
import { CustomImage } from "@/share/components/ui/customs/custom-image/CustomImage";
import { NAVIGATE } from "@/share/contants/navigate";
import { VoteErrorView } from "./(components)/VoteErrorView";
import { VoteLoadingView } from "./(components)/VoteLoadingView";
import { VoteSuccessView } from "./(components)/VoteSuccessView";

type View = "form" | "loading" | "success" | "error";

const FALLBACK_VOTE_ERROR: TrackVoteErrorData = {
	code: "UNKNOWN_ERROR",
	message: "An unexpected error occurred.\nPlease try again.",
};

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

const COST_PER_VOTE = 10;
const NETWORK_FEE = 0.8;
const MAX_VOTES = 10;
const PLATFORM_BALANCE = 50;

export default function VoteTrackPage() {
	const router = useRouter();
	const { id } = useParams();
	const submissionIdFromRoute = id as string;
	const [view, setView] = useState<View>("form");
	const [apiPending, setApiPending] = useState(false);
	const [voteResult, setVoteResult] = useState<TrackVoteResponseClass | null>(null);
	const [voteError, setVoteError] = useState<TrackVoteErrorData | null>(null);
	const [voteCount, setVoteCount] = useState(1);
	const pendingViewRef = useRef<"success" | "error">("success");

	const totalVoteCost = voteCount * COST_PER_VOTE;
	const totalCost = totalVoteCost + NETWORK_FEE;

	const { data: resTrack } = useGetTrackDetailById(submissionIdFromRoute);
	const track = resTrack?.data ?? null;

	const parseVoteAxiosError = useCallback((err: unknown): TrackVoteErrorData => {
		const axiosError = err as {
			response?: { data?: { error?: { code?: string; message?: string } }; status?: number };
		};
		return {
			code: axiosError.response?.data?.error?.code ?? "UNKNOWN_ERROR",
			message: axiosError.response?.data?.error?.message ?? "An unexpected error occurred.",
			httpStatus: axiosError.response?.status,
		};
	}, []);

	const handleVoteSuccess = useCallback((result: TrackVoteResponseClass) => {
		pendingViewRef.current = "success";
		setVoteResult(result);
		setApiPending(false);
	}, []);

	const handleVoteError = useCallback((error: TrackVoteErrorData) => {
		pendingViewRef.current = "error";
		setVoteError(error);
		setApiPending(false);
	}, []);

	const { mutate: mutateTrackVote } = useMutateTrackVote({
		onSuccess: result => handleVoteSuccess(result),
		onError: err => handleVoteError(parseVoteAxiosError(err)),
	});

	const handleLoadingComplete = useCallback(() => {
		setView(pendingViewRef.current);
	}, []);

	const handleConfirm = useCallback(() => {
		const sid = track?.id;
		if (!sid) return;
		setVoteError(null);
		setVoteResult(null);
		setApiPending(true);
		setView("loading");
		mutateTrackVote(new TrackVotePayloadClass({ submissionId: sid, voteCount }));
	}, [mutateTrackVote, track?.id, voteCount]);

	const handleVoteFormBack = useCallback(() => {
		router.back();
	}, [router]);

	const handleErrorCancel = useCallback(() => {
		setView("form");
		setApiPending(false);
		setVoteError(null);
	}, []);

	const handleSuccessBackChallenge = useCallback(() => {
		if (!track?.eventId) {
			router.push(NAVIGATE.DISCOVERY);
			return;
		}
		router.push(`${NAVIGATE.DISCOVERY}/${track.eventId}`);
	}, [router, track?.eventId]);

	const handleSuccessBackDiscovery = useCallback(() => {
		router.push(NAVIGATE.DISCOVERY);
	}, [router]);

	const handleDecrement = useCallback(() => {
		setVoteCount(c => Math.max(1, c - 1));
	}, []);

	const handleIncrement = useCallback(() => {
		setVoteCount(c => Math.min(MAX_VOTES, c + 1));
	}, []);

	if (view === "loading") {
		return <VoteLoadingView loading={apiPending} onComplete={handleLoadingComplete} />;
	}

	if (view === "success" && voteResult) {
		return (
			<VoteSuccessView
				result={voteResult}
				eventName={track?.eventName}
				onBackToChallenge={handleSuccessBackChallenge}
				onBackToDiscovery={handleSuccessBackDiscovery}
			/>
		);
	}

	if (view === "error") {
		return (
			<VoteErrorView
				error={voteError ?? FALLBACK_VOTE_ERROR}
				onTopUp={() => {
					/* TODO: top-up */
				}}
				onCancel={handleErrorCancel}
			/>
		);
	}

	return (
		<main className="flex flex-col">
			<HeaderWithBackBtn title="Voting Process" onBtnBackClick={handleVoteFormBack} />
			<div className="container pt-[30px]">
				<div className="container rounded-[19px] py-[20px] shadow-[0_8px_40px_0_rgba(0,0,0,0.10)]">
					<p className="text-[16px] font-bold leading-[28px] text-[#0D1B1B]">Confirm Your Vote</p>

					<div className="mt-4 flex items-center gap-[14px] rounded-[16px] bg-[#0035310D] px-[15px] py-[18px]">
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

					<div className="mt-5 flex items-center justify-between">
						<p className="text-[14px] text-dark-primary">Cost per vote</p>
						<p className="text-[14px] font-bold text-dark-primary">
							{COST_PER_VOTE} <span className="font-normal text-dark-primary">VAYLA</span>
						</p>
					</div>

					<div className="mt-[10px] rounded-[10px] border border-[#0035310D] p-[21px]">
						<div className="flex items-center justify-between">
							<p className="text-[15px] font-bold text-dark-primary">Number of votes</p>
							<span className="rounded-[10px] bg-[#FEF3C7] px-3 py-1 text-[12px] font-bold text-[#D97706]">
								MAX {MAX_VOTES}
							</span>
						</div>

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
								<p className="max-w-[60px] text-[11px] font-semibold uppercase leading-[12px] text-[#2A655F99]">
									Votes Selected
								</p>
								<p className="mt-1 text-[28px] font-bold leading-[32px] text-dark-primary">
									{voteCount}
								</p>
							</div>
						</div>
					</div>

					<div className="mt-[10px] rounded-[12px] bg-[#F2F5F5] px-5 py-1">
						<CostRow label="Vote Cost" amount={totalVoteCost} />
						<CostRow label="Network Fee" amount={NETWORK_FEE} />
						<div className="h-px bg-[#CBCBCB]" />
						<CostRow label="Total Cost" amount={totalCost} bold />
					</div>

					<div className="mt-4 rounded-[10px] border border-[#E5EBEA] bg-white p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-[11px] font-bold uppercase tracking-[0.14em] text-dark-primary">
									Platform Balance
								</p>
								<div className="flex items-center gap-[4px] leading-[24px] text-dark-primary">
									<span className="text-[20px] font-bold">{PLATFORM_BALANCE}</span>
									<span className="text-[16px]">VAYLA</span>
								</div>
							</div>
							<p className="text-[12px] text-[#2A655F99]">Available for voting</p>
						</div>
					</div>

					<p className="mt-[10px] text-center text-[12px] font-semibold uppercase tracking-[1.1px] text-text-link">
						Max {MAX_VOTES} Votes per Track
					</p>

					<Button
						type="button"
						onClick={handleConfirm}
						disabled={totalCost > PLATFORM_BALANCE || !(track?.submissionId?.trim() || track?.id)}
						className="mx-auto mt-5 h-[56px] w-full rounded-[16px] bg-primary-button text-[16px] font-semibold text-white disabled:opacity-50"
					>
						Confirm Vote
					</Button>

					<Button
						type="button"
						variant="outline"
						onClick={handleVoteFormBack}
						className="mx-auto mt-5 h-[56px] w-full rounded-[16px] border border-[#878683] text-[16px] font-semibold text-[#55847F]"
					>
						Cancel
					</Button>

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
