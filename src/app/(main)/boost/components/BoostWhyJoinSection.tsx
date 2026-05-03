import Image, { type StaticImageData } from "next/image";
import accessIcon from "@/assets/icons/access-icon.svg";
import walletIcon from "@/assets/icons/wallet-icon.svg";
import { BOOST_CARD_MUTED_BG } from "../constants";

type ReasonItemProps = {
	title: string;
	description: string;
	icon: StaticImageData;
	iconWidth?: number;
	iconHeight?: number;
};

function ReasonItem({
	title,
	description,
	icon,
	iconWidth = 22,
	iconHeight = 22,
}: ReasonItemProps) {
	return (
		<li className="">
			<Image src={icon} alt="" width={iconWidth} height={iconHeight} />

			<div className="w-fit">
				<p className="text-[18px] font-bold leading-[28px] text-[18px] text-[#181C1E] mt-[12px]">
					{title}
				</p>
				<p className="mt-2 text-[14px] leading-[20px] text-[#3B4A46]">{description}</p>
			</div>
		</li>
	);
}

export function BoostWhyJoinSection() {
	return (
		<section
			className="mt-[52px] rounded-[24px] bg-[#F1F4F6] p-8 sm:px-8 max-w-2xl mx-auto"
			style={{ backgroundColor: BOOST_CARD_MUTED_BG }}
			aria-labelledby="boost-why-heading"
		>
			<p id="boost-why-heading" className="text-[30px] font-bold leading-[36px] text-[#181C1E]">
				Why Join Boost?
			</p>
			<ul className="mt-8 space-y-8">
				<ReasonItem
					icon={accessIcon}
					iconWidth={22}
					iconHeight={21}
					title="Exclusive Access"
					description="Priority booking for exclusive parties and festivals available globally only to Boosters."
				/>
				<ReasonItem
					icon={walletIcon}
					iconWidth={19}
					iconHeight={18}
					title="Direct Support"
					description="Your USDT goes directly to the production of your favorite festivals and artist world tours."
				/>
			</ul>
		</section>
	);
}
