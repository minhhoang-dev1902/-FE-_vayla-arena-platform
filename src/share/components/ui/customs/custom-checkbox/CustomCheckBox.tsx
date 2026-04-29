"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";

import { cn } from "@/share/lib/utils";

export interface CustomCheckBoxProps extends CheckboxPrimitive.Root.Props {
	title: string;
	description?: string;
}

export function CustomCheckBox(props: CustomCheckBoxProps) {
	const { title, description, className, ...rest } = props;

	return (
		<CheckboxPrimitive.Root
			className={cn(
				"group/checkbox relative flex h-[89px] w-[109px] max-w-[109px] cursor-pointer flex-col rounded-[10px] border border-[#E0E0E0] bg-white p-4 text-left outline-none transition-colors",
				"data-checked:border-[#00A88E] data-checked:shadow-[inset_0_0_0_1px_#00A88E]",
				"focus-visible:ring-3 focus-visible:ring-[#00A88E]/20 disabled:cursor-not-allowed disabled:opacity-60",
				className,
			)}
			{...rest}
		>
			<span
				className={cn(
					"inline-flex h-[20px] w-[20px] items-center justify-center rounded-full border border-[#E0E0E0] bg-transparent transition-colors",
					"group-data-checked/checkbox:border-secondary-button group-data-checked/checkbox:bg-secondary-button",
				)}
			>
				<CheckboxPrimitive.Indicator className="size-[8px] rounded-full bg-white" />
			</span>

			<div className="mt-[10px]">
				<p className="line-clamp-2 text-[11px] leading-[13.75px] font-semibold tracking-normal text-[#1A1A1A]">
					{title}
				</p>
				{description ? (
					<p className="mt-0.5 line-clamp-1 text-[10px] leading-3 text-[#6B7280]">{description}</p>
				) : null}
			</div>
		</CheckboxPrimitive.Root>
	);
}
