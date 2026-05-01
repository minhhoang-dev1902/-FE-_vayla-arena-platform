import { Link2 } from "lucide-react";
import Image from "next/image";
import successIcon from "@/assets/icons/success-icon.svg";
import type { TrackVoteResponseClass } from "@/features/voting/models/class/track-vote.class";
import { Button } from "@/share/components/ui/button";

interface VoteSuccessViewProps {
	result: TrackVoteResponseClass;
	eventName?: string;
	onBackToChallenge: () => void;
	onBackToDiscovery: () => void;
}

export function VoteSuccessView({
	result,
	eventName,
	onBackToChallenge,
	onBackToDiscovery,
}: VoteSuccessViewProps) {
	const { data } = result;

	return (
		<main className="min-h-dvh bg-white px-6 pb-10 pt-12">
			<div className="mx-auto flex w-full max-w-[390px] flex-col items-center">
				<div
					className="relative mb-6 flex size-[96px] items-center justify-center rounded-full bg-[#43F5F2]"
					style={{
						boxShadow:
							"0px 8px 10px -6px rgba(0, 104, 87, 0.10), 0px 20px 25px -5px rgba(0, 104, 87, 0.10)",
					}}
				>
					<Image src={successIcon.src} alt="Success" width={44} height={42} />
				</div>

				<p className="text-center text-[30px] font-bold leading-[36px] tracking-[-0.75px] text-dark-primary">
					Vote Registered
				</p>
				<p className="mt-4 text-center text-[15px] leading-[25px] text-[#8CA3A1]">
					<span className="block">Your votes were recorded successfully.</span>
					<span className="mt-1 block">{eventName ?? "Challenge"} tally will update shortly.</span>
				</p>

				<section className="mt-7 w-full rounded-[16px] border border-[#E0E0E0] bg-white p-5">
					<div className="min-w-0">
						<p className="text-[10px] font-bold uppercase tracking-[1px] text-[#47817A]">
							Track Title
						</p>
						<p className="mt-1 truncate text-[16px] font-bold leading-[20px] text-dark-primary">
							{data.trackTitle.trim() || "—"}
						</p>
					</div>

					<div className="my-5 h-px bg-[#E8F0F0]" />

					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="text-[10px] font-bold uppercase tracking-[1px] text-[#47817A]">
								Votes Cast
							</p>
							<p className="mt-2 text-[22px] font-bold leading-[28px] text-dark-primary">
								{data.votesCast}
							</p>
						</div>
						<div className="text-right">
							<p className="text-[10px] font-bold uppercase tracking-[1px] text-[#47817A]">
								VAYLA Spent
							</p>
							<p className="mt-2 text-[16px] font-bold text-secondary-button">
								{data.vaylaDeducted}
							</p>
						</div>
					</div>

					<div className="my-5 h-px bg-[#E8F0F0]" />

					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="text-[10px] font-bold uppercase tracking-[1px] text-[#47817A]">
								Platform Balance
							</p>
							<p className="mt-2 text-[16px] font-bold leading-[22px] text-dark-primary">
								{data.platformBalance}{" "}
								<span className="text-[12px] font-semibold text-secondary-button">VAYLA</span>
							</p>
						</div>
						<span className="rounded-full bg-[#00A88E1A] px-3 py-1 text-[10px] font-bold uppercase tracking-[1px] text-secondary-button">
							Confirmed
						</span>
					</div>

					<div className="mt-5 flex min-w-0 items-center justify-between gap-3">
						<p
							className="flex min-w-0 max-w-[72%] items-center gap-1 truncate text-[14px] font-medium"
							title={data.submissionId}
						>
							<Link2 className="size-4 shrink-0 text-secondary-button" />
							<span className="truncate text-[#47817A]">{data.submissionId}</span>
						</p>
						<button type="button" className="shrink-0 text-[12px] font-bold text-secondary-button">
							View Transaction
						</button>
					</div>
				</section>

				<Button
					type="button"
					onClick={onBackToChallenge}
					className="mt-8 h-[56px] w-full rounded-[14px] bg-primary-button text-[15px] font-bold text-white"
				>
					Back to Challenge
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={onBackToDiscovery}
					className="mt-4 h-[58px] w-full rounded-[14px] border border-[#1A2E2B] bg-transparent text-[15px] font-bold text-dark-primary"
				>
					Back to Discovery
				</Button>
			</div>
		</main>
	);
}
