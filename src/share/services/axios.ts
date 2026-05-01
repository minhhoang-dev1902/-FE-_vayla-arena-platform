import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { AUTH_ENDPOINTS } from "@/features/auth/endpoints";
import { credentialStorage } from "@/share/storage/credential.storage";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 10000,
	headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(config => {
	if (typeof window === "undefined") return config;

	const accessToken = localStorage.getItem("access_token");
	if (accessToken) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

type PendingRequest = {
	resolve: (token: string) => void;
	reject: (err: unknown) => void;
};

let isRefreshing = false;
let pendingQueue: PendingRequest[] = [];

function flushQueue(error: unknown, token: string | null) {
	for (const req of pendingQueue) {
		token ? req.resolve(token) : req.reject(error);
	}
	pendingQueue = [];
}

function isTokenExpiredError(error: AxiosError): boolean {
	const data = error.response?.data as { success?: boolean; error?: { code?: string } } | undefined;
	return error.response?.status === 401 && data?.error?.code === "AUTH_TOKEN_EXPIRED";
}

axiosInstance.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean;
		};

		if (originalRequest.url?.includes(AUTH_ENDPOINTS.AUTH_REFRESH_TOKEN)) {
			credentialStorage.clearAll();
			if (typeof window !== "undefined") window.location.replace("/login");
			return Promise.reject(error);
		}

		if (!isTokenExpiredError(error) || originalRequest._retry) {
			return Promise.reject(error);
		}

		if (isRefreshing) {
			return new Promise<string>((resolve, reject) => {
				pendingQueue.push({ resolve, reject });
			}).then(newToken => {
				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${newToken}`;
				}
				return axiosInstance(originalRequest);
			});
		}

		originalRequest._retry = true;
		isRefreshing = true;

		try {
			const { authApi } = await import("@/features/auth/apis/auth.api");
			const result = await authApi.refreshToken();

			if (!result.success) {
				throw new Error("Token refresh failed");
			}

			const newToken = result.data.accessToken;
			flushQueue(null, newToken);

			if (originalRequest.headers) {
				originalRequest.headers.Authorization = `Bearer ${newToken}`;
			}
			return axiosInstance(originalRequest);
		} catch (refreshError) {
			flushQueue(refreshError, null);
			credentialStorage.clearAll();
			if (typeof window !== "undefined") window.location.replace("/login");
			return Promise.reject(refreshError);
		} finally {
			isRefreshing = false;
		}
	},
);

export default axiosInstance;
