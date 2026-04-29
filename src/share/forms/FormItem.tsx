"use client";

import {
	type ChangeEvent,
	cloneElement,
	type FocusEvent,
	isValidElement,
	type ReactElement,
	type ReactNode,
} from "react";
import {
	type Control,
	type FieldPath,
	type FieldValues,
	useController,
	useFormContext,
} from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/share/components/ui/field";
import { cn } from "@/share/lib/utils";

type AnyChangeArgs =
	| [ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>]
	| [unknown];

type ClonableChildProps = {
	id?: string;
	name?: string;
	value?: unknown;
	"aria-invalid"?: boolean;
	onChange?: (...args: AnyChangeArgs) => void;
	onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export type FormItemProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
	label?: ReactNode;
	description?: ReactNode;
	className?: string;
	control?: Control<TFieldValues>;
	children: ReactElement<ClonableChildProps>;
};

export function FormItem<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormItemProps<TFieldValues, TName>) {
	const { name, label, description, className, control, children } = props;

	const ctx = useFormContext<TFieldValues>();
	const resolvedControl = control ?? ctx?.control;

	const { field, fieldState } = useController<TFieldValues, TName>({
		name,
		control: resolvedControl,
	});

	if (!isValidElement(children)) {
		return null;
	}

	const childProps = children.props as ClonableChildProps;
	const externalOnChange = childProps.onChange;
	const externalOnBlur = childProps.onBlur;

	const merged: ClonableChildProps & { ref?: typeof field.ref } = {
		id: childProps.id ?? field.name,
		name: field.name,
		ref: field.ref,
		value: (field.value ?? "") as unknown,
		"aria-invalid": fieldState.invalid || undefined,
		onChange: (...args: AnyChangeArgs) => {
			const first = args[0];
			if (first && typeof first === "object" && "target" in (first as object)) {
				const target = (first as ChangeEvent<HTMLInputElement>).target;
				if (target?.type === "checkbox") {
					field.onChange((target as HTMLInputElement).checked);
				} else {
					field.onChange(target?.value);
				}
			} else {
				field.onChange(first);
			}
			externalOnChange?.(...args);
		},
		onBlur: event => {
			field.onBlur();
			externalOnBlur?.(event);
		},
	};

	return (
		<Field
			className={cn("relative mb-6", className)}
			data-invalid={fieldState.invalid || undefined}
		>
			{label ? (
				<FieldLabel
					htmlFor={field.name}
					className="text-[13px] leading-[15px] font-semibold tracking-[0.8px] text-dark-primary mb-[8px]"
				>
					{label}
				</FieldLabel>
			) : null}

			{cloneElement(children, merged)}

			{description ? <FieldDescription>{description}</FieldDescription> : null}

			{fieldState.error ? (
				<FieldError
					errors={[{ message: fieldState.error.message }]}
					className="absolute left-0 top-full mt-[4px] text-[12px] leading-[14px] animate-in fade-in slide-in-from-top-1 duration-200"
				/>
			) : null}
		</Field>
	);
}
