import axios, {
	type AxiosError,
	type AxiosInstance,
	type AxiosRequestConfig,
	type InternalAxiosRequestConfig,
	isAxiosError,
} from "axios";

const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? "";
const baseURL = raw.replace(/\/$/, "");

if (baseURL.length === 0 && process.env.NODE_ENV === "development") {
	console.warn(
		"[api] NEXT_PUBLIC_API_BASE_URL chưa cấu hình. Thêm biến trong .env.local (xem .env.example).",
	);
}

let authTokenGetter: (() => string | null | undefined) | null = null;
let onUnauthorized: (() => void) | null = null;

/** Gán cách lấy token (client: localStorage, server: cookie, v.v.) */
export function setApiAuthTokenGetter(getter: () => string | null | undefined) {
	authTokenGetter = getter;
}

/** Gắn callback khi 401 (đăng xuất, redirect /login, v.v.) */
export function setApiOnUnauthorized(handler: (() => void) | null) {
	onUnauthorized = handler;
}

function applyAuth(config: InternalAxiosRequestConfig) {
	const token = authTokenGetter?.();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	} else {
		const headers = config.headers;
		if (headers instanceof axios.AxiosHeaders) {
			headers.delete("Authorization");
		} else {
			delete (headers as Record<string, unknown>).Authorization;
		}
	}
	return config;
}

const http: AxiosInstance = axios.create({
	baseURL: baseURL.length > 0 ? baseURL : undefined,
	timeout: 30_000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	paramsSerializer: { indexes: null },
	withCredentials: false,
});

http.interceptors.request.use(
	config => {
		applyAuth(config);
		return config;
	},
	error => Promise.reject(error),
);

http.interceptors.response.use(
	response => response,
	(error: AxiosError) => {
		const status = error.response?.status;
		if (status === 401) {
			onUnauthorized?.();
		}
		if (isAxiosError(error) && process.env.NODE_ENV === "development" && error.response) {
			console.error(
				"[api]",
				error.config?.method?.toUpperCase(),
				error.config?.url,
				status,
				error.response.data,
			);
		}
		return Promise.reject(error);
	},
);

export type { AxiosRequestConfig, AxiosError };

/**
 * Dữ liệu body JSON (mặc định) — có thể dùng FormData, Blob bằng cách tắt Content-Type ở `config` hoặc dùng `http` trực tiếp.
 */
export function get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
	return http.get<T>(url, config).then(res => res.data);
}

export function post<T = unknown, D = unknown>(
	url: string,
	data?: D,
	config?: AxiosRequestConfig,
): Promise<T> {
	return http.post<T>(url, data, config).then(res => res.data);
}

export function put<T = unknown, D = unknown>(
	url: string,
	data?: D,
	config?: AxiosRequestConfig,
): Promise<T> {
	return http.put<T>(url, data, config).then(res => res.data);
}

/** HTTP DELETE. Tên hàm không dùng `delete` (reserved). */
export function del<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
	return http.delete<T>(url, config).then(res => res.data);
}

/** Thống nhất gọi `api.get` … `api.delete` (từ khóa dùng trong object). */
export const api = {
	get,
	post,
	put,
	delete: del,
} as const;

/** Truy cập thấp: instance gốc (upload file, tùy biến sâu). */
export { http as axiosInstance };
