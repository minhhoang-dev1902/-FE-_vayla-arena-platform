import { useCustomMutation } from "@/share/hooks/cus-use-mutation";
import { discoveryApi } from "../apis/discovery.api";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";

export function useCallCheckSubmit() {
	return useCustomMutation<any, string>({
		key: DISCOVERY_ENDPOINTS.CHECK_CAN_SUBMIT,
		fn: discoveryApi.checkCanSubmit,
	});
}
