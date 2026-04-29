import { Input } from "@/share/components/ui/input";
import { cn } from "@/share/lib/utils";

interface CustomInputProps {
    placeholder?: string;
    type?: string;
    id?: string;
    className?: string;
}
export const CustomInput = (props: CustomInputProps) => {
    const { placeholder, type, id, className } = props;
    return (
        <Input
            id={id}
            type={type}
            placeholder={placeholder}
            className={cn(
                "h-[58px] px-[21px] py-[18px] placeholder:[#666666]/40  placeholder:text-[15px] border border-[#8B919D] rounded-[10px]",
                className
            )}
        />

    )
}