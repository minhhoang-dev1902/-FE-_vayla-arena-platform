import Image from "next/image";
import notice from "@/assets/icons/lound_speaker-icon.svg";
export const HomeNotice = () => {
	return (
		<div className="flex items-center gap-2 bg-dark-primary p-4 rounded-2xl">
			<Image width={100} height={100} src={notice} alt="notice" className="size-6" />
			<p className="text-text-subtle text-sm font-semibold">
				[Boost] Waterbomb SEOUL Festival Open
			</p>
		</div>
	);
};
