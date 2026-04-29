export function getYoutubeVideoId(rawUrl: string): string | null {
	const url = rawUrl?.trim();
	if (!url) return null;

	try {
		const u = new URL(url);

		if (u.hostname === "youtu.be") {
			const id = u.pathname.replace(/^\//, "").split("/")[0];
			return id || null;
		}

		if (!u.hostname.includes("youtube.com") && !u.hostname.includes("youtube-nocookie.com")) {
			return null;
		}

		if (u.pathname.startsWith("/embed/")) {
			return u.pathname.slice("/embed/".length).split("/")[0] || null;
		}

		if (u.pathname.startsWith("/shorts/")) {
			return u.pathname.slice("/shorts/".length).split("/")[0] || null;
		}

		const v = u.searchParams.get("v");
		if (v) return v;
	} catch {
		return null;
	}

	return null;
}

export function getYoutubeThumbnailUrl(
	youtubeUrl: string,
	fallbackUrl: string | null = null,
): string | null {
	const id = getYoutubeVideoId(youtubeUrl);
	if (!id) return fallbackUrl ?? "";
	return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
