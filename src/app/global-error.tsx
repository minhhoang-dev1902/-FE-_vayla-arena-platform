"use client";

import "./globals.css";
import { AppErrorFallback } from "@/share/components/feedback/app-error-fallback";
import { NAVIGATE } from "@/share/contants/navigate";
import { allerta, averta, inter } from "@/share/lib/fonts";

/** Lỗi nghiêm trọng tại root (`app/global-error.tsx`) — thay thế toàn bộ `RootLayout`. */
export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="en">
			<body
				className={`${inter.variable} ${allerta.variable} ${averta.variable} font-sans antialiased`}
			>
				<AppErrorFallback
					title="Something went wrong"
					description="A critical error occurred while loading the app. Please reload and try again."
					homeHref={NAVIGATE.DISCOVERY}
					homeLabel="Back to Discovery"
					reset={reset}
					digest={error.digest}
				/>
			</body>
		</html>
	);
}
