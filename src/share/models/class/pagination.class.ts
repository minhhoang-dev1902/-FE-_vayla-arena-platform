export class PaginationClass {
    total: number = 0;
    limit: number = 0;
    offset: number = 0;
    hasMore: boolean = false;
    constructor(data: Partial<PaginationClass>) {
        this.total = data.total ?? 0;
        this.limit = data.limit ?? 0;
        this.offset = data.offset ?? 0;
        this.hasMore = data.hasMore ?? false;
    }
}