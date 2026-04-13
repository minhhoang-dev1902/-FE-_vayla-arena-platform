"use client";

import { useEffect, useState } from "react";
import { getRemainingParts, type TimeParts } from "@/share/utils/countdown";

export function useCountdown(end: Date): TimeParts | null {
	const endMs = end.getTime();
	const [parts, setParts] = useState<TimeParts | null>(null);

	useEffect(() => {
		const tick = () => setParts(getRemainingParts(endMs, Date.now()));
		tick();
		const id = window.setInterval(tick, 1000);
		return () => window.clearInterval(id);
	}, [endMs]);

	return parts;
}
