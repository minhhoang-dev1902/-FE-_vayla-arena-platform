import { Sparkles } from "lucide-react";
import { BOOST_BRAND_TEAL } from "../constants";

/**
 * ”Curated by Fans, Powered by Web3” — card trắng, icon Sparkles trong vòng teal nhạt.
 */
export function BoostCuratedFansSection() {
	return (
		<section
			className="mt-6 rounded-[24px] border border-neutral-100 bg-white px-6 py-10 text-center shadow-[0_12px_40px_rgba(0,0,0,0.14)] sm:px-10"
			aria-labelledby="boost-curated-heading"
		>
			<div
				className="mx-auto flex size-[4.25rem] items-center justify-center rounded-full"
				style={{ backgroundColor: `${BOOST_BRAND_TEAL}22` }}
			>
				<Sparkles
					className="size-9 shrink-0"
					style={{ color: BOOST_BRAND_TEAL }}
					strokeWidth={2}
					aria-hidden
				/>
			</div>
			<h2
				id="boost-curated-heading"
				className="mt-6 text-lg font-bold leading-snug text-neutral-950 sm:text-xl"
			>
				Curated by Fans, Powered by Web3
			</h2>
		</section>
	);
}
