"use client";

import { useCountdown } from "@/share/hooks/use-countdown";
import { cn } from "@/share/lib/utils";

export type CountdownPillProps = {
	end: Date;
	className?: string;
};

function SquareColon() {
	return (
		<div className="flex flex-col items-center justify-center gap-1">
			<span className="size-1 rounded-[1px] bg-white shadow-[0_0_1px_rgba(255,255,255,0.8)]" />
			<span className="size-1 rounded-[1px] bg-white shadow-[0_0_1px_rgba(255,255,255,0.8)]" />
		</div>
	);
}

function TimeBlock({ unit, value }: { unit: string; value: number }) {
	const shown = unit === "D" ? String(value) : String(value).padStart(2, "0");
	return (
		<span className="flex items-end gap-0.5">
			<span className="text-2xl leading-none font-bold tracking-tight text-white tabular-nums md:text-[2rem]">
				{shown}
			</span>
			<span className="pb-0.5 text-[0.7rem] font-bold uppercase leading-none text-white md:text-xs">
				{unit}
			</span>
		</span>
	);
}

function formatAriaLabel(parts: { d: number; h: number; m: number; s: number }): string {
	return `Còn lại ${String(parts.d)} ngày ${String(parts.h).padStart(2, "0")} giờ ${String(parts.m).padStart(2, "0")} phút ${String(parts.s).padStart(2, "0")} giây`;
}

export function CountdownPill({ end, className }: CountdownPillProps) {
	const parts = useCountdown(end);

	if (parts === null) {
		return (
			<div
				className={cn(
					"mx-auto h-14 max-w-xl rounded-full border border-white/45 bg-white/25 backdrop-blur-xs backdrop-saturate-150",
					className,
				)}
			/>
		);
	}

	return (
		<div
			role="timer"
			aria-live="polite"
			aria-label={formatAriaLabel(parts)}
			className={cn(
				"mx-auto inline-flex  items-center justify-center gap-3 rounded-full border border-white/45 bg-white/25 px-8 py-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45)] backdrop-blur-xs backdrop-saturate-150 md:gap-4 md:px-8 md:py-3",
				className,
			)}
		>
			<TimeBlock unit="D" value={parts.d} />
			<SquareColon />
			<TimeBlock unit="H" value={parts.h} />
			<SquareColon />
			<TimeBlock unit="M" value={parts.m} />
			<SquareColon />
			<TimeBlock unit="S" value={parts.s} />
		</div>
	);
}
