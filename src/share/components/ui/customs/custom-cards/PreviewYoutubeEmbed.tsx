"use client";

import Image from "next/image";
import playIcon from "@/assets/icons/play-icon.svg";
import { cn } from "@/share/lib/utils";

export interface PreviewYoutubeEmbedProps {
	url?: string;
	className?: string;
}

function toEmbedUrl(raw?: string) {
	if (!raw) return null;
	const value = raw.trim();
	if (!value) return null;

	try {
		const parsed = new URL(value);

		if (parsed.hostname.includes("youtu.be")) {
			const id = parsed.pathname.split("/").filter(Boolean)[0];
			return id ? `https://www.youtube.com/embed/${id}` : null;
		}

		if (parsed.pathname.includes("/embed/")) {
			return `${parsed.origin}${parsed.pathname}`;
		}

		if (parsed.pathname.includes("/shorts/")) {
			const id = parsed.pathname.split("/shorts/")[1]?.split("/")[0];
			return id ? `https://www.youtube.com/embed/${id}` : null;
		}

		const id = parsed.searchParams.get("v");
		return id ? `https://www.youtube.com/embed/${id}` : null;
	} catch {
		return null;
	}
}

export function PreviewYoutubeEmbed({ url, className }: PreviewYoutubeEmbedProps) {
	const embedUrl = toEmbedUrl(url);

	return (
		<div
			className={cn(
				"w-full h-[99px] overflow-hidden rounded-[12px] bg-hightlight-challenge-card p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.10)] flex items-center ",

				className,
			)}
		>
			{embedUrl ? (
				<iframe
					src={embedUrl}
					title="YouTube preview"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
					className="h-[99px] w-full rounded-[12px] px-[10px] py-2"
				/>
			) : (
				<div className="flex items-center gap-4">
					<div className="flex items-center justify-center h-[80px] w-[80px] min-w-[80px] rounded-[12px] bg-[#6BA4A1]">
						<Image src={playIcon} alt="play icon" width={25} height={25} />
					</div>
					<p className="font-[11px] text-[#666666] leading-[18px]">
						Paste a public YouTube embed link to preview your track here.
					</p>
				</div>
			)}
		</div>
	);
}
