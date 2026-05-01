"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import checkedShieldIcon from "@/assets/icons/checked-shield-icon.svg";
import vaylaSymbolCustomIcon from "@/assets/images/vayla-symbol-custom-icon.png";

interface LoadingViewProps {
	/** When flipped to false the bar completes to 100% then onComplete fires after 500 ms */
	loading: boolean;
	onComplete?: () => void;
}

const TICK_MS = 60;
const STALL_AT = 78;
const COMPLETE_DELAY_MS = 1000;

export function LoadingView({ loading, onComplete }: LoadingViewProps) {
	const [progress, setProgress] = useState(0);
	const onCompleteRef = useRef(onComplete);
	onCompleteRef.current = onComplete;

	useEffect(() => {
		if (loading) {
			const id = setInterval(() => {
				setProgress(p => {
					if (p >= STALL_AT) return p;
					// Ease: fast at start, very slow near stall
					const remaining = STALL_AT - p;
					const step = Math.max(0.15, remaining * 0.025);
					return Math.min(p + step, STALL_AT);
				});
			}, TICK_MS);
			return () => clearInterval(id);
		}

		setProgress(100);
		const t = setTimeout(() => onCompleteRef.current?.(), COMPLETE_DELAY_MS);
		return () => clearTimeout(t);
	}, [loading]);

	return (
		<main className="flex min-h-dvh flex-col items-center justify-between bg-white px-9 pb-12 pt-0">
			<div className="flex flex-1 flex-col items-center pt-[80px]">
				<div className="relative flex items-center justify-center">
					<Image
						src={vaylaSymbolCustomIcon.src}
						alt="Vayla"
						width={192}
						height={192}
						className="object-contain"
					/>
				</div>

				{/* Text */}
				<p className="mt-10 text-[11px] font-semibold uppercase tracking-[1.1px] leading-[16.5px] text-text-link">
					Transaction Pending
				</p>
				<p className="text-center text-[30px] font-bold leading-[36px] tracking-[1.1px] text-dark-primary">
					Submitting your
					<br />
					Vote on-chain
				</p>
				<p className="mt-3 text-center text-[15px] leading-[24.38px] text-dark-sub-primary">
					This may take a few seconds
				</p>
			</div>

			{/* ── Bottom: progress bar ── */}
			<div className="w-full max-w-[390px]">
				<div className="mb-2 flex items-center justify-between">
					<span className="text-[12px] font-bold uppercase tracking-[1px] text-[#A3A3A3]">
						Blockchain Confirmation
					</span>
					<span className="text-[12px] font-bold uppercase text-text-link">
						{loading ? "Syncing" : "Done"}
					</span>
				</div>

				{/* Track */}
				<div className="h-[6px] w-full overflow-hidden rounded-full bg-[#0F2926]">
					<div
						className="h-full rounded-full bg-cus-progress"
						style={{
							width: `${progress}%`,
							transition: "width 900ms ease-out",
						}}
					/>
				</div>

				<div className="mt-8 flex items-center justify-center gap-2">
					<Image src={checkedShieldIcon.src} alt="Checked Shield" width={14} height={14} />
					<span className="text-[12px] leading-[18px] text-[#A3A3A3]">
						Securely processing on BSC Mainnet
					</span>
				</div>
			</div>
		</main>
	);
}
