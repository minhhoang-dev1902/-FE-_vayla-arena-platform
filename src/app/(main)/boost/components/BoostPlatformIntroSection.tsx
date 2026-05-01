import { BOOST_BRAND_TEAL, BOOST_CARD_MUTED_BG } from "../constants";

/**
 * ”What is VAYLA Boost?” — card nhãn THE PLATFORM + copy giới thiệu (mock Boost).
 */
export function BoostPlatformIntroSection() {
	return (
		<section
			className="mt-8 rounded-[24px] px-6 py-8 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:px-8"
			style={{ backgroundColor: BOOST_CARD_MUTED_BG }}
			aria-labelledby="boost-intro-heading"
		>
			<p
				className="text-[11px] font-bold uppercase tracking-[0.22em]"
				style={{ color: BOOST_BRAND_TEAL }}
			>
				The platform
			</p>
			<h2
				id="boost-intro-heading"
				className="mt-3 text-xl font-bold leading-tight text-neutral-950 sm:text-2xl"
			>
				What is VAYLA Boost?
			</h2>
			<p className="mt-4 text-[15px] leading-relaxed text-neutral-800">
				VAYLA Boost is the next-generation fandom acceleration engine. We bridge the gap between
				global fans and premier entertainment IPs using secure on-chain transparency.
			</p>
		</section>
	);
}
