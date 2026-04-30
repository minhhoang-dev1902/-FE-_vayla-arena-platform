import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(config => {
	if (typeof window === "undefined") {
		return config;
	}

	const accessToken = localStorage.getItem("access_token");
	if (!accessToken) {
		return config;
	}

	config.headers = config.headers ?? {};
	config.headers.Authorization = `Bearer ${accessToken}`;

	return config;
});

export default axiosInstance;
