import { BaseClass } from "@/share/models/class/base.class";
import { BaseSearchListClass } from "@/share/models/class/base-search-list.class";

/** GET `/funding` — `status` query */
export enum EFundingBoostStatus {
	DRAFT = "draft",
	INTERNAL_REVIEW = "internal_review",
	UPCOMING = "upcoming",
	IN_PROGRESS = "in_progress",
	PAUSED = "paused",
	COMPLETED = "completed",
	FAILED = "failed",
	CANCELLED = "cancelled",
}
export type TFundingBoostStatus = `${EFundingBoostStatus}`;

/** GET `/funding` — `visibility` query */
export enum EFundingBoostVisibility {
	PUBLIC = "public",
	PRIVATE = "private",
}
export type TFundingBoostVisibility = `${EFundingBoostVisibility}`;

/** GET `/funding` — `settlementStatus` query & project `settlement_status` */
export enum EFundingSettlementStatus {
	PENDING = "pending",
	UNDER_REVIEW = "under_review",
	CONFIRMED = "confirmed",
	COMPLETED = "completed",
	HOLD = "hold",
}
export type TFundingSettlementStatus = `${EFundingSettlementStatus}`;

/** GET `/funding` — `order` query */
export enum EFundingListOrder {
	ASC = "asc",
	DESC = "desc",
}
export type TFundingListOrder = `${EFundingListOrder}`;

const FUNDING_LIST_DEFAULT_LIMIT = 20;
const FUNDING_LIST_DEFAULT_OFFSET = 0;
const FUNDING_LIST_DEFAULT_SORT_BY = "created_at";

/** Query params for GET `/funding` (Boost public listing). */
export class FundingListQueryClass extends BaseSearchListClass {
	status: TFundingBoostStatus | "" = "";
	category: string = "";
	visibility: TFundingBoostVisibility | "" = "";
	settlementStatus: TFundingSettlementStatus | "" = "";
	search: string = "";
	sort_by: string = FUNDING_LIST_DEFAULT_SORT_BY;
	order: TFundingListOrder = EFundingListOrder.DESC;

	constructor(data: Partial<FundingListQueryClass> = {}) {
		super(data);
		this.offset = data.offset ?? FUNDING_LIST_DEFAULT_OFFSET;
		this.limit = data.limit ?? FUNDING_LIST_DEFAULT_LIMIT;
		this.status = data.status ?? "";
		this.category = data.category ?? "";
		this.visibility = data.visibility ?? "";
		this.settlementStatus = data.settlementStatus ?? "";
		this.search = data.search ?? "";
		this.sort_by = data.sort_by ?? FUNDING_LIST_DEFAULT_SORT_BY;
		this.order = data.order ?? EFundingListOrder.DESC;
	}
}

/** Một project trong `data.projects` của GET `/funding`. */
export class FundingProjectClass extends BaseClass {
	slug: string = "";
	title: string = "";
	status: string = "";
	category: string = "";
	end_date: string = "";
	roi_rate: number = 0;
	editor_id: string | null = null;
	created_at: string = "";
	creator_id: string = "";
	start_date: string = "";
	updated_at: string = "";
	visibility: string = "";
	editor_name: string | null = null;
	creator_name: string = "";
	raised_amount: number = 0;
	target_amount: number = 0;
	last_edited_at: string | null = null;
	cover_image_url: string | null = null;
	settlement_status: string = "";

	constructor(data: Partial<FundingProjectClass> = {}) {
		super();
		this.id = data.id ?? "";
		this.slug = data.slug ?? "";
		this.title = data.title ?? "";
		this.status = data.status ?? "";
		this.category =
			data.category === null || data.category === undefined ? "" : String(data.category);
		this.end_date = data.end_date ?? "";
		this.roi_rate = data.roi_rate ?? 0;
		this.editor_id = data.editor_id ?? null;
		this.created_at = data.created_at ?? "";
		this.creator_id = data.creator_id ?? "";
		this.start_date = data.start_date ?? "";
		this.updated_at = data.updated_at ?? "";
		this.visibility = data.visibility ?? "";
		this.editor_name = data.editor_name ?? null;
		this.creator_name = data.creator_name ?? "";
		this.raised_amount = data.raised_amount ?? 0;
		this.target_amount = data.target_amount ?? 0;
		this.last_edited_at = data.last_edited_at ?? null;
		this.cover_image_url = data.cover_image_url ?? null;
		this.settlement_status = data.settlement_status ?? "";
	}

	static toResponse(data: Partial<FundingProjectClass>[] = []): FundingProjectClass[] {
		return data.map(item => new FundingProjectClass(item));
	}
}

/** `data` trong body `{ success, data }` của GET `/funding`. */
export class FundingListDataClass {
	limit: number = FUNDING_LIST_DEFAULT_LIMIT;
	total: number = 0;
	offset: number = FUNDING_LIST_DEFAULT_OFFSET;
	projects: FundingProjectClass[] = [];

	constructor(data: Partial<FundingListDataClass> = {}) {
		const { projects, limit, total, offset } = data;
		this.limit = limit ?? FUNDING_LIST_DEFAULT_LIMIT;
		this.total = total ?? 0;
		this.offset = offset ?? FUNDING_LIST_DEFAULT_OFFSET;
		this.projects = projects ? projects.map(p => new FundingProjectClass(p)) : [];
	}
}

export class FundingListResponseClass {
	success: boolean = false;
	data: FundingListDataClass = new FundingListDataClass({});

	constructor(response: Partial<FundingListResponseClass> = {}) {
		this.success = response.success ?? false;
		this.data = new FundingListDataClass(response.data ?? {});
	}
}
