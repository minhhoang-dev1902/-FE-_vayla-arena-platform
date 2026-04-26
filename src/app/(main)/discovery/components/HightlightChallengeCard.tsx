import Image from "next/image";
import CupIcon from "@/assets/icons/cup-icon.svg";
import imgChallengeThumnailFallback from "@/assets/images/challenge-thumnails.png";
import type { IChallenge } from "@/features/discovery/models/inteface/challenge.interface";
import { Button } from "@/share/components/ui/button";
import { CustomBadge } from "@/share/components/ui/customs/custom-badge/CustomBadge";
import { formatEndsInDaysHours } from "@/share/utils/countdown";

interface IHightlightChallengeCardProps {
	challenge: IChallenge;
}

const DEFAULT_ENDS_AT = "2026-05-01T15:00:00+09:00";

export function HightlightChallengeCard({ challenge }: IHightlightChallengeCardProps) {
	const { name, description, thumbnailUrl, endDate, vaylaPrizePool } = challenge;
	const remain = formatEndsInDaysHours(endDate, DEFAULT_ENDS_AT);

	return (
		<div className="w-full rounded-[2rem] bg-hightlight-challenge-card px-6 py-7 shadow-[0_12px_26px_rgba(11,44,48,0.12)] mt-20">
			<div className="flex items-start gap-5">
				<Image
					src={thumbnailUrl || imgChallengeThumnailFallback.src}
					alt={name}
					width={126}
					height={126}
					className="size-[126px] rounded-full object-cover"
				/>

				<div className="min-w-0 flex-1">
					<div className="flex items-center justify-between gap-3">
						<p className="truncate text-[18px] leading-none font-bold text-dark-primary">{name}</p>
						<CustomBadge
							label="Active"
							className="bg-[#D1FAE5] border border-[#A7F3D0] border-2 text-[#047857] px-2 py-1 rounded-full"
						/>
					</div>

					<p className="mt-1 line-clamp-3 text-[0.875rem] leading-[1.25] font-medium text-dark-sub-primary">
						{description}
					</p>

					<div className="mt-4 inline-flex items-center gap-3 rounded-full bg-white/60 px-5 py-2 text-[#006a64] shadow-[inset_0_0_0_1px_rgba(0,132,118,0.15)] border border-white">
						<Image src={CupIcon.src} alt="Cup" width={16} height={16} />
						<span className="text-[11px] leading-none font-bold">
							PRIZE: {vaylaPrizePool || "500"} VAYLA
						</span>
					</div>
				</div>
			</div>

			<div className="mt-4 flex items-center justify-between gap-5">
				<p className="text-[12px] leading-none font-bold text-dark-secondary">{remain}</p>
				<Button className="h-[44px] min-w-[55%] rounded-[10px] bg-primary-button px-8 text-[0.875rem] font-bold text-white hover:bg-[#00ad95]">
					Explore Challenge
				</Button>
			</div>
		</div>
	);
}
