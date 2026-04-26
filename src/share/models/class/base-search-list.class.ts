import { PAGINATION_DEFAULT } from "@/share/contants/pagination";

export class BaseSearchListClass {
	offset: number = PAGINATION_DEFAULT.OFFSET;
	limit: number = PAGINATION_DEFAULT.LIMIT;

	constructor(data?: Partial<BaseSearchListClass>) {
		this.offset = data?.offset ?? PAGINATION_DEFAULT.OFFSET;
		this.limit = data?.limit ?? PAGINATION_DEFAULT.LIMIT;
	}
}
