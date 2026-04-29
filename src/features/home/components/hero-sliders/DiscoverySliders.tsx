"use client";

import { useRouter } from "next/navigation";
import thumbnail from "@/assets/images/discovery-slider-thumbnail.png";
import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";

export type TProps = {
	className?: string;
};

export function DiscoverySliders({ className }: TProps) {
	const router = useRouter();
	const handleGoToDiscovery = () => {
		router.push("/discovery");
	};

	return (
		<div className={cn("relative h-full w-full overflow-hidden px-6", className)}>
			<div
				aria-hidden
				style={{ backgroundImage: `url(${thumbnail.src})` }}
				className="absolute inset-0 scale-110 bg-cover bg-center blur-[5px]"
			/>
			<div aria-hidden className="absolute inset-0 bg-black/45" />

			<div className="relative flex h-full ">
				<div className="flex flex-col items-center justify-start w-full gap-6 absolute top-30 left-0 right-0">
					<p className="text-center text-balance text-[32px] font-semibold tracking-wide md:text-3xl text-white uppercase  px-2 ">
						Create - Earn Vayla Discovery
					</p>

					<p className="text-center text-balance text-[1rem] font-normal md:text-base text-white leading-[26px]">
						Create & Earn enables users and artists to directly participate in content creation.
					</p>
					{/* <CountdownPill end={end} /> */}
				</div>

				<div className="flex justify-center absolute bottom-15 left-0 right-0 mx-auto">
					<Button
						onClick={handleGoToDiscovery}
						className="px-12 h-[60px] text-[1rem] font-semibold rounded-[16px] w-full bg-[#00C0A3]"
					>
						Go to VAYLA Discovery
					</Button>
				</div>
			</div>
		</div>
	);
}
