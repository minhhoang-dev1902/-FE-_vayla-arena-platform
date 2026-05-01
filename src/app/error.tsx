"use client";

import { useEffect } from "react";
import { AppErrorFallback } from "@/share/components/feedback/app-error-fallback";
import { NAVIGATE } from "@/share/contants/navigate";

/** Error boundary chung cho App Router (`app/error.tsx`). */
export default function AppErrorBoundary({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		if (process.env.NODE_ENV === "development") console.error("[AppRouteError]", error);
	}, [error]);

	return (
		<AppErrorFallback
			title="Something went wrong"
			description="Please try again. If this keeps happening, contact support."
			homeHref={NAVIGATE.DISCOVERY}
			homeLabel="Back to Discovery"
			reset={reset}
			digest={error.digest}
		/>
	);
}
