import { useCustomMutation } from "@/share/hooks/cus-use-mutation";
import { discoveryApi } from "../apis/discovery.api";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";

export function useCreateQuoteSubmission() {
	return useCustomMutation<
		any,
		{ eventId: string; selectedSource: string; spendWalletAddress: string }
	>({
		key: DISCOVERY_ENDPOINTS.SUBMISSION_QUOTE,
		fn: discoveryApi.createSubmissionQuote,
	});
}
