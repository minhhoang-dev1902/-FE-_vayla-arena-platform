import { useCustomQuery } from "@/share/hooks/cus-use-query";
import { discoveryApi } from "../apis/discovery.api";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";
import type { EventSearchClass } from "../models/class/event-search.class";

export function useGetEvents(payload: EventSearchClass) {
	return useCustomQuery({
		key: DISCOVERY_ENDPOINTS.EVENTS_LIST,
		fn: discoveryApi.getEventsList,
		props: {
			payload: payload,
		},
	});
}
