import Image from "next/image";

import shieldIcon from "@/assets/icons/shield-icon.svg";
import vaylaTokenIcon from "@/assets/images/vayla-symbol-cropped.png";
import { cn } from "@/share/lib/utils";

interface PolicyStatProps {
	label: string;
	value: string;
	unit?: string;
	className?: string;
	trailing?: React.ReactNode;
}

function PolicyStat({ label, value, unit, className, trailing }: PolicyStatProps) {
	return (
		<div
			className={cn(
				"relative flex items-center justify-between rounded-[16px] bg-[#F4F5F4] px-5 py-4",
				className,
			)}
		>
			<div>
				<p className="text-[11px] leading-[16px] font-semibold text-cus-title-form">{label}</p>
				<p className="mt-2 text-[20px] leading-[28px] font-bold tracking-tight text-dark-primary">
					{value}
					{unit ? <span className="ml-1 text-[14px] font-normal">{unit}</span> : null}
				</p>
			</div>
			{trailing}
		</div>
	);
}

export function Policy() {
	return (
		<section className="rounded-[24px] border border-[#EDEEEE] bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] mt-5">
			<header className="flex items-start justify-between">
				<div>
					<p className="text-[13px] tracking-[1px] text-[#666666] leading-[15px] font-semibold">
						POLICY
					</p>
					<p className="text-[18px] leading-[28px] font-bold text-dark-primary">Submission Rules</p>
				</div>

				<div className="flex items-center justify-center size-10 rounded-full bg-[#F5F5F5] border border-[#EDEEEE]">
					<Image src={shieldIcon} alt="Submission rules" width={14} height={17} />
				</div>
			</header>

			<div className="mt-5 grid grid-cols-2 gap-3">
				<PolicyStat label="Daily Upload Limit" value="2" unit="tracks" />
				<PolicyStat label="Upload Cost" value="10" unit="VAYLA" />
			</div>

			<PolicyStat
				className="mt-3"
				label="Platform Balance"
				value="50"
				unit="VAYLA"
				trailing={
					<Image
						src={vaylaTokenIcon}
						alt="VAYLA token"
						width={44}
						height={44}
						className="size-11 rounded-full"
					/>
				}
			/>
		</section>
	);
}
