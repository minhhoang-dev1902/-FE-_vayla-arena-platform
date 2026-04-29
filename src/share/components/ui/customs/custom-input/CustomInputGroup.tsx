import { Field, FieldDescription, FieldLabel } from "@/share/components/ui/field";
import { cn } from "@/share/lib/utils";
import { CustomInput } from "./CustomInput";

interface CustomInputGroupProps {
	id?: string;
	label: string;
	type?: string;
	className?: string;
	description?: string;
	placeholder?: string;
}
export function CustomInputGroup(props: CustomInputGroupProps) {
	const { id, type, label, className, description, placeholder } = props;
	return (
		<Field>
			<FieldLabel
				htmlFor={id}
				className="text-dark-primary size-[13px] leading-[15px] font-semibold tracking-[0.8px]"
			>
				{label}
			</FieldLabel>
			<CustomInput
				id={id}
				type={type}
				placeholder={placeholder}
				className={cn("mt-[6px]", className)}
			/>
			<FieldDescription>{description}s</FieldDescription>
		</Field>
	);
}
