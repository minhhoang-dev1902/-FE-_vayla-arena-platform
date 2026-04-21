"use client";

import thumbnail from "@/assets/images/discovery-slider-thumbnail.png";
import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";

export type TProps = {
	className?: string;
};

export function DiscoverySliders({ className }: TProps) {
	return (
		<div className={cn("relative h-full w-full overflow-hidden", className)}>
			<div
				aria-hidden
				style={{ backgroundImage: `url(${thumbnail.src})` }}
				className="absolute inset-0 scale-110 bg-cover bg-center blur-[5px]"
			/>
			<div aria-hidden className="absolute inset-0 bg-black/45" />

			<div className="relative flex h-full ">
				<div className="flex flex-col items-center justify-start w-full gap-6 absolute top-30 left-0 right-0">
					<h1 className="text-center text-balance text-2xl font-semibold tracking-wide md:text-3xl text-white uppercase  px-2 ">
						Create - Earn Vayla Discovery
					</h1>

					<p className="text-center text-balance text-sm font-normal tracking-wide md:text-base text-white">
						Create & Earn enables users and artists to directly participate in content creation.
					</p>
					{/* <CountdownPill end={end} /> */}
				</div>

				<div className="flex justify-center absolute bottom-15 left-0 right-0">
					<Button className="px-12 py-7 text-lg font-semibold">Go to VAYLA Discovery</Button>
				</div>
			</div>
		</div>
	);
}
