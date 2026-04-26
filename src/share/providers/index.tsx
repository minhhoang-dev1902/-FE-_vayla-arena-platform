"use client";

import { QueryProvider } from "./query-provider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			{/* others providers */}
			{children}
		</QueryProvider>
	);
}
