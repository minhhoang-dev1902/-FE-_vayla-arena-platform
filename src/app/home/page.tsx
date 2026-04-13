import { FUNDING_LIST_MOCK } from "@/features/fundings/datas/funding_datas";
import { FundingSliders } from "@/features/home/components/hero-sliders/FundingSliders";
import { CustomSlider } from "@/share/components/ui";

export default function HomePage() {
	const funding_data = FUNDING_LIST_MOCK[0];
	return (
		<div>
			<CustomSlider
				slides={[
					<FundingSliders key={1} funding_data={funding_data} />,
					<FundingSliders key={2} funding_data={funding_data} />,
					<FundingSliders key={3} funding_data={funding_data} />,
					<FundingSliders key={4} funding_data={funding_data} />,
					<FundingSliders key={5} funding_data={funding_data} />,
				]}
			/>
		</div>
	);
}
