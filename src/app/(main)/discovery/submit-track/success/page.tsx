"use client";

import { Link2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import successIcon from "@/assets/icons/success-icon.svg";
import imgTrackThumbnailFallback from "@/assets/images/track-cover-fallback.png";
import {
	type SubmitTrackResponseClass,
	TrackClass,
} from "@/features/discovery/models/class/track.class";
import { takeSubmitTrackResult } from "@/features/discovery/utils/submit-track-result";
import { CustomImage } from "@/share/components/ui/customs/custom-image/CustomImage";
import { NAVIGATE } from "@/share/contants/navigate";

export default function SubmitTrackSuccessPage() {
	const router = useRouter();
	const [result, setResult] = useState<SubmitTrackResponseClass | null>(null);

	useEffect(() => {
		const data = takeSubmitTrackResult();
		if (!data) {
			router.replace(NAVIGATE.SUBMIT_TRACK);
			return;
		}
		setResult(data);
	}, [router]);

	if (!result) {
		return null;
	}

	const submission = new TrackClass(result.data.submission);
	const policy = result.data.policy;

	return (
		<main className="min-h-dvh bg-white px-6 pb-10 pt-12 text-white">
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
					Submission Received
				</p>
				<p className="mt-4 text-center text-dark-sub-primary text-[15px] leading-[25px]">
					<span className="block">Your track has been submitted for review</span>
					<span className="mt-1 block">Admin approval is required before public listing.</span>
				</p>

				<section className="mt-7 w-full rounded-[16px] bg-white p-5 border border-background-block-primary">
					<div className="flex gap-4">
						<CustomImage
							src={submission.thumbnailUrl}
							fallback={imgTrackThumbnailFallback.src}
							alt="Track Thumbnail"
							width={94}
							height={94}
							className="rounded-[12px] object-cover h-[94px] w-[94px]"
						/>
						<div className="min-w-0">
							<p className="text-[10px] font-bold leading-[15px] text-[#47817A] uppercase tracking-[1px]">
								Track Title
							</p>
							<p className="truncate text-[16px] font-bold leading-[20px] text-dark-primary">
								{submission.trackTitle}
							</p>

							<p className="mt-3 text-[10px] font-bold tracking-[1px] text-[#47817A] uppercase leading-[15px]">
								Challenge Name
							</p>
							<p className="text-[14px] text-dark-sub-primary leading-[20px] truncate">
								{submission.eventName || submission.eventId}
							</p>
						</div>
					</div>

					<div className="my-5 h-px bg-[#E8F0F0]" />

					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="text-[10px] font-bold tracking-[1px] text-[#47817A] uppercase leading-[15px]">
								Submission Time
							</p>
							<p className="mt-2 text-[12px] leading-[16px] text-[#003531]">
								{submission.createdAt ? new Date(submission.createdAt).toLocaleString() : "—"}
							</p>
						</div>
						<div className="text-right">
							<p className="text-[10px] font-bold tracking-[1px] text-[#47817A] uppercase leading-[15px]">
								Status
							</p>
							<span className="bg-[#00A88E1A] rounded-full py-1 px-3 text-secondary-button text-[10px] leading-[15px] font-bold tracking-[1px] uppercase">
								processing
							</span>
						</div>
					</div>

					<div className="mt-5 flex min-w-0 items-center justify-between gap-3 text-[#01A88E]">
						<p
							className="min-w-0 max-w-[60%] truncate text-[14px] font-medium flex gap-1 items-center"
							title={submission.submissionId}
						>
							<Link2 className="size-4 text-secondary-button shrink-0" />
							<span className="text-[#47817A] truncate">{submission.submissionId}</span>
						</p>

						<button type="button" className="text-[12px] font-bold text-secondary-button shrink-0">
							View Transaction
						</button>
					</div>
				</section>

				<button
					type="button"
					onClick={() => router.push(NAVIGATE.DISCOVERY)}
					className="mt-8 h-[58px] w-full rounded-[14px] border border-background-block-primary bg-white text-[15px] font-bold text-dark-primary"
				>
					Back to Discovery
				</button>

				{policy.vaylaDeducted > 0 && (
					<div className="mt-6 inline-flex items-center gap-2 rounded-full border border-background-block-primary bg-white px-4 py-2 text-secondary-button">
						<span className="text-[11px] font-bold tracking-[0.2em] uppercase">
							Estimated Reward: {policy.vaylaDeducted} VAYLA
						</span>
					</div>
				)}
			</div>
		</main>
	);
}
