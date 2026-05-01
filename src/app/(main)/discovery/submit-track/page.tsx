"use client";

import { useCallback, useRef, useState } from "react";
import type { SubmitTrackResponseClass } from "@/features/discovery/models/class/track.class";
import type { SubmitTrackErrorData } from "@/features/discovery/utils/submit-track-result";
import { HeaderWithBackBtn } from "@/share/components/layout/headers/HeadeWithBackBtn";
import { PageTransitionMotion } from "@/share/components/ui/customs/custom-motion/PageTransitionMotion";
import { NAVIGATE } from "@/share/contants/navigate";
import { ErrorView } from "./(components)/ErrorView";
import { LoadingView } from "./(components)/LoadingView";
import { SubmitTrackForm } from "./(components)/SubmitTrackForm";
import { SuccessView } from "./(components)/SuccessView";

type View = "form" | "loading" | "success" | "error";

const FALLBACK_ERROR: SubmitTrackErrorData = {
	code: "UNKNOWN_ERROR",
	message: "An unexpected error occurred.\nPlease try again.",
};

export default function SubmitTrackPage() {
	const [view, setView] = useState<View>("loading");
	const [apiPending, setApiPending] = useState(false);
	const [successResult, setSuccessResult] = useState<SubmitTrackResponseClass | null>(null);
	const [errorData, setErrorData] = useState<SubmitTrackErrorData | null>(null);

	// Ref so LoadingView's onComplete closure always sees the latest result
	const successResultRef = useRef<SubmitTrackResponseClass | null>(null);
	const pendingViewRef = useRef<"success" | "error">("success");

	// Called the moment the user hits submit (mutation fires)
	const handlePending = useCallback(() => {
		setApiPending(true);
		setView("loading");
	}, []);

	// API resolved with success — keep LoadingView visible but flip loading→false
	// so the bar completes, then onComplete switches to "success"
	const handleSuccess = useCallback((result: SubmitTrackResponseClass) => {
		pendingViewRef.current = "success";
		successResultRef.current = result;
		setSuccessResult(result);
		setApiPending(false);
	}, []);

	// Bar finished → reveal the correct view (success or error)
	const handleLoadingComplete = useCallback(() => {
		setView(pendingViewRef.current);
	}, []);

	// API resolved with error — flip loading=false so bar completes, then show error
	const handleError = useCallback((error: SubmitTrackErrorData) => {
		pendingViewRef.current = "error";
		setErrorData(error);
		setApiPending(false);
	}, []);

	const handleReset = useCallback(() => {
		setView("form");
		setApiPending(false);
		setSuccessResult(null);
		setErrorData(null);
		successResultRef.current = null;
	}, []);

	if (view === "loading") {
		return <LoadingView loading={apiPending} onComplete={handleLoadingComplete} />;
	}

	if (view === "success" && successResult) {
		return (
			<SuccessView
				result={successResult}
				onViewSubmissions={() => {
					window.location.href = NAVIGATE.MY_SUBMISSIONS;
				}}
				onBackToDiscovery={() => {
					window.location.href = NAVIGATE.DISCOVERY;
				}}
			/>
		);
	}

	if (view === "error") {
		return (
			<ErrorView
				error={errorData ?? FALLBACK_ERROR}
				onTopUp={() => {
					/* TODO: navigate to top-up flow */
				}}
				onCancel={handleReset}
			/>
		);
	}

	return (
		<PageTransitionMotion>
			<HeaderWithBackBtn
				title="Submit Track"
				onBtnBackClick={handleReset}
				description="Submit your track to the challenge"
			/>
			<div className="container">
				<SubmitTrackForm
					onPending={handlePending}
					onSuccess={handleSuccess}
					onError={handleError}
				/>
			</div>
		</PageTransitionMotion>
	);
}
