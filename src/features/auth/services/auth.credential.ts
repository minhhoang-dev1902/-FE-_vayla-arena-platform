import { credentialStorage } from "@/share/storage/credential.storage";
import type { UserProfile } from "../types/auth.type";

export const authCredential = {
	save: (data: { accessToken: string; refreshToken: string; profile: UserProfile }) => {
		credentialStorage.setAccessToken(data.accessToken);
		credentialStorage.setRefreshToken(data.refreshToken);
		credentialStorage.setProfile(data.profile);
	},

	getAccessToken: () => credentialStorage.getAccessToken(),
	getRefreshToken: () => credentialStorage.getRefreshToken(),
	getProfile: () => credentialStorage.getProfile(),

	clear: () => credentialStorage.clearAll(),
};
