import type { ComponentProps } from "react";

import { Input } from "@/share/components/ui/input";
import { cn } from "@/share/lib/utils";

export type CustomInputProps = ComponentProps<typeof Input>;

export const CustomInput = ({ className, ...rest }: CustomInputProps) => {
	return (
		<Input
			className={cn(
				"h-[58px] px-[21px] py-[18px] placeholder:text-cus-placeholder placeholder:text-[15px] border border-cus-border-input-focus rounded-[10px] text-cus-muted-secondary",
				className,
			)}
			{...rest}
		/>
	);
};
