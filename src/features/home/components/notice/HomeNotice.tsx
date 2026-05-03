import Image from "next/image";
import notice from "@/assets/icons/lound_speaker-icon.svg";

const NOTICE_LABEL = "[Boost] Waterbomb SEOUL Festival Open";

export const HomeNotice = () => {
	return (
		<div className="flex items-center gap-3 overflow-hidden rounded-2xl bg-dark-primary p-4">
			<p className="sr-only">{NOTICE_LABEL}</p>
			<Image
				width={24}
				height={24}
				src={notice}
				alt=""
				className="size-6 shrink-0 text-text-subtle"
				aria-hidden
			/>
			<div
				className="relative min-w-0 flex-1 overflow-hidden mask-[linear-gradient(90deg,transparent,black_12px,black_calc(100%-12px),transparent)]"
				aria-hidden
			>
				<div className="animate-home-notice-marquee flex w-max will-change-transform">
					<span className="mr-12 shrink-0 text-sm font-semibold text-text-subtle whitespace-nowrap">
						{NOTICE_LABEL}
					</span>
					<span className="mr-12 shrink-0 text-sm font-semibold text-text-subtle whitespace-nowrap">
						{NOTICE_LABEL}
					</span>
				</div>
			</div>
		</div>
	);
};
