"use client";

import type { Ref } from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/share/components/ui/select";
import { cn } from "@/share/lib/utils";

export type CustomSelectItem = {
	label: string;
	value: string;
};

export interface CustomSelectProps {
	name?: string;
	value?: string;
	"aria-invalid"?: boolean;
	groupLabel?: string;
	placeholder?: string;
	className?: string;
	triggerClassName?: string;
	items: CustomSelectItem[];
	disabled?: boolean;
	ref?: Ref<HTMLButtonElement>;
	onChange?: (value: string | null) => void;
	onBlur?: () => void;
}

export function CustomSelect(props: CustomSelectProps) {
	const {
		name,
		value,
		"aria-invalid": ariaInvalid,
		items,
		groupLabel,
		placeholder = "Choice",
		className,
		triggerClassName,
		disabled,
		ref,
		onChange,
		onBlur,
	} = props;

	return (
		<Select
			name={name}
			value={value ?? ""}
			disabled={disabled}
			onValueChange={next => onChange?.(next)}
		>
			<SelectTrigger
				ref={ref}
				onBlur={onBlur}
				aria-invalid={ariaInvalid}
				className={cn(
					"w-full rounded-[10px] border-cus-border-input-focus px-[21px] pr-[18px] text-[15px] text-cus-muted-secondary data-[size=default]:h-[58px] data-[size=sm]:h-[58px] data-placeholder:text-cus-placeholder [&>svg]:-rotate-90 [&>svg]:text-[#6F7786] [&>svg:not([class*='size-'])]:size-8",
					className,
					triggerClassName,
				)}
			>
				<SelectValue placeholder={placeholder} className="text-[15px] leading-[24px]" />
			</SelectTrigger>

			<SelectContent
				side="bottom"
				sideOffset={6}
				collisionAvoidance={{
					side: "none",
					align: "shift",
					fallbackAxisSide: "none",
				}}
			>
				<SelectGroup>
					{groupLabel ? <SelectLabel>{groupLabel}</SelectLabel> : null}
					{items.map(item => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
