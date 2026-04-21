import type { TFunding } from "../models/type/funding.type";
export const FUNDING_LIST_MOCK: TFunding[] = [
	{
		id: "f1234567-89ab-cdef-0123-456789abcdef",
		type: "music_campaign",
		title: "Waterbomb 2026 in SEOUL Festival Boost",
		goal_amount: 10000,
		raised_amount: 3250,
		progress_pct: 32.5,
		status: "active",
		end_date: "2026-12-01T00:00:00Z",
		creator_username: "djvayla",
	},
];
