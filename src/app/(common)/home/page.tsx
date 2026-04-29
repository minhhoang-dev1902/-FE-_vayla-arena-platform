"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { FUNDING_LIST_MOCK } from "@/features/fundings/datas/funding_datas";
import type { IFunding } from "@/features/fundings/models/interface/funding.interface";
import { DiscoverySliders } from "@/features/home/components/hero-sliders/DiscoverySliders";
import { FundingSliders } from "@/features/home/components/hero-sliders/FundingSliders";
import { VoteOnTrendsSliders } from "@/features/home/components/hero-sliders/VoteOnTrendsSliders";
import { HomeNotice } from "@/features/home/components/notice/HomeNotice";
import { BoostTab } from "@/features/home/components/tabs/boost/BoostTab";
import { DiscoveryTab } from "@/features/home/components/tabs/discovery/DiscoveryTab";
import { HomeTab } from "@/features/home/components/tabs/home/HomeTab";
import { CustomSlider } from "@/share/components/ui";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/share/components/ui/tabs";

export default function HomePage() {
	const tab = 0;
	const defaultTab = tab === 0 ? "home" : "discovery";
	const funding_data: IFunding = FUNDING_LIST_MOCK[0];

	const { getAccessToken } = usePrivy();
	useEffect(() => {
		async function fetchToken() {
			const _accessToken = await getAccessToken();
		}

		fetchToken();
	}, [getAccessToken]);
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

				<div className="w-full mt-[1.5rem]">
					<Tabs defaultValue={defaultTab} key={defaultTab} className="mt-4 w-full">
						<TabsList className="flex h-auto w-full px-1 py-6">
							<TabsTrigger
								value="home"
								className="text-sm font-semibold py-4 px-7 data-active:text-dark-primary text-muted-foreground"
							>
								<p className="text-[1rem] font-semibold">Home</p>
							</TabsTrigger>
							<TabsTrigger
								value="boost"
								className="text-sm font-semibold py-4 px-7 data-active:text-dark-primary text-muted-foreground"
							>
								<p className="text-[1rem] font-semibold">Boost</p>
							</TabsTrigger>
							<TabsTrigger
								value="discovery"
								className="text-sm font-semibold py-4 px-7 data-active:text-dark-primary text-muted-foreground"
							>
								<p className="text-[1rem] font-semibold">Discovery</p>
							</TabsTrigger>
						</TabsList>

						<div>
							<TabsContent value="home">
								<HomeTab />
							</TabsContent>
							<TabsContent value="boost">
								<BoostTab />
							</TabsContent>
							<TabsContent value="discovery">
								<DiscoveryTab />
							</TabsContent>
						</div>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
