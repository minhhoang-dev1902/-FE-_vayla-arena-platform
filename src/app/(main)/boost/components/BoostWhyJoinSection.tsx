import { FileText, type LucideIcon, ShieldCheck } from "lucide-react";
import { BOOST_BRAND_TEAL, BOOST_CARD_MUTED_BG } from "../constants";

type ReasonItemProps = {
	title: string;
	description: string;
	icon: LucideIcon;
};

function ReasonItem({ title, description, icon: Icon }: ReasonItemProps) {
	return (
		<li className="flex gap-4">
			<div
				className="flex size-11 shrink-0 items-center justify-center rounded-full"
				style={{ backgroundColor: `${BOOST_BRAND_TEAL}1A` }}
			>
				<Icon
					className="size-[22px] shrink-0"
					style={{ color: BOOST_BRAND_TEAL }}
					strokeWidth={2}
					aria-hidden
				/>
			</div>
			<div className="min-w-0 pt-0.5">
				<h3 className="text-[16px] font-bold leading-tight text-neutral-950">{title}</h3>
				<p className="mt-2 text-[14px] leading-relaxed text-neutral-700">{description}</p>
			</div>
		</li>
	);
}

/**
 * ”Why Join Boost?” — hai lý do với icon shield / file (mock Boost).
 */
export function BoostWhyJoinSection() {
	return (
		<section
			className="mt-6 rounded-[24px] px-6 py-8 shadow-[0_12px_40px_rgba(0,0,0,0.14)] sm:px-8"
			style={{ backgroundColor: BOOST_CARD_MUTED_BG }}
			aria-labelledby="boost-why-heading"
		>
			<h2 id="boost-why-heading" className="text-xl font-bold text-neutral-950 sm:text-[1.35rem]">
				Why Join Boost?
			</h2>
			<ul className="mt-8 space-y-8">
				<ReasonItem
					icon={ShieldCheck}
					title="Exclusive Access"
					description="Priority booking for exclusive parties and festivals available globally only to Boosters."
				/>
				<ReasonItem
					icon={FileText}
					title="Direct Support"
					description="Your USDT goes directly to the production of your favorite festivals and artist world tours."
				/>
			</ul>
		</section>
	);
}
