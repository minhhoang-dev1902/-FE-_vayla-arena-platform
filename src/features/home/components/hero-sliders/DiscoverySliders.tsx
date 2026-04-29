"use client";

import thumbnail from "@/assets/images/discovery-slider-thumbnail.png";
import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";
import { useRouter } from "next/navigation";

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
					<p className="text-center text-balance text-3xl font-semibold tracking-wide md:text-3xl text-white uppercase  px-2 ">
						Create - Earn Vayla Discovery
					</p>

					<p className="text-center text-balance text-[1rem] font-normal tracking-wide md:text-base text-white">
						Create & Earn enables users and artists to directly participate in content creation.
					</p>
					{/* <CountdownPill end={end} /> */}
				</div>

				<div className="flex justify-center absolute bottom-15 left-0 right-0 ">
					<Button onClick={handleGoToDiscovery} className="px-12 py-7 text-[1rem] font-semibold rounded-2xl w-full">
						Go to VAYLA Discovery
					</Button>
				</div>
			</div>
		</div>
	);
}
