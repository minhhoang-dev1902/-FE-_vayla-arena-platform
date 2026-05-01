export class TrackVotePayloadClass {
	submissionId: string;
	voteCount: number;

	constructor(data: Partial<TrackVotePayloadClass>) {
		this.submissionId = data.submissionId ?? "";
		this.voteCount = data.voteCount ?? 1;
	}
}

/** Normalized POST /voting/track-vote success payload */
export class TrackVoteResultDataClass {
	submissionId: string;
	trackTitle: string;
	votesCast: number;
	vaylaDeducted: string;
	platformBalance: string;

	constructor(data: Partial<TrackVoteResultDataClass>) {
		this.submissionId = data.submissionId ?? "";
		this.trackTitle = data.trackTitle ?? "";
		this.votesCast = data.votesCast ?? 0;
		this.vaylaDeducted = String(data?.vaylaDeducted ?? "0");
		this.platformBalance = String(data?.platformBalance ?? "0");
	}
}

export class TrackVoteResponseClass {
	success: boolean = false;
	data: TrackVoteResultDataClass = new TrackVoteResultDataClass({});

	constructor(response: Partial<TrackVoteResponseClass>) {
		const { success, data } = response ?? {};
		this.success = success ?? false;
		this.data = new TrackVoteResultDataClass(data ?? {});
	}
}

export type TrackVoteErrorData = {
	code: string;
	message: string;
	httpStatus?: number;
};
