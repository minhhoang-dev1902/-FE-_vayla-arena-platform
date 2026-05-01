import { createMutation } from "@/share/hooks/cus-use-mutation";
import { votingApi } from "../apis/voting.api";
import { VOTING_ENDPOINTS } from "../endpoints/voting.endpoints";
import type {
	TrackVotePayloadClass,
	TrackVoteResponseClass,
} from "../models/class/track-vote.class";

export const useMutateTrackVote = createMutation<TrackVoteResponseClass, TrackVotePayloadClass>({
	key: VOTING_ENDPOINTS.TRACK_VOTE,
	fn: votingApi.trackVote,
});
