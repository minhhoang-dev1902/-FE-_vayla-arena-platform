import { useCustomQuery } from "@/share/hooks/cus-use-query";
import { fundingApi } from "../apis/funding.api";
import { FUNDING_ENDPOINTS } from "../endpoints/funding.endpoints";
import type { FundingListQueryClass } from "../models/class/funding-list.class";

/** Query Boost / Funding projects (GET `/funding`). */
export function useGetFundingList(payload: FundingListQueryClass) {
	return useCustomQuery({
		key: FUNDING_ENDPOINTS.LIST,
		fn: fundingApi.getFundingList,
		props: {
			payload,
		},
	});
}
