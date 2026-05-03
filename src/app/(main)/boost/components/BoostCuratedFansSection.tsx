import Image from "next/image";
import starIcon from "@/assets/icons/star-icon.svg";

export function BoostCuratedFansSection() {
	return (
		<section className="mt-8" aria-labelledby="boost-curated-heading">
			<div className="mx-auto flex items-center justify-center rounded-full bg-[#F0FDFA] p-6 w-fit">
				<Image src={starIcon} alt="star" width={33} height={33} />
			</div>
			<p
				id="boost-curated-heading"
				className="text-[20px] text-[#181C1E] leading-[28px] font-bold mt-[16px] max-w-[200px] mx-auto text-center"
			>
				Curated by Fans, Powered by Web3
			</p>
		</section>
	);
}
