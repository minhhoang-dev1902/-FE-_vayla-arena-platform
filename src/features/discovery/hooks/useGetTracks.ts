import { useCustomQuery } from "@/share/hooks/cus-use-query";
import { discoveryApi } from "../apis/discovery.api";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";
import type { DiscoverySearchClass } from "../models/class/discovery-search.class";

export function useGetTracks(payload: DiscoverySearchClass) {
	return useCustomQuery({
		key: DISCOVERY_ENDPOINTS.TRACKS_LIST,
		fn: discoveryApi.getTracksList,
		props: {
			payload: payload,
		},
	});
}
