import { apiCommonService } from "@/share/services/api-common";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";
import {
	type TracksSearchClass,
} from "../models/class/track.class";
import { TrackSearchByEvent, TrackSearchByEventResponseClass, TrackSearchResponseClass } from "../models/class/track-search.class";
import { EEventSearchType, EventSearchClass, EventSearchFactory, EventSearchResponseClass } from "../models/class/event-search.class";

export const discoveryApi = {
	getTracksList: async (search: TracksSearchClass) => {
		const { type } = search;
		const url = `${DISCOVERY_ENDPOINTS.TRACKS_LIST}/${type}`;
		const response = await apiCommonService.get<TrackSearchResponseClass, TracksSearchClass>(
			{
				url: url,
				config: { params: search },
			},
		);
		return new TrackSearchResponseClass(response.data);
	},
	getTracksListByEvent: async (search: TrackSearchByEvent) => {
		const { eventId } = search;
		const url = `${DISCOVERY_ENDPOINTS.TRACKS_LIST_EVENT}/${eventId}`;
		const response = await apiCommonService.get<TrackSearchByEventResponseClass, TrackSearchByEvent>(
			{
				url: url,
				config: { params: search },
			},
		);
		return new TrackSearchByEventResponseClass(response.data);
	},
	getEventLiveList: async (search: EventSearchClass) => {
		const normalizedSearch = EventSearchFactory.create(EEventSearchType.LIVE, search);
		const url = `${DISCOVERY_ENDPOINTS.EVENT_LIVE_LIST}`;
		const response = await apiCommonService.get<EventSearchResponseClass, EventSearchClass>(
			{
				url: url,
				config: { params: normalizedSearch },
			},
		);
		return new EventSearchResponseClass(response.data);
	},
};
