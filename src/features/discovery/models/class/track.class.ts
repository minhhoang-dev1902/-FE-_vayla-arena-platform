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
	}
}
