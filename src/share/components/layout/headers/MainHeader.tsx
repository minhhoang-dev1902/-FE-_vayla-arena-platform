"use client";

import Link from "next/link";
import { cn } from "@/share/lib/utils";

export function MainHeader() {
	return (
		<header className={cn("px-6 mb-[1.5rem]", "header-sticky bg-white py-[1rem] shadow-header")}>
			<div className={cn("", "flex justify-between items-center")}>
				<Link href="/discovery" className="text-[1.25rem] leading-none tracking-tight text-black">
					<span className="font-extrabold">VAYLA</span>
					<span className="ml-2 font-medium">Discovery</span>
				</Link>

				<div className="text-[11px] font-medium text-[#878683] bg-[#EAEAEA] p-3 rounded-[1rem]">
					Platform Balance: 124 Vayla
				</div>
			</div>
		</header>
	);
}
