/** Khoảng thời gian còn lại tới mốc `endMs`, tính theo ngày / giờ / phút / giây (không âm). */
export type TimeParts = {
	d: number;
	h: number;
	m: number;
	s: number;
};

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;

export function getRemainingParts(endMs: number, nowMs: number): TimeParts {
	const diff = Math.max(0, endMs - nowMs);
	const d = Math.floor(diff / MS_PER_DAY);
	const h = Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR);
	const m = Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE);
	const s = Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND);
	return { d, h, m, s };
}

export function parseOptionalEndDate(endsAt: Date | string | undefined, fallbackIso: string): Date {
	if (endsAt instanceof Date) return endsAt;
	if (typeof endsAt === "string") return new Date(endsAt);
	return new Date(fallbackIso);
}
