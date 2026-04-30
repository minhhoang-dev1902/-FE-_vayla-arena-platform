import { PAGINATION_DEFAULT } from "@/share/contants/pagination";
import { BaseSearchListClass } from "@/share/models/class/base-search-list.class";
import { TrackClass } from "./track.class";

export type TTypeSearchTracks = "hot" | "new" | "ending-soon" | "";

export class TracksSearchClass extends BaseSearchListClass {
	type: TTypeSearchTracks = "";

	constructor(data: Partial<TracksSearchClass>) {
		super(data);
		this.offset = data.offset ?? PAGINATION_DEFAULT.OFFSET;
		this.limit = data.limit ?? PAGINATION_DEFAULT.LIMIT;
		this.type = data.type ?? "";
	}
}

export class TrackSearchResponseClass {
	success: boolean;
	data: {
		tracks: TrackClass[];
		limit: number;
		offset: number;
		total: number;
	};

	constructor(data: Partial<TrackSearchResponseClass>) {
		this.success = data.success ?? false;
		const { tracks, limit, offset, total } = data.data ?? {};
		const newTracks = tracks ? tracks.map(item => new TrackClass(item)) : [];
		this.data = {
			tracks: newTracks,
			limit: limit ?? PAGINATION_DEFAULT.LIMIT,
			offset: offset ?? PAGINATION_DEFAULT.OFFSET,
			total: total ?? 0,
		};
	}
}

export class TrackSearchByEvent extends BaseSearchListClass {
	eventId: string;
	constructor(data: Partial<TrackSearchByEvent>) {
		super(data);
		this.offset = data.offset ?? PAGINATION_DEFAULT.OFFSET;
		this.limit = data.limit ?? PAGINATION_DEFAULT.LIMIT;
		this.eventId = data.eventId ?? "";
	}
}

export class TrackSearchByEventResponseClass {
	success: boolean = false;
	data: {
		submissions: TrackClass[];
		pagination?: {
			total: number;
			limit: number;
			offset: number;
			hasMore: boolean;
		};
	} = {
		submissions: [],
	};
	constructor(response: Partial<TrackSearchByEventResponseClass>) {
		const { success, data } = response ?? {};
		if (!success || !data) {
			this.success = false;
			this.data = {
				submissions: [],
			};
			return;
		}
		const { submissions, pagination } = data ?? {};
		const newSubmissions = submissions ? submissions.map(item => new TrackClass(item)) : [];

		this.data = {
			submissions: newSubmissions,
			pagination,
		};
		this.success = success;
	}
}
