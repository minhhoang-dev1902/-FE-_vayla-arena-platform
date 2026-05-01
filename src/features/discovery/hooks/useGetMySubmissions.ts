import { useCustomQuery } from "@/share/hooks/cus-use-query";
import { discoveryApi } from "../apis/discovery.api";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";
import type { MySubmissionsSearchClass } from "../models/class/track-search.class";

export const useGetMySubmissions = (payload: MySubmissionsSearchClass) => {
	return useCustomQuery({
		key: DISCOVERY_ENDPOINTS.MY_SUBMISSIONS,
		fn: discoveryApi.getMySubmissions,
		props: {
			payload: payload,
		},
	});
};
