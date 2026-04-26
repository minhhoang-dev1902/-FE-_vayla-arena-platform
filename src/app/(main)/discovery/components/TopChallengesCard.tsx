import { Music } from "lucide-react";
import Image from "next/image";
import imgChallengeThumnailFallback from "@/assets/images/challenge-thumnails.png";
import type { IChallenge } from "@/features/discovery/models/inteface/challenge.interface";
import { Button } from "@/share/components/ui/button";
import { CustomBadge } from "@/share/components/ui/customs/custom-badge/CustomBadge";
import { ShadowCard } from "@/share/components/ui/customs/custom-cards/ShadowCard";
import { UpNextChallengeCard } from "./UpNextChallengeCard";

interface ITopChallengesCardProps {
	challenge: IChallenge;
}

export function TopChallengesCard(props: ITopChallengesCardProps) {
	const { challenge } = props;

	return (
		<div className="bg-[#f4f9fb] px-3 mt-6 pt-8 pb-20">
			<p className="text-2xl font-semibold text-dark-primary">Start Listening</p>
			<p className="text-sm text-[#222423]/80 mt-2">
				Listen to featured tracks from this month's challenge
			</p>

			<ShadowCard className="bg-[#f6fbfb] mt-8">
				<div className="flex items-start gap-2 justify-between">
					<Image
						src={imgChallengeThumnailFallback.src}
						alt={challenge.name}
						width={100}
						height={100}
						className="rounded-xl"
					/>
					<CustomBadge label="Featured" />
				</div>

				<p className="text-xl font-semibold text-dark-primary mt-6">{challenge.name}</p>
				<p className="text-sm text-[#222423]/80 mt-2">{challenge.description}</p>

				<div className="flex items-center gap-2 mt-3">
					<div className="flex items-center gap-2 px-1 py-1 bg-dark-primary/80 rounded-[5px] w-fit h-fit">
						<Music size={10} />
					</div>
					<p className="text-[14px] text-dark-primary/80">
						{challenge.submissionCount} submissions
					</p>
				</div>

				<Button className="mt-7 h-[58px] w-full rounded-[18px] bg-gradient-to-r from-[#006a69] to-[#4bd8cc]  font-semibold text-white shadow-[0_10px_24px_rgba(0,106,105,0.35)] hover:opacity-95  text-[1rem] flex items-center justify-center">
					<span className="mr-2">▶</span>
					<span>Start Listening</span>
				</Button>
			</ShadowCard>

			<div className="mt-12">
				<p className="text-lg font-semibold text-dark-primary mt-8">Up Next</p>
				<div className="flex flex-col gap-4 mt-2">
					<UpNextChallengeCard challenge={challenge} />
					<UpNextChallengeCard challenge={challenge} />
				</div>
			</div>
		</div>
	);
}
