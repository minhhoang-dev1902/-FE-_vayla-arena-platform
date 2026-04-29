"use client";

import PrivyProviders from "./privy-provider";
import { QueryProvider } from "./query-provider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<PrivyProviders>
			<QueryProvider>{children}</QueryProvider>
		</PrivyProviders>
	);
}
