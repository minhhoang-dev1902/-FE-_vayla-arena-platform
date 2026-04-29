"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	type DefaultValues,
	type FieldValues,
	type UseFormProps,
	type UseFormReturn,
	useForm,
} from "react-hook-form";
import type { ZodType } from "zod";

/** Schema có Input/Output cùng kiểu `TValues` (đa số schema bình thường đều như vậy). */
export type FormSchema<TValues extends FieldValues = FieldValues> = ZodType<TValues, TValues>;

export type UseCustomFormProps<TValues extends FieldValues> = Omit<
	UseFormProps<TValues>,
	"resolver" | "defaultValues"
> & {
	schema: FormSchema<TValues>;
	defaultValues?: DefaultValues<TValues>;
};

export function useCustomForm<TValues extends FieldValues>(
	props: UseCustomFormProps<TValues>,
): UseFormReturn<TValues> {
	const { schema, defaultValues, ...rest } = props;

	return useForm<TValues>({
		mode: "onSubmit",
		...rest,
		resolver: zodResolver(schema),
		defaultValues,
	});
}
