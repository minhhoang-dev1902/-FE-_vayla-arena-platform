"use client";

import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";

type CustomEmptyProps = {
	title?: string;
	description?: string;
	icon?: ReactNode;
	actionLabel?: string;
	onAction?: () => void;
	className?: string;
};

export function CustomEmpty({
	title = "No data found",
	description = "There is no data to display right now.",
	icon,
	actionLabel,
	onAction,
	className,
}: CustomEmptyProps) {
	return (
		<div
			className={cn(
				"flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background-card px-6 py-10 text-center",
				className,
			)}
		>
			<div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted/40 text-cus-muted">
				{icon ?? <Inbox className="size-5" />}
			</div>
			<p className="text-sm font-semibold text-dark-primary">{title}</p>
			<p className="mt-1 max-w-md text-xs text-dark-sub-primary">{description}</p>
			{actionLabel ? (
				<Button type="button" variant="outline" onClick={onAction} className="mt-4">
					{actionLabel}
				</Button>
			) : null}
		</div>
	);
}
