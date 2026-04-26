import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

interface CustomQueryProps<TData, TPayload, TError = Error> {
	payload?: TPayload;
	queryOptions?: Omit<UseQueryOptions<TData, TError, TData, QueryKey>, "queryKey" | "queryFn">;
}

interface UseCustomQueryOptions<TData, TPayload, TError = Error> {
	key: string;
	fn: (payload: TPayload) => Promise<TData>;
	props: CustomQueryProps<TData, TPayload, TError>;
}

export function createQueryKey(key: string, payload?: unknown): QueryKey {
	if (payload === undefined) return [key];
	return [key, JSON.stringify(payload)];
}

export function useCustomQuery<TData, TPayload, TError = Error>({
	key,
	fn,
	props: { payload, queryOptions },
}: UseCustomQueryOptions<TData, TPayload, TError>) {
	const queryKey = createQueryKey(key, payload);

	return useQuery<TData, TError, TData, QueryKey>({
		queryKey,
		queryFn: () => fn(payload ?? ({} as TPayload)),
		...queryOptions,
	});
}
