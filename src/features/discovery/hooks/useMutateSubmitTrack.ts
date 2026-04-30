import { useCustomMutation } from "@/share/hooks/cus-use-mutation";
import { discoveryApi } from "../apis/discovery.api";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";
import type { SubmitTrackResponseClass } from "../models/class/track.class";
import type { SubmitTrackFormValues } from "../models/schema/submit-track.schema";

export function useMutateSubmitTrack() {
	return useCustomMutation<SubmitTrackResponseClass, SubmitTrackFormValues>({
		key: DISCOVERY_ENDPOINTS.SUBMIT_TRACK,
		fn: discoveryApi.submitTrack,
	});
}
