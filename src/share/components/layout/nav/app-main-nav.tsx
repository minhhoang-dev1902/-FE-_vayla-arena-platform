"use client";

import type { LucideIcon } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

import discoveryIcon from "@/assets/icons/discovery-icon.svg";
import fundingIcon from "@/assets/icons/funding-icon.svg";
import homeIcon from "@/assets/icons/home-icon.svg";
import voteIcon from "@/assets/icons/vote-icon.svg";
import { cn } from "@/share/lib/utils";

export type AppMainNavIcon = LucideIcon | StaticImageData | string;

export type AppMainNavItem = {
	readonly href: string;
	readonly label: string;
	readonly icon: AppMainNavIcon;
};

function isLucideIcon(icon: AppMainNavIcon): icon is LucideIcon {
	return typeof icon === "function";
}

function getRasterIconSrc(icon: Exclude<AppMainNavIcon, LucideIcon>): string {
	if (typeof icon === "string") return icon;
	return icon.src;
}

type MainNavIconProps = {
	icon: AppMainNavIcon;
	className?: string;
	alt?: string;
	/**
	 * Icon trắng trên nền tối (vd. header đen).
	 * Lucide: `text-white`. Ảnh/SVG qua Image: `brightness-0 invert` (SVG `currentColor` qua `<img>` không ổn định).
	 */
	lightOnDark?: boolean;
	/** Icon và label cùng màu theo `currentColor` của phần tử cha (vd. footer). SVG raster dùng CSS mask + `bg-current`. */
	followForegroundColor?: boolean;
};

export function MainNavIcon({
	icon,
	className,
	alt = "",
	lightOnDark,
	followForegroundColor,
}: MainNavIconProps) {
	if (isLucideIcon(icon)) {
		const Icon = icon;
		return (
			<Icon
				className={cn(
					lightOnDark && !followForegroundColor && "text-white",
					followForegroundColor && "text-inherit",
					className,
				)}
				aria-hidden
			/>
		);
	}

	const rasterSrc = getRasterIconSrc(icon);

	if (followForegroundColor) {
		return (
			<span
				aria-hidden
				className={cn("inline-block shrink-0 bg-current text-inherit", className)}
				style={{
					WebkitMaskImage: `url(${rasterSrc})`,
					maskImage: `url(${rasterSrc})`,
					WebkitMaskSize: "contain",
					maskSize: "contain",
					WebkitMaskRepeat: "no-repeat",
					maskRepeat: "no-repeat",
					WebkitMaskPosition: "center",
					maskPosition: "center",
				}}
			/>
		);
	}

	return (
		<Image
			src={icon}
			alt={alt}
			width={20}
			height={20}
			unoptimized
			className={cn("shrink-0 object-contain", lightOnDark && "brightness-0 invert", className)}
		/>
	);
}

export const appMainNavItems: readonly AppMainNavItem[] = [
	{ href: "/home", label: "Home", icon: homeIcon },
	{ href: "/funding", label: "Funding", icon: fundingIcon },
	{ href: "/vote", label: "Vote", icon: voteIcon },
	{ href: "/discovery", label: "Discovery", icon: discoveryIcon },
];
