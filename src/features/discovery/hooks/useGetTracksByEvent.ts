import { useCustomQuery } from "@/share/hooks/cus-use-query";
import { discoveryApi } from "../apis/discovery.api";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";
import { TrackSearchByEvent } from "../models/class/track-search.class";

export function useGetTracksByEvent(payload: TrackSearchByEvent) {
    return useCustomQuery({
        key: DISCOVERY_ENDPOINTS.TRACKS_LIST_EVENT,
        fn: discoveryApi.getTracksListByEvent,
        props: {
            payload: payload,
        },
    });
}
