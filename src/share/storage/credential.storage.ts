// src/share/storage/credential.storage.ts
import type { UserClass } from "@/features/auth/models/class/user.class";

const KEYS = {
	ACCESS_TOKEN: "access_token",
	REFRESH_TOKEN: "refresh_token",
	PROFILE: "profile",
} as const;

export const credentialStorage = {
	getAccessToken: () => localStorage.getItem(KEYS.ACCESS_TOKEN),
	setAccessToken: (token: string) => localStorage.setItem(KEYS.ACCESS_TOKEN, token),

	getRefreshToken: () => localStorage.getItem(KEYS.REFRESH_TOKEN),
	setRefreshToken: (token: string) => localStorage.setItem(KEYS.REFRESH_TOKEN, token),

	getProfile: (): UserClass | null => {
		const raw = localStorage.getItem(KEYS.PROFILE);
		return raw ? JSON.parse(raw) : null;
	},
	setProfile: (profile: UserClass) => localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile)),

	clearAll: () => {
		Object.values(KEYS).forEach(key => {
			localStorage.removeItem(key);
		});
	},
};
