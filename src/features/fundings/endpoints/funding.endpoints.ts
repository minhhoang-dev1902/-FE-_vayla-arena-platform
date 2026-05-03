export const FUNDING_ENDPOINTS = {
	/** Boost (Funding) — public listing, Sprint 8 */
	LIST: "/funding",
	/** React Query key — payload `{ id }` keeps cache per project */
	DETAIL_QUERY_KEY: "funding-detail",
} as const;

export function fundingDetailPath(id: string): string {
	return `/funding/${encodeURIComponent(id)}`;
}
