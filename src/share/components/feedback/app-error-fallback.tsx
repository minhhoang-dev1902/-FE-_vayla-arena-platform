"use client";

import Link from "next/link";
import { Button } from "@/share/components/ui/button";

const DEFAULT_HOME_HREF = "/discovery";

interface AppErrorFallbackProps {
	title: string;
	description: string;
	homeHref?: string;
	homeLabel?: string;
	reset?: () => void;
	resetLabel?: string;
	digest?: string;
}

/** Màn empty state lỗi / 404 dùng chung (đặt trong client boundary khi cần). */
export function AppErrorFallback({
	title,
	description,
	homeHref = DEFAULT_HOME_HREF,
	homeLabel = "Back to Discovery",
	reset,
	resetLabel = "Try again",
	digest,
}: AppErrorFallbackProps) {
	return (
		<div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-14">
			<div className="w-full max-w-md text-center">
				<p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#01A88E]">
					Vayla Arena
				</p>
				<h1 className="mt-3 font-sans text-[28px] font-bold tracking-tight text-dark-primary">
					{title}
				</h1>
				<p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
				{digest ? (
					<p className="mt-4 font-mono text-[11px] text-muted-foreground/70">Reference: {digest}</p>
				) : null}
				<div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
					{reset != null ? (
						<Button
							type="button"
							variant="outline"
							className="h-12 shrink-0 rounded-[14px] px-8 font-semibold"
							onClick={() => reset()}
						>
							{resetLabel}
						</Button>
					) : null}
					<Button
						asChild
						className="h-12 rounded-[14px] bg-[#01A88E] px-8 font-semibold text-white hover:bg-[#018a73]"
					>
						<Link href={homeHref}>{homeLabel}</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
