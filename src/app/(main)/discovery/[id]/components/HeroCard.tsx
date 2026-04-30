import Image from "next/image";
import { useRouter } from "next/navigation";
import ClockIcon from "@/assets/icons/clock-icon.svg";
import imgChallengeDetailFallback from "@/assets/images/challenge-detail-fallback.png";
import type { EventClass } from "@/features/discovery/models/class/event.class";
import { Button } from "@/share/components/ui/button";
import { CustomBadge } from "@/share/components/ui/customs/custom-badge/CustomBadge";
import { CustomImage } from "@/share/components/ui/customs/custom-image/CustomImage";
import { NAVIGATE } from "@/share/contants/navigate";
import { formatEndsInDaysHours } from "@/share/utils/countdown";

export interface IHeroCardProps {
	event_detail: EventClass | undefined;
}

export function HeroCard(props: IHeroCardProps) {
	const router = useRouter();
	const { event_detail } = props;
	const handleClickJoinChallenge = () => {
		const eventId = event_detail?.id ?? "";
		if (eventId) {
			router.push(`${NAVIGATE.SUBMIT_TRACK}?eventId=${eventId}`);
		} else {
			router.push(`${NAVIGATE.SUBMIT_TRACK}`);
		}
	};
	return (
		<div className="relative mx-auto h-[560px] w-full  overflow-hidden rounded-[24px] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
			<CustomImage
				src={event_detail?.thumbnailUrl}
				fallback={imgChallengeDetailFallback}
				alt="Challenge detail hero"
				fill
				priority
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-[#001518]/95" />

			<div className="absolute inset-x-0 bottom-[28px] p-6">
				<CustomBadge
					label={event_detail?.status ?? ""}
					className="bg-secondary-button text-white"
				/>

				<h1 className="mt-3 text-[30px] leading-[37.5px] font-bold text-white tracking-tight">
					{event_detail?.name ?? ""}
				</h1>

				<Button
					type="button"
					className="mt-3 inline-flex h-[31px] min-w-[170px] items-center justify-center rounded-full bg-secondary-button px-6 text-[10px] font-bold tracking-[0.08em] text-white uppercase py-[8x]"
					onClick={handleClickJoinChallenge}
				>
					Join Challenge
				</Button>

				<div className="mt-4 flex items-center gap-2 text-point-2">
					<Image src={ClockIcon.src} alt="Clock" width={16} height={16} />
					<p className="text-[14px]  font-bold text-[#73F2D5]">
						Ends in {formatEndsInDaysHours(event_detail?.endDate ?? "")}
					</p>
				</div>
			</div>
		</div>
	);
}
