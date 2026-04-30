"use client";

import Image, { type ImageProps } from "next/image";
import { type SyntheticEvent, useCallback, useEffect, useState } from "react";

function hasUsableSrc(src: ImageProps["src"] | undefined | null): src is ImageProps["src"] {
	if (src == null) {
		return false;
	}
	if (typeof src === "string") {
		return src.trim().length > 0;
	}
	return true;
}

export type CustomImageProps = Omit<ImageProps, "src" | "onError"> & {
	src?: ImageProps["src"] | null;
	fallback: ImageProps["src"];
	onError?: ImageProps["onError"];
};

export function CustomImage({ src, fallback, onError, ...rest }: CustomImageProps) {
	const [currentSrc, setCurrentSrc] = useState<ImageProps["src"]>(() =>
		hasUsableSrc(src) ? src : fallback,
	);

	useEffect(() => {
		setCurrentSrc(hasUsableSrc(src) ? src : fallback);
	}, [src, fallback]);

	const handleError = useCallback(
		(e: SyntheticEvent<HTMLImageElement, Event>) => {
			setCurrentSrc(prev => {
				if (prev === fallback) {
					return prev;
				}
				return fallback;
			});
			onError?.(e);
		},
		[fallback, onError],
	);

	return <Image {...rest} src={currentSrc} onError={handleError} />;
}
