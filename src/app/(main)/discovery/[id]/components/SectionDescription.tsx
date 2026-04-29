import loupeIcon from "@/assets/icons/loupe-icon.svg";
import tickIcon from "@/assets/icons/tick-icon.svg";
import infoIcon from "@/assets/icons/info-icon.svg";
import Image from "next/image";


const LIST_LOOKING_FOR = [
	{
		id: 1,
		title: "Night drives and neon reflections.",
	},
	{
		id: 2,
		title: "Club atmosphere and synth textures.",
	},
	{
		id: 3,
		title: "Urban energy: Electronic, pop, synthwave, house, and experimental sounds.",
	},
];

export function SectionDescription() {
	return (
		<div className="mt-9 pb-[36px] flex flex-col gap-[40px]">
			<section className="rounded-[12px] bg-cus-background-section p-6">
				<p className="text-[1.25rem] leading-[28px] font-bold text-dark-primary">About This Challenge</p>
				<p className="mt-4 text-[1rem] leading-[26px] text-[#3B4A46]">
					Neon Night Beat Discovery explores futuristic city vibes, glowing late-night energy, and
					bold electronic sound. This month&apos;s theme invites creators to capture the feeling of
					neon lights, movement, and after-dark emotion through music.
				</p>
			</section>

			<section className="rounded-3xl bg-cus-background-section p-6">
				<div className="flex items-center gap-3">
					<Image src={loupeIcon} alt="" width={18} height={18} />

					<p className="text-[1.25rem] leading-[28px] font-bold text-[#181C1E]">What We&apos;re Looking For</p>
				</div>

				<p className="mt-4 text-[0.875rem] leading-[22.75px] text-[#3B4A46]">
					We&apos;re looking for tracks inspired by the theme&apos;s core elements:
				</p>

				<div className="flex flex-col gap-4 mt-4">
					{LIST_LOOKING_FOR.map((item) => (
						<div key={item.id} className="flex items-start gap-3">
							<Image src={tickIcon} alt="" width={18} height={18} className="mt-1 shrink-0" />
							<p className="text-[0.875rem] leading-[22.75px] text-[#3B4A46]">{item.title}</p>
						</div>
					))}
				</div>
			</section>

			<section className="rounded-[12px] border-l-6 border-secondary-button bg-[#E5E9EB] p-6">
				<div className="flex items-start gap-3">
					<Image src={infoIcon} alt="" width={18} height={18} className="shrink-0" />

					<div>
						<p className="text-[14px] leading-[20px] text-[#181C1E] font-bold uppercase">
							Submission Note
						</p>
						<p className="mt-1 text-[14px] leading-[21px] text-[#3B4A46]">
							Submit one original track that matches this month&apos;s theme. Make sure your
							YouTube link is public or unlisted, and add a short description to help explain the
							mood and concept of your track.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}