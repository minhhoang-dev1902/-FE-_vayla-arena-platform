import { useCustomQuery } from "@/share/hooks/cus-use-query";
import { discoveryApi } from "../apis/discovery.api";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";
import type { TracksSearchClass } from "../models/class/track.class";

export function useGetTracks(payload: TracksSearchClass) {
	return useCustomQuery({
		key: DISCOVERY_ENDPOINTS.TRACKS_LIST,
		fn: discoveryApi.getTracksList,
		props: {
			payload: payload,
		},
	});
}
