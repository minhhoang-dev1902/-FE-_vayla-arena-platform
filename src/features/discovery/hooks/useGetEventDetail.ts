import { useCustomQuery } from "@/share/hooks/cus-use-query";
import { discoveryApi } from "../apis/discovery.api";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";

export function useGetEventDetail(id: string | undefined) {
	return useCustomQuery({
		key: DISCOVERY_ENDPOINTS.EVENT_DETAIL,
		fn: discoveryApi.getEventDetail,
		props: {
			payload: id,
			queryOptions: {
				enabled: Boolean(id),
			},
		},
	});
}
