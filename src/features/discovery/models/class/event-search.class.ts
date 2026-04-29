import { BaseSearchListClass } from "@/share/models/class/base-search-list.class";
import { TEventContentType } from "./event.class";
import { PAGINATION_DEFAULT } from "@/share/contants/pagination";
import { EventClass } from "./event.class";
import { PaginationClass } from "@/share/models/class/pagination.class";

export enum EEventSearchType {
    LIVE = "live",
    UPCOMING = "upcoming",
    NONE = "",
}

export type TEventSearchType = `${EEventSearchType}`;

export class EventSearchClass extends BaseSearchListClass {
    contentType: TEventContentType = "";
    typeSearch: TEventSearchType = EEventSearchType.NONE;
    constructor(data: Partial<EventSearchClass>) {
        super(data);
        this.contentType = data.contentType ?? "";
        this.typeSearch = data.typeSearch ?? EEventSearchType.NONE;
        this.offset = data.offset ?? PAGINATION_DEFAULT.OFFSET;
        this.limit = data.limit ?? PAGINATION_DEFAULT.LIMIT;
    }
}

export class EventLiveSearchClass extends EventSearchClass {
    constructor(data: Partial<EventSearchClass> = {}) {
        super({
            ...data,
            typeSearch: EEventSearchType.LIVE,
        });
    }
}

export class EventUpCommingSearchClass extends EventSearchClass {
    constructor(data: Partial<EventSearchClass> = {}) {
        super({
            ...data,
            typeSearch: EEventSearchType.UPCOMING,
        });
    }
}

type TEventSearchClassConstructor = new (
    data: Partial<EventSearchClass>,
) => EventSearchClass;

export class EventSearchFactory {
    private static readonly typeSearchClassMap: Record<
        Exclude<TEventSearchType, "">,
        TEventSearchClassConstructor
    > = {
        live: EventLiveSearchClass,
        upcoming: EventUpCommingSearchClass,
    };

    static create(
        typeSearch: TEventSearchType,
        data: Partial<EventSearchClass> = {},
    ): EventSearchClass {
        if (!typeSearch) {
            return new EventSearchClass(data);
        }
        const SearchClass = this.typeSearchClassMap[typeSearch];
        return SearchClass
            ? new SearchClass(data)
            : new EventSearchClass({
                ...data,
                typeSearch: EEventSearchType.NONE,
            });
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
        }
        this.success = data.success ?? false;
    }
}

