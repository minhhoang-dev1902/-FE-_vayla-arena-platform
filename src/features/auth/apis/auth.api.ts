import { apiCommonService } from "@/share/services/api-common";
import { credentialStorage } from "@/share/storage/credential.storage";
import { AUTH_ENDPOINTS } from "../endpoints";
import { type LoginResponseClass, RefreshTokenResponseClass } from "../models/class/user.class";

export const authApi = {
	login: async (data: { accessToken: string | null }) => {
		const response = await apiCommonService.post<
			LoginResponseClass,
			{ accessToken: string | null }
		>({
			url: AUTH_ENDPOINTS.AUTH_LOGIN,
			config: { data },
		});
		return response.data;
	},

	refreshToken: async () => {
		const refreshToken = credentialStorage.getRefreshToken();
		if (!refreshToken) {
			throw new Error("No refresh token available");
		}
		const response = await apiCommonService.post<
			RefreshTokenResponseClass,
			{ refreshToken: string }
		>({
			url: AUTH_ENDPOINTS.AUTH_REFRESH_TOKEN,
			config: { data: { refreshToken } },
		});
		const result = new RefreshTokenResponseClass(response.data);
		if (result.success) {
			credentialStorage.setAccessToken(result.data.accessToken);
			credentialStorage.setRefreshToken(result.data.refreshToken);
		}
		return result;
	},
};
