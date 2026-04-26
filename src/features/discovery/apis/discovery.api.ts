import { apiCommonService } from "@/share/services/api-common";
import { DISCOVERY_ENDPOINTS } from "../endpoints/discovery.endpoints";
import {
	type DiscoverySearchClass,
	DiscoverySearchResponseClass,
} from "../models/class/discovery-search.class";
export const discoveryApi = {
	getTracksList: async (search: DiscoverySearchClass) => {
		const { type } = search;
		const url = `${DISCOVERY_ENDPOINTS.TRACKS_LIST}/${type}`;
		const response = await apiCommonService.get<DiscoverySearchResponseClass, DiscoverySearchClass>(
			{
				url: url,
				config: { params: search },
			},
		);
		return new DiscoverySearchResponseClass(response.data);
	},
};
