import { apiCommonService } from "@/share/services/api-common";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";
import {
	EventDetailResponseClass,
	type EventSearchClass,
	EventsSearchResponseClass,
} from "../models/class/event-search.class";
import type { TracksSearchClass } from "../models/class/track.class";
import {
	type TrackSearchByEvent,
	TrackSearchByEventResponseClass,
	TrackSearchResponseClass,
} from "../models/class/track-search.class";

export const discoveryApi = {
	getTracksList: async (search: TracksSearchClass) => {
		const { type } = search;
		const url = `${DISCOVERY_ENDPOINTS.TRACKS_LIST}/${type}`;
		const response = await apiCommonService.get<TrackSearchResponseClass, TracksSearchClass>({
			url: url,
			config: { params: search },
		});
		return new TrackSearchResponseClass(response.data);
	},
	getTracksListByEvent: async (search: TrackSearchByEvent) => {
		const { eventId } = search;
		const url = `${DISCOVERY_ENDPOINTS.TRACKS_LIST_EVENT}/${eventId}`;
		const response = await apiCommonService.get<
			TrackSearchByEventResponseClass,
			TrackSearchByEvent
		>({
			url: url,
			config: { params: search },
		});
		return new TrackSearchByEventResponseClass(response.data);
	},
	getEventsList: async (search: EventSearchClass) => {
		const { typeEvent } = search;
		const url = `${DISCOVERY_ENDPOINTS.EVENTS_LIST}/${typeEvent}`;
		const response = await apiCommonService.get<EventsSearchResponseClass, EventSearchClass>({
			url: url,
			config: { params: search },
		});
		return new EventsSearchResponseClass(response.data);
	},

	getEventDetail: async (id: string) => {
		const url = DISCOVERY_ENDPOINTS.EVENT_DETAIL.format({ id });
		const response = await apiCommonService.get<EventDetailResponseClass, string>({
			url: url,
		});
		return new EventDetailResponseClass(response.data);
	},
};
