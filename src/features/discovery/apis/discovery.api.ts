import { apiCommonService } from "@/share/services/api-common";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";
import {
	EventDetailResponseClass,
	type EventSearchClass,
	EventsSearchResponseClass,
} from "../models/class/event-search.class";
import { SubmitTrackResponseClass } from "../models/class/track.class";
import {
	MySubmissionsResponseClass,
	type MySubmissionsSearchClass,
	TrackDetailResponseClass,
	type TrackSearchByEvent,
	TrackSearchByEventResponseClass,
	TrackSearchResponseClass,
	type TracksSearchClass,
} from "../models/class/track-search.class";
import type { SubmitTrackFormValues } from "../models/schema/submit-track.schema";

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
	submitTrack: async (data: SubmitTrackFormValues) => {
		const url = DISCOVERY_ENDPOINTS.SUBMIT_TRACK;
		const response = await apiCommonService.post<SubmitTrackResponseClass, SubmitTrackFormValues>({
			url: url,
			config: { data },
		});
		return new SubmitTrackResponseClass(response.data);
	},

	getMySubmissions: async (search: MySubmissionsSearchClass) => {
		const url = DISCOVERY_ENDPOINTS.MY_SUBMISSIONS;
		const response = await apiCommonService.get<
			MySubmissionsResponseClass,
			MySubmissionsSearchClass
		>({
			url: url,
			config: { params: search },
		});
		return new MySubmissionsResponseClass(response.data);
	},

	getTrackDetail: async (id: string) => {
		const url = DISCOVERY_ENDPOINTS.TRACK_DETAIL.format({ id });
		const response = await apiCommonService.get<TrackDetailResponseClass, string>({
			url: url,
		});
		return new TrackDetailResponseClass(response.data);
	},

	checkCanSubmit: async (eventId: string) => {
		const url = DISCOVERY_ENDPOINTS.CHECK_CAN_SUBMIT.format({ eventId });
		const response = await apiCommonService.get<any, string>({
			url: url,
		});
		return response.data;
	},

	createSubmissionQuote: async (data: {
		eventId: string;
		selectedSource: string;
		spendWalletAddress: string;
	}) => {
		const url = DISCOVERY_ENDPOINTS.SUBMISSION_QUOTE;
		const response = await apiCommonService.post<
			any,
			{ eventId: string; selectedSource: string; spendWalletAddress: string }
		>({
			url: url,
			config: { data },
		});
		return response.data;
	},
};
