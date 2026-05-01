import { Blocks, Gift, type LucideIcon, Search, Wallet } from "lucide-react";
import { BOOST_BRAND_TEAL, BOOST_CARD_MUTED_BG } from "../constants";

type StepDef = {
	title: string;
	description: string;
	icon: LucideIcon;
};

const STEPS: readonly StepDef[] = [
	{
		title: "Project Discovery",
		description: "Check out and select projects to fund.",
		icon: Search,
	},
	{
		title: "Participate with USDT",
		description: "Verify your funding with crypto assets.",
		icon: Wallet,
	},
	{
		title: "On-chain Record",
		description: "All participation is transparently recorded on the blockchain.",
		icon: Blocks,
	},
	{
		title: "Earn Rewards",
		description: "Receive NFTs and special benefits based on performance.",
		icon: Gift,
	},
];

const LINE_CSS = `${BOOST_BRAND_TEAL}B3` as const;

/**
 * Vertical stepper ”How Funding Works” (đường dọc + vòng teal trên nền thẻ xám nhạt).
 */
export function BoostHowFundingWorksSection() {
	return (
		<section
			className="mt-6 rounded-[24px] px-6 py-10 shadow-[0_12px_40px_rgba(0,0,0,0.14)] sm:px-8"
			style={{ backgroundColor: BOOST_CARD_MUTED_BG }}
			aria-labelledby="boost-how-heading"
		>
			<h2
				id="boost-how-heading"
				className="text-center text-xl font-bold text-neutral-950 sm:text-[1.35rem]"
			>
				How Funding Works
			</h2>
			<p className="mx-auto mt-3 max-w-md text-center text-[14px] leading-relaxed text-neutral-700">
				Through transparent on-chain mechanism and ecosystem, the world can become a playground of
				K-Culture projects.
			</p>

			<ol className="relative mx-auto mt-10 max-w-lg list-none p-0">
				{STEPS.map((step, idx) => {
					const Icon = step.icon;
					const isLast = idx === STEPS.length - 1;
					return (
						<li key={step.title} className="flex gap-4">
							<div className="flex w-10 shrink-0 flex-col items-center">
								<div
									className="relative z-[1] flex size-10 items-center justify-center rounded-full bg-white"
									style={{ boxShadow: `0 0 0 2px ${BOOST_BRAND_TEAL}` }}
								>
									<Icon
										className="size-[18px]"
										style={{ color: BOOST_BRAND_TEAL }}
										strokeWidth={2}
									/>
								</div>
								{!isLast ? (
									<div
										className="mt-2 w-[2px] min-h-[3.5rem] flex-1"
										style={{ backgroundColor: LINE_CSS }}
										aria-hidden
									/>
								) : null}
							</div>
							<div className={`min-w-0 flex-1 ${isLast ? "pb-1" : "pb-10"}`}>
								<h3 className="pt-0.5 text-[15px] font-bold leading-tight text-neutral-950">
									{step.title}
								</h3>
								<p className="mt-1 max-w-[19rem] text-[14px] leading-relaxed text-neutral-700">
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
