import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/share/components/ui/field"
import { CustomInput } from "./CustomInput";
import { cn } from "@/share/lib/utils";

interface CustomInputGroupProps {
    label: string;
    description?: string;
    placeholder?: string;
    type?: string;
    id?: string;
    className?: string;
}
export function CustomInputGroup(props: CustomInputGroupProps) {
    const { label, description, placeholder, type, id, className } = props;
    return (
        <Field>
            <FieldLabel
                htmlFor={id}
                className="text-dark-primary size-[13px] leading-[15px] font-semibold tracking-[0.8px]"
            >
                {label}
            </FieldLabel>
            <CustomInput id={id} type={type} placeholder={placeholder} className={cn("mt-[6px]", className)} />
            <FieldDescription>
                {description}
            </FieldDescription>

        </Field>
    )
}
