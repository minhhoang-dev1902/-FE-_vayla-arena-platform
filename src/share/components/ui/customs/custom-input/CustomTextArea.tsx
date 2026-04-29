import type { ComponentProps } from "react";

import { Textarea } from "@/share/components/ui/textarea";
import { cn } from "@/share/lib/utils";

export type CustomTextAreaProps = ComponentProps<typeof Textarea>;

export const CustomTextArea = ({ className, ...rest }: CustomTextAreaProps) => {
	return (
		<Textarea
			className={cn(
				"h-[120px] px-[21px] py-[18px] placeholder:text-cus-placeholder placeholder:text-[15px] border border-cus-border-input-focus rounded-[10px] text-cus-muted-secondary resize-none",
				className,
			)}
			{...rest}
		/>
	);
};
