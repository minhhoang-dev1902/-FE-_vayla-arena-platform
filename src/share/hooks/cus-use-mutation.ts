import type { MutationKey, UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

type MutationCallbacks<TData, TPayload, TError, TContext> = Pick<
	UseMutationOptions<TData, TError, TPayload, TContext>,
	"onSuccess" | "onError" | "onSettled" | "onMutate"
>;

interface CustomMutationProps<TData, TPayload, TError = Error, TContext = unknown>
	extends MutationCallbacks<TData, TPayload, TError, TContext> {
	mutationOptions?: Omit<
		UseMutationOptions<TData, TError, TPayload, TContext>,
		"mutationKey" | "mutationFn" | "onSuccess" | "onError" | "onSettled" | "onMutate"
	>;
}

interface UseCustomMutationOptions<TData, TPayload, TError = Error, TContext = unknown> {
	key: string;
	fn: (payload: TPayload) => Promise<TData>;
	props?: CustomMutationProps<TData, TPayload, TError, TContext>;
}

export function createMutationKey(key: string): MutationKey {
	return [key];
}

export function createMutation<TData, TPayload, TError = Error, TContext = unknown>({
	key,
	fn,
}: {
	key: string;
	fn: (payload: TPayload) => Promise<TData>;
}) {
	return function useBoundMutation(props?: CustomMutationProps<TData, TPayload, TError, TContext>) {
		return useCustomMutation<TData, TPayload, TError, TContext>({ key, fn, props });
	};
}

export function useCustomMutation<TData, TPayload, TError = Error, TContext = unknown>({
	key,
	fn,
	props,
}: UseCustomMutationOptions<TData, TPayload, TError, TContext>) {
	const mutationKey = createMutationKey(key);
	const { onSuccess, onError, onSettled, onMutate, mutationOptions } = props ?? {};

	return useMutation<TData, TError, TPayload, TContext>({
		mutationKey,
		mutationFn: (payload: TPayload) => fn(payload),
		onSuccess,
		onError,
		onSettled,
		onMutate,
		...mutationOptions,
	});
}
