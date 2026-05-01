import type { SubmitTrackResponseClass } from "../models/class/track.class";

// ─── Generic one-shot sessionStorage handoff ──────────────────────────────────

type HandoffPayload<T> = { data: T; ts: number };

function createSessionHandoff<T>(key: string, ttlMs = 10 * 60_000) {
	function stash(data: T): void {
		if (typeof window === "undefined") return;
		try {
			const payload: HandoffPayload<T> = { data, ts: Date.now() };
			sessionStorage.setItem(key, JSON.stringify(payload));
		} catch {
			/* private / disabled storage */
		}
	}

	function take(): T | null {
		if (typeof window === "undefined") return null;
		try {
			const raw = sessionStorage.getItem(key);
			if (!raw) return null;
			sessionStorage.removeItem(key);
			const payload = JSON.parse(raw) as HandoffPayload<T>;
			if (!payload?.data || Date.now() - payload.ts > ttlMs) return null;
			return payload.data;
		} catch {
			return null;
		}
	}

	return { stash, take };
}

// ─── Submit track — success result ────────────────────────────────────────────

const submitTrackResultHandoff = createSessionHandoff<SubmitTrackResponseClass>(
	"vayla:discovery:submitTrackResult",
);

export const stashSubmitTrackResult = submitTrackResultHandoff.stash;
export const takeSubmitTrackResult = submitTrackResultHandoff.take;

// ─── Submit track — error ─────────────────────────────────────────────────────

export type SubmitTrackErrorData = {
	code: string;
	message: string;
	httpStatus?: number;
};

const submitTrackErrorHandoff = createSessionHandoff<SubmitTrackErrorData>(
	"vayla:discovery:submitTrackError",
);

export const stashSubmitTrackError = submitTrackErrorHandoff.stash;
export const takeSubmitTrackError = submitTrackErrorHandoff.take;
