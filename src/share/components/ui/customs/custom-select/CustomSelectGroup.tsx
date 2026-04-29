"use client";

import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/share/components/ui/field";
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
    description?: string;
    placeholder?: string;
    groupLabel?: string;
    value?: string;
    onValueChange?: (value: string | null) => void;
    items: TCustomSelectItem[];
    className?: string;
    triggerClassName?: string;
}

export function CustomSelectGroup(props: CustomSelectGroupProps) {
    const {
        label,
        description,
        placeholder = "Choice",
        groupLabel,
        value,
        onValueChange,
        items,
        className,
        triggerClassName,
    } = props;

    return (
        <Field className={cn(className)}>
            <FieldLabel className="text-dark-primary text-[13px] leading-[15px] font-semibold tracking-[0.8px] uppercase">
                {label}
            </FieldLabel>

            <Select value={value} onValueChange={(nextValue) => onValueChange?.(nextValue)}>
                <SelectTrigger
                    className={cn(
                        "mt-[10px] h-[68px] w-full rounded-[22px] border-[#8B919D] px-[21px] pr-[18px] text-[15px] data-placeholder:text-[#B5B5B5] [&>svg]:-rotate-90 [&>svg]:text-[#6F7786] [&>svg:not([class*='size-'])]:size-8",
                        triggerClassName,
                    )}
                >
                    <SelectValue className="text-[15px] leading-[24px]" placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        {groupLabel ? <SelectLabel>{groupLabel}</SelectLabel> : null}
                        {items.map((item) => (
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
