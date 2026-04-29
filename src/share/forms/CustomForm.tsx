"use client";

import type { ComponentProps, ReactNode } from "react";
import {
	type DefaultValues,
	type FieldValues,
	FormProvider,
	type SubmitErrorHandler,
	type SubmitHandler,
	type UseFormReturn,
} from "react-hook-form";

import { cn } from "@/share/lib/utils";

import { type FormSchema, useCustomForm } from "./use-custom-form";

type FormChildren<TValues extends FieldValues> =
	| ReactNode
	| ((form: UseFormReturn<TValues>) => ReactNode);

type BaseFormAttrs = Omit<ComponentProps<"form">, "onSubmit" | "children">;

type ControlledProps<TValues extends FieldValues> = BaseFormAttrs & {
	form: UseFormReturn<TValues>;
	onSubmit: SubmitHandler<TValues>;
	onInvalid?: SubmitErrorHandler<TValues>;
	children: FormChildren<TValues>;
	schema?: never;
	defaultValues?: never;
};

type UncontrolledProps<TValues extends FieldValues> = BaseFormAttrs & {
	schema: FormSchema<TValues>;
	defaultValues?: DefaultValues<TValues>;
	onSubmit: SubmitHandler<TValues>;
	onInvalid?: SubmitErrorHandler<TValues>;
	children: FormChildren<TValues>;
	form?: never;
};

export type CustomFormProps<TValues extends FieldValues> =
	| ControlledProps<TValues>
	| UncontrolledProps<TValues>;

export function CustomForm<TValues extends FieldValues>(props: CustomFormProps<TValues>) {
	if ("form" in props && props.form) {
		return <ControlledForm<TValues> {...(props as ControlledProps<TValues>)} />;
	}
	return <UncontrolledForm<TValues> {...(props as UncontrolledProps<TValues>)} />;
}

function FormShell<TValues extends FieldValues>(props: {
	form: UseFormReturn<TValues>;
	onSubmit: SubmitHandler<TValues>;
	onInvalid?: SubmitErrorHandler<TValues>;
	className?: string;
	children: FormChildren<TValues>;
	formAttrs: BaseFormAttrs;
}) {
	const { form, onSubmit, onInvalid, className, children, formAttrs } = props;

	return (
		<FormProvider {...form}>
			<form
				noValidate
				className={cn(className)}
				onSubmit={form.handleSubmit(onSubmit, onInvalid)}
				{...formAttrs}
			>
				{typeof children === "function" ? children(form) : children}
			</form>
		</FormProvider>
	);
}

function ControlledForm<TValues extends FieldValues>(props: ControlledProps<TValues>) {
	const { form, onSubmit, onInvalid, className, children, ...formAttrs } = props;

	return (
		<FormShell<TValues>
			form={form}
			onSubmit={onSubmit}
			onInvalid={onInvalid}
			className={className}
			formAttrs={formAttrs}
		>
			{children}
		</FormShell>
	);
}

function UncontrolledForm<TValues extends FieldValues>(props: UncontrolledProps<TValues>) {
	const { schema, defaultValues, onSubmit, onInvalid, className, children, ...formAttrs } = props;

	const form = useCustomForm<TValues>({ schema, defaultValues });

	return (
		<FormShell<TValues>
			form={form}
			onSubmit={onSubmit}
			onInvalid={onInvalid}
			className={className}
			formAttrs={formAttrs}
		>
			{children}
		</FormShell>
	);
}
