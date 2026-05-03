import Image, { type StaticImageData } from "next/image";
import gift2Icon from "@/assets/icons/gift-2-icon.svg";
import magnifyingGlassIcon from "@/assets/icons/magnifying-glass-icon.svg";
import shield2Icon from "@/assets/icons/shield-2-icon.svg";
import wallet2Icon from "@/assets/icons/wallet-2-icon.svg";
import { BOOST_BRAND_TEAL } from "../constants";

type StepDef = {
	title: string;
	description: string;
	icon: StaticImageData;
	iconWidth: number;
	iconHeight: number;
};

const STEPS: readonly StepDef[] = [
	{
		title: "Project Discovery",
		description: "Check out and select projects to fund.",
		icon: magnifyingGlassIcon,
		iconWidth: 18,
		iconHeight: 18,
	},
	{
		title: "Participate with USDT",
		description: "Verify your funding with crypto assets.",
		icon: wallet2Icon,
		iconWidth: 19,
		iconHeight: 18,
	},
	{
		title: "On-chain Record",
		description: "All participation is transparently recorded on the blockchain.",
		icon: shield2Icon,
		iconWidth: 18,
		iconHeight: 23,
	},
	{
		title: "Earn Rewards",
		description: "Receive NFTs and special benefits based on performance.",
		icon: gift2Icon,
		iconWidth: 20,
		iconHeight: 19,
	},
];

const _LINE_CSS = `${BOOST_BRAND_TEAL}B3` as const;

export function BoostHowFundingWorksSection() {
	return (
		<section
			className="mt-6 rounded-[24px] bg-[#F1F5F9] px-8 py-16 sm:px-8 max-w-2xl mx-auto"
			aria-labelledby="boost-how-heading"
		>
			<p
				id="boost-how-heading"
				className="text-center text-[24px] font-bold text-[#0F172A] sm:text-[1.35rem]"
			>
				How Funding Works
			</p>
			<p className="mx-auto mt-3 max-w-md text-center text-[14px] leading-[28px] text-[#475569]">
				Through transparent on-chain mechanism and ecosystem, the world can become a playground of
				K-Culture projects.
			</p>

			<ol className="relative mx-auto mt-10 max-w-lg list-none p-0">
				{STEPS.map((step, idx) => {
					const isLast = idx === STEPS.length - 1;
					return (
						<li key={step.title} className="flex gap-4">
							<div className="flex w-10 shrink-0 flex-col items-center">
								<div className="w-[45px] h-[45px] bg-white rounded-[16px] flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
									<Image
										src={step.icon}
										alt=""
										width={step.iconWidth}
										height={step.iconHeight}
										className="shrink-0"
									/>
								</div>

								{!isLast ? (
									<div className="min-h-[3.5rem] w-[2px] flex-1 bg-[#00D1C133]" aria-hidden />
								) : null}
							</div>
							<div className={` ml-[20px] min-w-0 flex-1 ${isLast ? "pb-1" : "pb-10"}`}>
								<p className="pt-0.5 text-[18px] font-bold leading-tight text-[#0F172A]">
									{step.title}
								</p>
								<p className="mt-1 max-w-[19rem] text-[14px] leading-[22px] text-[#64748B]">
									{step.description}
								</p>
							</div>
						</li>
					);
				})}
			</ol>
		</section>
	);
}
