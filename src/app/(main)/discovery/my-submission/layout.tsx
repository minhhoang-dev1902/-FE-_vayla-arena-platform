"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { HeaderWithBackBtn } from "@/share/components/layout/headers/HeadeWithBackBtn";
import { NAVIGATE } from "@/share/contants/navigate";

export default function MySubmissionLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const handleBtnBackClick = useCallback(() => {
		router.push(NAVIGATE.DISCOVERY);
	}, [router]);

	return (
		<div className="bg-white">
			<HeaderWithBackBtn title="My Submissions" onBtnBackClick={handleBtnBackClick} />
			{children}
		</div>
	);
}
