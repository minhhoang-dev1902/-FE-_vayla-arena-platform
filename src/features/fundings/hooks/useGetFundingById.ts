import { useMemo } from "react";
import { useCustomQuery } from "@/share/hooks/cus-use-query";
import { fundingApi } from "../apis/funding.api";
import { FUNDING_ENDPOINTS } from "../endpoints/funding.endpoints";

type FundingByIdPayload = { id: string };

/** GET `/funding/:id` — single Boost project */
export function useGetFundingById(id: string | undefined) {
	const payload = useMemo((): FundingByIdPayload => ({ id: id ?? "" }), [id]);

	return useCustomQuery({
		key: FUNDING_ENDPOINTS.DETAIL_QUERY_KEY,
		fn: fundingApi.getFundingById,
		props: {
			payload,
			queryOptions: {
				enabled: Boolean(id?.trim()),
				retry: false,
				/** Bỏ stale 1 phút mặc định — mỗi lần vào detail/participate luôn GET lại */
				staleTime: 0,
				refetchOnMount: "always",
			},
		},
	});
}
