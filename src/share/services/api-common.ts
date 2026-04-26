import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axios";

export const apiCommonService = {
	get: <T, D>({
		url,
		config,
	}: {
		url: string;
		config?: AxiosRequestConfig<D>;
	}): Promise<AxiosResponse<T>> => {
		const { params } = config ?? {};
		return axiosInstance.get<T>(url, { params });
	},
};
