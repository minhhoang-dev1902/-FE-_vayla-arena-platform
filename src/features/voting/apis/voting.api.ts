import { apiCommonService } from "@/share/services/api-common";
import { VOTING_ENDPOINTS } from "../endpoints/voting.endpoints";
import {
	type TrackVotePayloadClass,
	TrackVoteResponseClass,
} from "../models/class/track-vote.class";

export const votingApi = {
	trackVote: async (payload: TrackVotePayloadClass) => {
		const url = VOTING_ENDPOINTS.TRACK_VOTE;
		const response = await apiCommonService.post<TrackVoteResponseClass, TrackVotePayloadClass>({
			url: url,
			config: { data: payload },
		});
		return new TrackVoteResponseClass(response.data);
	},
};
