import { useCustomQuery } from "@/share/hooks/cus-use-query";
import { discoveryApi } from "../apis/discovery.api";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";
import type { DiscoverySearchClass } from "../models/class/discovery-search.class";

export function useGetEventsLive(payload: DiscoverySearchClass) {
    return useCustomQuery({
        key: DISCOVERY_ENDPOINTS.EVENT_LIVE_LIST,
        fn: discoveryApi.getEventLiveList,
        props: {
            payload: payload,
        },
    });
}
