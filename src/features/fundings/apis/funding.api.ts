import { apiCommonService } from "@/share/services/api-common";
import { FUNDING_ENDPOINTS, fundingDetailPath } from "../endpoints/funding.endpoints";
import {
	FundingDetailResponseClass,
	type FundingListQueryClass,
	FundingListResponseClass,
} from "../models/class/funding-list.class";

/** Query string cho GET `/funding`: bỏ filter rỗng. */
export function serializeFundingListQuery(
	search: FundingListQueryClass,
): Record<string, string | number> {
	const params: Record<string, string | number> = {
		limit: search.limit,
		offset: search.offset,
		sort_by: search.sort_by,
		order: search.order,
	};
	if (search.status) params.status = search.status;
	if (search.category) params.category = search.category;
	if (search.visibility) params.visibility = search.visibility;
	if (search.settlementStatus) params.settlementStatus = search.settlementStatus;
	if (search.search) params.search = search.search;
	return params;
}

export const fundingApi = {
	getFundingList: async (search: FundingListQueryClass) => {
		const params = serializeFundingListQuery(search);
		const response = await apiCommonService.get<FundingListResponseClass, FundingListQueryClass>({
			url: FUNDING_ENDPOINTS.LIST,
			config: { params },
		});
		return new FundingListResponseClass(response.data);
	},

	/** GET `/funding/:id` — Boost detail */
	getFundingById: async (payload: { id: string }) => {
		const response = await apiCommonService.get<Partial<FundingDetailResponseClass>, unknown>({
			url: fundingDetailPath(payload.id),
		});
		return new FundingDetailResponseClass(response.data ?? {});
	},
};
