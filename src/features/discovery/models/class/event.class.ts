export enum EEventContentType {
	MUSIC = "music",
	VIDEO = "video",
	PODCAST = "podcast",
	ART = "art",
	NONE = "",
}

export type TEventContentType = `${EEventContentType}`;
export type TEventStatus = "draft" | "live" | "ended" | "";
export class EventClass {
	id: string = "";
	name: string = "";
	slug: string = "";
	contentType: TEventContentType = "";
	description: string = "";
	rulesGuidelines: string = "";
	thumbnailUrl: string = "";
	startDate: string = "";
	endDate: string = "";
	status: TEventStatus = "";
	vaylaPrizePool: string = "";
	submissionCount: number = 0;
	totalVotes: number = 0;
	createdBy: string = "";
	createdAt: string = "";
	updatedAt: string = "";

	constructor(data: Partial<EventClass>) {
		this.id = data.id ?? "";
		this.name = data.name ?? "";
		this.slug = data.slug ?? "";
		this.contentType = data.contentType ?? "";
		this.description = data.description ?? "";
		this.rulesGuidelines = data.rulesGuidelines ?? "";
		this.thumbnailUrl = data.thumbnailUrl ?? "";
		this.startDate = data.startDate ?? "";
		this.endDate = data.endDate ?? "";
		this.status = data.status ?? "";
		this.vaylaPrizePool = data.vaylaPrizePool ?? "";
		this.submissionCount = data.submissionCount ?? 0;
		this.totalVotes = data.totalVotes ?? 0;
		this.createdBy = data.createdBy ?? "";
		this.createdAt = data.createdAt ?? "";
		this.updatedAt = data.updatedAt ?? "";
	}
}
