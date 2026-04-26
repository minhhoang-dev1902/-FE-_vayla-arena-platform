import { intervalToDuration, isValid, parseISO } from "date-fns";

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

export function formatTimeLeft(endDate: string): string {
	const parsedDate = parseISO(endDate);
	if (!isValid(parsedDate)) return "0d 00:00:00";

	const now = new Date();
	if (parsedDate <= now) return "0d 00:00:00";

	const duration = intervalToDuration({ start: now, end: parsedDate });
	const days = duration.days ?? 0;
	const hours = duration.hours ?? 0;
	const minutes = duration.minutes ?? 0;
	const seconds = duration.seconds ?? 0;

	const hh = String(hours).padStart(2, "0");
	const mm = String(minutes).padStart(2, "0");
	const ss = String(seconds).padStart(2, "0");

	return `${days}d ${hh}:${mm}:${ss}`;
}

export function formatEndsInDaysHours(
	endsAt: Date | string | undefined,
	fallbackIso: string,
): string {
	const endDate = parseOptionalEndDate(endsAt, fallbackIso);
	if (!isValid(endDate)) return "Ends in 0d 0h";

	const now = new Date();
	if (endDate <= now) return "Ends in 0d 0h";

	const duration = intervalToDuration({ start: now, end: endDate });
	const days = duration.days ?? 0;
	const hours = duration.hours ?? 0;

	return `Ends in ${days}d ${hours}h`;
}
