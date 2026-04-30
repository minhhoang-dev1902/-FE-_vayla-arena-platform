import { getYoutubeThumbnailUrl } from "@/share/utils/youtube-thumbnail";

export interface IPolicy {
	vaylaDeducted: number;
	platformBalance: number;
	dailyUploadsToday: number;
	dailyLimit: number;
	remainingToday: number;
}
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

export class SubmitTrackResponseClass {
	success: boolean = false;
	data: {
		submission: TrackClass;
		policy: IPolicy;
	} = {
		submission: new TrackClass({}),
		policy: {
			vaylaDeducted: 0,
			platformBalance: 0,
			dailyUploadsToday: 0,
			dailyLimit: 0,
			remainingToday: 0,
		},
	};
	constructor(data: Partial<SubmitTrackResponseClass>) {
		this.success = data.success ?? false;
		this.data = data.data ?? {
			submission: new TrackClass({}),
			policy: {
				vaylaDeducted: 0,
				platformBalance: 0,
				dailyUploadsToday: 0,
				dailyLimit: 0,
				remainingToday: 0,
			},
		};
	}
}
