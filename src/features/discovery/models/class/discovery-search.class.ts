import { BaseSearchListClass } from "@/share/models/class/base-search-list.class";
import { DiscoveryClass } from "./discovery.class";
export class DiscoverySearchClass extends BaseSearchListClass {

    constructor(data: Partial<DiscoverySearchClass>) {
        super(data);
    }
}


export class DiscoverySearchResponseClass {
    success: boolean;
    data: DiscoveryClass[];
    constructor(data: Partial<DiscoverySearchResponseClass>) {
        this.success = data.success ?? false;
        this.data = data.data ?? [];
    }
}