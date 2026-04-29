"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { HeaderWithBackBtn } from "@/share/components/layout/headers/HeadeWithBackBtn";
import { PageTransitionMotion } from "@/share/components/ui/customs/custom-motion/PageTransitionMotion";
import { SubmitTrackForm } from "./(components)/SubmitTrackForm";

export default function SubmitTrackPage() {
	const router = useRouter();

	const handleBtnBackClick = useCallback(() => {
		router.back();
	}, [router]);

	return (
		<PageTransitionMotion>
			<HeaderWithBackBtn
				title="Submit Track"
				onBtnBackClick={handleBtnBackClick}
				description="Submit your track to the challenge"
			/>

			<div className="container">
				<SubmitTrackForm />
			</div>
		</PageTransitionMotion>
	);
}
