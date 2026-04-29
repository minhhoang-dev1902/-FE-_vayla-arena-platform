import { PAGINATION_DEFAULT } from "@/share/contants/pagination";
import { BaseSearchListClass } from "@/share/models/class/base-search-list.class";
import { PaginationClass } from "@/share/models/class/pagination.class";
import { EventClass, type TEventContentType } from "./event.class";

export enum EEventSearchType {
	LIVE = "live",
	UPCOMING = "upcoming",
	NONE = "",
}

export type TEventSearchType = `${EEventSearchType}`;

export class EventSearchClass extends BaseSearchListClass {
	contentType: TEventContentType | null = null;
	typeEvent: TEventSearchType = EEventSearchType.NONE;
	constructor(data: Partial<EventSearchClass>) {
		super(data);
		this.contentType = data.contentType ?? null;
		this.typeEvent = data.typeEvent ?? EEventSearchType.NONE;
		this.offset = data.offset ?? PAGINATION_DEFAULT.OFFSET;
		this.limit = data.limit ?? PAGINATION_DEFAULT.LIMIT;
	}
}

export class EventSearchResponseClass {
	success: boolean = false;
	data: {
		events: EventClass[];
		pagination: PaginationClass;
	} = {
		events: [],
		pagination: new PaginationClass({}),
	};
	constructor(data: Partial<EventSearchResponseClass>) {
		this.success = data.success ?? false;
		const { events, pagination } = data.data ?? {};
		const newEvents = events ? events.map(item => new EventClass(item)) : [];
		const newPagination = pagination ? new PaginationClass(pagination) : new PaginationClass({});
		this.data = {
			events: newEvents,
			pagination: newPagination,
		};
		this.success = data.success ?? false;
	}
}
