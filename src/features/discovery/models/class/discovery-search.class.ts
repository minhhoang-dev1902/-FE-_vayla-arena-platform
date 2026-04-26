import { PAGINATION_DEFAULT } from "@/share/contants/pagination";
import { BaseSearchListClass } from "@/share/models/class/base-search-list.class";
import { TrackClass } from "./track.class";

export type TTypeSearchDiscovery = "hot" | "new" | "ending-soon" | "";
export class DiscoverySearchClass extends BaseSearchListClass {
	type: TTypeSearchDiscovery = "";
	constructor(data: Partial<DiscoverySearchClass>) {
		super(data);
		this.offset = data.offset ?? PAGINATION_DEFAULT.OFFSET;
		this.limit = data.limit ?? PAGINATION_DEFAULT.LIMIT;
		this.type = data.type ?? "";
	}
}

export class DiscoverySearchResponseClass {
	success: boolean;
	data: {
		tracks: TrackClass[];
		limit: number;
		offset: number;
		total: number;
	};

	constructor(data: Partial<DiscoverySearchResponseClass>) {
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
