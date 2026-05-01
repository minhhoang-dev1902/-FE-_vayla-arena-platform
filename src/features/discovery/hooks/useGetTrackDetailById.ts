import { useCustomQuery } from "@/share/hooks/cus-use-query";
import { discoveryApi } from "../apis/discovery.api";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";

export function useGetTrackDetailById(id: string) {
	return useCustomQuery({
		key: DISCOVERY_ENDPOINTS.TRACK_DETAIL,
		fn: discoveryApi.getTrackDetail,
		props: {
			payload: id,
		},
	});
}
