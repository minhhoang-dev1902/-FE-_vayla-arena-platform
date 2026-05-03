export const LAYOUT = {
	/** Matches `h-14` (3.5rem / 56px) on the CommonHeader outer element. */
	HEADER_HEIGHT: 56,

	/**
	 * Matches `h-14` (3.5rem / 56px) on AppShellFooterNav's `<nav>`.
	 * The footer nav is `lg:hidden` — on desktop this is effectively 0.
	 * Use CONTENT_HEIGHT only in layouts where both header AND footer are present.
	 */
	FOOTER_NAV_HEIGHT: 56,
} as const;

/**
 * Exact height of the scrollable content area between header and footer.
 * Uses `100dvh` (dynamic viewport height) to handle mobile browser chrome correctly.
 *
 * ⚠️  Desktop caveat: the footer nav is hidden on `lg+`, so this value is 56px
 * too short on desktop, leaving a small blank strip at the bottom.
 * Apply `lg:flex-1` or `lg:h-auto` alongside this style to restore full height
 * on desktop if needed.
 */
export const CONTENT_HEIGHT =
	`calc(100dvh - ${LAYOUT.HEADER_HEIGHT}px - ${LAYOUT.FOOTER_NAV_HEIGHT}px)` as const;
