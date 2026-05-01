"use client";

import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import imgChallengeThumnailFallback from "@/assets/images/challenge-thumnails.png";
import type { IChallenge } from "@/features/discovery/models/inteface/challenge.interface";
import { CustomImage } from "@/share/components/ui/customs/custom-image/CustomImage";
import { NAVIGATE } from "@/share/contants/navigate";

interface IUpNextChallengeCardProps {
	challenge: IChallenge;
}

export function UpNextChallengeCard(props: IUpNextChallengeCardProps) {
	const { challenge } = props;
	const href = `${NAVIGATE.DISCOVERY}/${challenge.eventId}`;

	return (
		<div className="flex items-center gap-2 rounded-[22px] bg-[#f1f4f6] py-4 pl-4 pr-2 shadow-[0_8px_18px_rgba(16,34,43,0.06)]">
			<Link href={href} className="flex min-w-0 flex-1 items-center gap-4">
				<CustomImage
					src={challenge.thumbnailUrl}
					fallback={imgChallengeThumnailFallback.src}
					alt={challenge.name}
					width={54}
					height={54}
					className="size-[54px] shrink-0 rounded-[12px] object-cover"
				/>

				<div className="min-w-0 flex-1">
					<p className="truncate text-[1rem] font-bold leading-none text-[#11181c]">
						{challenge.name}
					</p>
					<p className="mt-2 truncate text-[.8rem] leading-none text-[#334248]/85">
						{challenge.description}
					</p>
				</div>
			</Link>

			<button
				type="button"
				aria-label={`More options for ${challenge.name}`}
				className="inline-flex h-9 w-8 shrink-0 items-center justify-center rounded-md text-[#2d3d43] hover:bg-black/5"
			>
				<EllipsisVertical size={22} />
			</button>
		</div>
	);
}
