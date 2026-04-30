import { credentialStorage } from "@/share/storage/credential.storage";
import { UserClass } from "../models/class/user.class";

export const authCredential = {
	save: (data: { accessToken: string; refreshToken: string; profile: UserClass }) => {
		credentialStorage.setAccessToken(data.accessToken);
		credentialStorage.setRefreshToken(data.refreshToken);
		credentialStorage.setProfile(new UserClass(data.profile));
	},

	getAccessToken: () => credentialStorage.getAccessToken(),
	getRefreshToken: () => credentialStorage.getRefreshToken(),
	getProfile: () => credentialStorage.getProfile(),

	clear: () => credentialStorage.clearAll(),
};
