import Image from "next/image";
import errorIcon from "@/assets/icons/error-icon.svg";
import statusCodeErrorIcon from "@/assets/icons/status-code-icon.svg";
import type { TrackVoteErrorData } from "@/features/voting/models/class/track-vote.class";

interface VoteErrorViewProps {
	error: TrackVoteErrorData;
	onTopUp: () => void;
	onCancel: () => void;
}

export function VoteErrorView({ error, onTopUp, onCancel }: VoteErrorViewProps) {
	return (
		<main className="min-h-dvh bg-white px-6 pb-10 pt-14">
			<div className="mx-auto flex w-full max-w-[390px] flex-col items-center">
				<div
					className="relative mb-8 size-[102px]"
					style={{ filter: "drop-shadow(0px 0px 48px rgba(239,68,68,0.55))" }}
				>
					<Image src={errorIcon.src} alt="Error" fill className="object-contain" />
				</div>

				<p className="text-[12px] font-bold uppercase tracking-[0.18em] text-secondary-button">
					Transaction Error
				</p>
				<p className="mt-2 text-center text-[30px] font-bold leading-[36px] tracking-[-0.5px] text-dark-primary">
					{error.code
						.replace(/_/g, " ")
						.toLowerCase()
						.replace(/\b\w/g, c => c.toUpperCase())}
				</p>

				<p className="mt-5 whitespace-pre-line text-center text-[15px] leading-[24px] text-secondary-button">
					{error.message}
				</p>
				<button type="button" className="mt-1 text-[15px] font-bold text-secondary-button">
					Need help? Contact Support
				</button>

				<section className="mt-7 w-full rounded-[16px] border border-[#F0F0F0] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
					<div className="flex items-start justify-between gap-3">
						<div>
							<p className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary-button">
								Status Code
							</p>
							<p className="mt-1 text-[18px] font-bold leading-[24px] text-dark-primary">
								{error.code}
							</p>
						</div>
						<div className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-[#FDE8E8]">
							<Image src={statusCodeErrorIcon.src} alt="status" width={17} height={17} />
						</div>
					</div>

					<div className="my-4 h-px bg-[#F0F0F0]" />

					<div className="flex items-center gap-3">
						<div className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#F0F0F0]">
							<div
								className="h-full rounded-full bg-[#EF4444]"
								style={{
									width: `${error.httpStatus !== undefined ? Math.min(error.httpStatus, 100) : 85}%`,
								}}
							/>
						</div>
						<p className="shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-secondary-button">
							{error.httpStatus !== undefined ? `HTTP ${error.httpStatus}` : "85% PROCESSED"}
						</p>
					</div>
				</section>

				<button
					type="button"
					onClick={onTopUp}
					className="mt-8 h-[58px] w-full rounded-[14px] bg-secondary-button text-[15px] font-bold text-white"
				>
					Top Up Balance
				</button>
				<button
					type="button"
					onClick={onCancel}
					className="mt-4 h-[58px] w-full rounded-[14px] border border-[#E0E0E0] bg-white text-[15px] font-bold text-dark-primary"
				>
					Cancel
				</button>
			</div>
		</main>
	);
}
