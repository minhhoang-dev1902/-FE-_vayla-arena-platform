"use client";

import { Button } from "@/share/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface HeaderWithBackBtnProps {
    title: string;
    description?: string;
    onBtnBackClick: () => void;
}
export function HeaderWithBackBtn(props: HeaderWithBackBtnProps) {
    const router = useRouter();
    const { title, description, onBtnBackClick } = props;

    const handleClickBack = useCallback(() => {
        if (onBtnBackClick) {
            onBtnBackClick();
        } else {
            router.back();
        }
    }, [onBtnBackClick, router]);


    return (
        <div className=" flex items-center gap-[1rem] py-[0.875rem] header-sticky shadow-header container">
            <Button onClick={handleClickBack} className="w-10 h-10 bg-white p-2 rounded-full" variant="outline">
                <ArrowLeftIcon className="size-[1rem] text-black" />
            </Button>
            <div className="flex flex-col">
                <p className="text-[1rem] font-semibold text-black leading-[28px]">{title}</p>
                {description && <p className="text-[11px] text-[#666666] leading-[16.5px]">{description}</p>}
            </div>
        </div>
    );
}