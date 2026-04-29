import { PAGINATION_DEFAULT } from "@/share/contants/pagination";
import { BaseSearchListClass } from "@/share/models/class/base-search-list.class";
import { getYoutubeThumbnailUrl } from "@/share/utils/youtube-thumbnail";

export class TrackClass {
	rank: number;
	submissionId: string;
	trackTitle: string;
	artistName: string;
	genre: string;
	youtubeUrl: string;
	voteCount: number;
	eventId: string;
	eventName: string;
	rankChange: string;
	createdAt: string;
	thumbnailUrl: string;
	constructor(data: Partial<TrackClass>) {
		this.rank = data.rank ?? 0;
		this.submissionId = data.submissionId ?? "";
		this.trackTitle = data.trackTitle ?? "";
		this.artistName = data.artistName ?? "";
		this.genre = data.genre ?? "";
		this.youtubeUrl = data.youtubeUrl ?? "";
		this.voteCount = data.voteCount ?? 0;
		this.eventId = data.eventId ?? "";
		this.eventName = data.eventName ?? "";
		this.rankChange = data.rankChange ?? "";
		this.createdAt = data.createdAt ?? "";
		const thumbnailUrl = this.getThumbnailUrl(getYoutubeThumbnailUrl, "");
		this.thumbnailUrl = thumbnailUrl;
	}

	getThumbnailUrl(fn: (youtubeUrl: string) => string | null, fallbackUrl: string = "") {
		if (!this.youtubeUrl || !fn) return fallbackUrl;
		const thumbnailUrl = fn(this.youtubeUrl ?? fallbackUrl);
		if (!thumbnailUrl) return fallbackUrl;
		return thumbnailUrl;
	}
}

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
