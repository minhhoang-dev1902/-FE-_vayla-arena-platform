"use client";

import { Link2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import successIcon from "@/assets/icons/success-icon.svg";
import imgTrackThumbnailFallback from "@/assets/images/track-cover-fallback.png";
import { TrackClass } from "@/features/discovery/models/class/track.class";
import { CustomImage } from "@/share/components/ui/customs/custom-image/CustomImage";

const MOCK_SUBMISSION = {
	id: "3eeaffe7-44fa-4f36-867b-56e042da96f3",
	submissionId: "SUB-260430-5948",
	eventId: "59ae4b31-dc4d-4fb5-9c15-c621e140ac2b",
	userId: "5c80315e-0452-45f9-b80b-ddfa29bf8da6",
	trackTitle: "test",
	artistName: "test",
	genre: "rock",
	youtubeUrl: "https://www.youtube.com/watch?v=bTnptq4Ak48&list=RDbTnptq4Ak48&start_radio=1",
	description: "aaaa",
	lyrics: null,
	aiLabel: null,
	status: "pending",
	voteCount: 0,
	createdAt: "2026-04-30T04:08:35.706Z",
};

export default function SubmitTrackSuccessPage() {
	const _router = useRouter();

	const submissionData = new TrackClass(MOCK_SUBMISSION);

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
							src={submissionData.thumbnailUrl}
							fallback={imgTrackThumbnailFallback.src}
							alt="Track Thumbnail"
							width={94}
							height={94}
							className="rounded-[12px] object-cover h-[94px] w-[94px]"
						/>
						<div className="min-w-0">
							<p className="text-[10px] font-bold leading-[15px]  text-[#47817A] uppercase tracking-[1px]">
								Track Title
							</p>
							<p className="truncate text-[16px] font-bold leading-[20px]  text-dark-primary">
								Midnight Orbit
							</p>

							<p className="mt-3 text-[10px] font-bold tracking-[1px] text-[#47817A] uppercase leading-[15px]">
								Challenge Name
							</p>
							<p className="text-[14px]  text-dark-sub-primary  leading-[20px]">
								{MOCK_SUBMISSION.eventId}
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
								{MOCK_SUBMISSION.createdAt}
							</p>
						</div>
						<div className="text-right">
							<p className="text-[10px] font-bold tracking-[1px] text-[#47817A] uppercase leading-[15px]">
								Status
							</p>
							<span className="bg-[#00A88E1A] rounded-full py-1 px-3 text-secondary-button text-[10px] leading-[15px] font-bold tracking-[1px] uppercase">
								{MOCK_SUBMISSION.status}
							</span>
						</div>
					</div>

					<div className="mt-5 flex min-w-0 items-center justify-between gap-3 text-[#01A88E]">
						<p
							className="min-w-0 max-w-[60%] truncate text-[14px] font-medium flex gap-1 items-center"
							title={MOCK_SUBMISSION.submissionId}
						>
							<Link2 className="size-4 text-secondary-button" />
							<span className="text-[#47817A]">{MOCK_SUBMISSION.submissionId}</span>
						</p>

						<button type="button" className="text-[12px] font-bold text-secondary-button">
							View Transaction
						</button>
					</div>
				</section>

				{/* <button
                    type="button"
                    className="mt-8 h-[58px] w-full rounded-[14px] bg-[#01A88E] text-[26px] font-bold text-white"
                >
                    View My Submissions
                </button>
                <button
                    type="button"
                    onClick={() => router.push(NAVIGATE.DISCOVERY)}
                    className="mt-4 h-[58px] w-full rounded-[14px] bg-white text-[26px] font-bold text-[#082324]"
                >
                    Back to Discovery
                </button>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#01A88E]">
                    <Info className="size-4" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                        Estimated Reward: {MOCK_SUBMISSION.reward} VAYLA
                    </span>
                </div> */}
			</div>
		</main>
	);
}
