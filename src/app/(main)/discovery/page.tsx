import { TRACK_DATA_TEST } from "@/app/(common)/home/data_test";
import { ChallengeSlide } from "@/features/discovery/components/hero-sliders/ChallengeSlide";
import { TrackSlide } from "@/features/discovery/components/hero-sliders/TrackSlide";
import type { IChallenge } from "@/features/discovery/models/inteface/challenge.interface";
import type { ITrack } from "@/features/discovery/models/inteface/track.interface";
import { CustomSlider } from "@/share/components/ui";
import { Button } from "@/share/components/ui/button";
import { HightlightChallengeCard } from "./components/HightlightChallengeCard";
import { TopChallengesCard } from "./components/TopChallengesCard";
import { WhatIsDiscovery } from "./components/WhatIsDiscovery";
import { CHALLENGE_DATA_TEST } from "./data-test";

export default function DiscoveryPage() {
	const challenge: IChallenge = CHALLENGE_DATA_TEST[0];
	const track: ITrack = TRACK_DATA_TEST[0];

	return (
		<div>
			<CustomSlider
				slides={[
					<ChallengeSlide key={1} challenge={challenge} />,
					<TrackSlide key={2} track={track} />,
				]}
			/>

			<div className="mt-[40px]">
				<Button className="w-full cursor-pointer bg-primary-button  text[1rem] font-semibold rounded-xl h-[60px]">
					<p className="text-white">Submit Track</p>
				</Button>

				<div>
					<TopChallengesCard challenge={challenge} />
					<WhatIsDiscovery />
				</div>

				<HightlightChallengeCard challenge={challenge} />
			</div>
		</div>
	);
}
