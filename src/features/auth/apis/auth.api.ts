import { apiCommonService } from "@/share/services/api-common";
import { AUTH_ENDPOINTS } from "../endpoints";
import type { LoginResponseClass } from "../models/class/user.class";

export const authApi = {
	login: async (data: { accessToken: string | null }) => {
		const response = await apiCommonService.post<
			LoginResponseClass,
			{ accessToken: string | null }
		>({
			url: AUTH_ENDPOINTS.AUTH_LOGIN,
			config: {
				data,
			},
		});
		return response.data;
	},
};
