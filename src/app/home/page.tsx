import { FUNDING_LIST_MOCK } from "@/features/fundings/datas/funding_datas";
import { DiscoverySliders } from "@/features/home/components/hero-sliders/DiscoverySliders";
import { FundingSliders } from "@/features/home/components/hero-sliders/FundingSliders";
import { VoteOnTrendsSliders } from "@/features/home/components/hero-sliders/VoteOnTrendsSliders";
import { HomeNotice } from "@/features/home/components/notice/HomeNotice";
import { CustomSlider } from "@/share/components/ui";

export default function HomePage() {
	const funding_data = FUNDING_LIST_MOCK[0];
	return (
		<div>
			<CustomSlider
				slides={[
					<FundingSliders key={1} funding_data={funding_data} />,
					<DiscoverySliders key={2} />,
					<VoteOnTrendsSliders key={3} />,
				]}
			/>
			<div className="px-6 mt-[2rem]">
				<HomeNotice />
			</div>
		</div>
	);
}
