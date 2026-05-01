import { AppErrorFallback } from "@/share/components/feedback/app-error-fallback";
import { NAVIGATE } from "@/share/contants/navigate";

/** 404 toàn app (`app/not-found.tsx`) */
export default function NotFound() {
	return (
		<AppErrorFallback
			title="Page not found"
			description="The link may be outdated or this page doesn't exist."
			homeHref={NAVIGATE.DISCOVERY}
			homeLabel="Back to Discovery"
		/>
	);
}
