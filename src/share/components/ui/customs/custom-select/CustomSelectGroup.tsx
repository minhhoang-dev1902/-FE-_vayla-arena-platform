"use client";

import { Field, FieldDescription, FieldLabel } from "@/share/components/ui/field";
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

type TCustomSelectItem = {
	label: string;
	value: string;
};

interface CustomSelectGroupProps {
	label: string;
	value?: string;
	className?: string;
	groupLabel?: string;
	description?: string;
	placeholder?: string;
	triggerClassName?: string;
	items: TCustomSelectItem[];
	onValueChange?: (value: string | null) => void;
}

export function CustomSelectGroup(props: CustomSelectGroupProps) {
	const {
		label,
		value,
		className,
		items = [],
		groupLabel,
		description,
		onValueChange,
		triggerClassName,
		placeholder = "Choice",
	} = props;

	return (
		<Field className={cn(className)}>
			<FieldLabel className="text-dark-primary text-[13px] leading-[15px] font-semibold tracking-[0.8px] uppercase">
				{label}
			</FieldLabel>

			<Select value={value} onValueChange={nextValue => onValueChange?.(nextValue)}>
				<SelectTrigger
					className={cn(
						"mt-[10px] h-[68px] w-full rounded-[22px] border-[#8B919D] px-[21px] pr-[18px] text-[15px] data-placeholder:text-[#B5B5B5] [&>svg]:-rotate-90 [&>svg]:text-[#6F7786] [&>svg:not([class*='size-'])]:size-8",
						triggerClassName,
					)}
				>
					<SelectValue placeholder={placeholder} className="text-[15px] leading-[24px]" />
				</SelectTrigger>

				<SelectContent>
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

			{description ? <FieldDescription>{description}</FieldDescription> : null}
		</Field>
	);
}
