import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import imgChallengeThumnailFallback from "@/assets/images/challenge-thumnails.png";
import type { IChallenge } from "@/features/discovery/models/inteface/challenge.interface";

interface IUpNextChallengeCardProps {
	challenge: IChallenge;
}

export function UpNextChallengeCard(props: IUpNextChallengeCardProps) {
	const { challenge } = props;

	return (
		<div className="flex items-center gap-4 rounded-[22px] bg-[#f1f4f6] px-4 py-4 shadow-[0_8px_18px_rgba(16,34,43,0.06)]">
			<Image
				src={imgChallengeThumnailFallback.src}
				alt={challenge.name}
				width={54}
				height={54}
				className="shrink-0 rounded-[12px] object-cover"
			/>

			<div className="min-w-0 flex-1">
				<p className="truncate text-[1rem] leading-none font-bold text-[#11181c]">
					{challenge.name}
				</p>
				<p className="mt-1 truncate text-[.8rem] leading-none text-[#334248]/85 mt-2">
					{challenge.description}
				</p>
			</div>

			<button
				type="button"
				aria-label={`Open ${challenge.name}`}
				className="inline-flex h-9 w-8 shrink-0 items-center justify-center rounded-md text-[#2d3d43] hover:bg-black/5"
			>
				<EllipsisVertical size={22} />
			</button>
		</div>
	);
}
