import { Link2 } from "lucide-react";
import Image from "next/image";
import successIcon from "@/assets/icons/success-icon.svg";
import imgTrackThumbnailFallback from "@/assets/images/track-cover-fallback.png";
import type { SubmitTrackResponseClass } from "@/features/discovery/models/class/track.class";
import { TrackClass } from "@/features/discovery/models/class/track.class";
import { CustomImage } from "@/share/components/ui/customs/custom-image/CustomImage";

interface SuccessViewProps {
	result: SubmitTrackResponseClass;
	onViewSubmissions: () => void;
	onBackToDiscovery: () => void;
}

export function SuccessView({ result, onViewSubmissions, onBackToDiscovery }: SuccessViewProps) {
	const submission = new TrackClass(result.data.submission);
	const policy = result.data.policy;

	// const submission = new TrackClass({
	// 	"id": "70707d78-7544-4931-83dd-74786037fa8b",
	// 	"submissionId": "SUB-260326-1234",
	// 	"eventId": "66d478c1-aed6-4ef8-867a-ea31ad2a0610",
	// 	"userId": "ad216900-6e2b-4822-abc5-dbea86560c36",
	// 	"trackTitle": "Neon Streets",
	// 	"artistName": "DJ Vayla",
	// 	"youtubeUrl": "https://youtu.be/dQw4w9WgXcQ",
	// 	"description": "A dark synth-wave track inspired by city nights",
	// 	"status": TrackStatusEnum.PENDING,
	// 	"voteCount": 0,
	// 	"createdAt": "2026-03-26T06:00:00Z"
	// });
	// const policy = {
	// 	vaylaDeducted: 100,
	// };

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
				<p className="mt-4 text-center text-[15px] leading-[25px] text-[#8CA3A1]">
					<span className="block">Your track has been submitted for review</span>
					<span className="mt-1 block">Admin approval is required before public listing.</span>
				</p>

				<section className="mt-7 w-full rounded-[16px] border border-[#E0E0E0] bg-white p-5">
					<div className="flex gap-4">
						<CustomImage
							src={submission.thumbnailUrl}
							fallback={imgTrackThumbnailFallback.src}
							alt="Track Thumbnail"
							width={94}
							height={94}
							className="h-[94px] w-[94px] rounded-[12px] object-cover"
						/>
						<div className="min-w-0">
							<p className="text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[#47817A]">
								Track Title
							</p>
							<p className="truncate text-[16px] font-bold leading-[20px] text-white">
								{submission.trackTitle}
							</p>
							<p className="mt-3 text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[#47817A]">
								Challenge Name
							</p>
							<p className="truncate text-[14px] leading-[20px] text-[#8CA3A1]">
								{submission.eventName || submission.eventId}
							</p>
						</div>
					</div>

					<div className="border-t border-b border-[#E5F6F4] py-4 flex items-start justify-between gap-4 mt-6">
						<div>
							<p className="text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[#47817A]">
								Submission Time
							</p>
							<p className="mt-2 text-[12px] leading-[16px] text-[#8CA3A1]">
								{submission.createdAt ? new Date(submission.createdAt).toLocaleString() : "—"}
							</p>
						</div>
						<div className="text-right">
							<p className="text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[#47817A]">
								Status
							</p>
							<span className="rounded-full bg-[#00A88E1A] px-3 py-1 text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-secondary-button">
								processing
							</span>
						</div>
					</div>

					<div className="mt-[17px] flex min-w-0 items-center justify-between gap-3">
						<p
							className="flex min-w-0 max-w-[60%] items-center gap-1 truncate text-[14px] font-medium"
							title={submission.submissionId}
						>
							<Link2 className="size-4 shrink-0 text-secondary-button" />
							<span className="truncate text-[#47817A]">{submission.submissionId}</span>
						</p>
						<button type="button" className="shrink-0 text-[12px] font-bold text-secondary-button">
							View Transaction
						</button>
					</div>
				</section>

				<button
					type="button"
					onClick={onViewSubmissions}
					className="mt-8 h-[56px] w-full rounded-[14px] bg-primary-button text-[15px] font-bold text-white"
				>
					View My Submissions
				</button>
				<button
					type="button"
					onClick={onBackToDiscovery}
					className="mt-4 h-[58px] w-full rounded-[14px] border border-[#1A2E2B] bg-transparent text-[15px] font-bold text-dark-primary"
				>
					Back to Discovery
				</button>

				{policy.vaylaDeducted > 0 && (
					<div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#F1F5F9] bg-[#F8FAFC] px-4 py-2 text-dark-sub-primary h-[33px]">
						<span className="text-[10px] font-bold uppercase tracking-[0.2em]">
							Estimated Reward: {policy.vaylaDeducted} VAYLA
						</span>
					</div>
				)}
			</div>
		</main>
	);
}
