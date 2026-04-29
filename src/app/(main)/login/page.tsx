"use client";

import { useLoginWithOAuth, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";

const REDIRECT_AFTER_LOGIN = "/home";

export default function LoginPage() {
	const router = useRouter();
	const { authenticated, ready } = usePrivy();
	const [error, setError] = useState<string | null>(null);

	const { initOAuth, state } = useLoginWithOAuth({
		onComplete: () => {
			router.replace(REDIRECT_AFTER_LOGIN);
		},
		onError: err => {
			setError(typeof err === "string" ? err : (err as Error).message);
		},
	});

	useEffect(() => {
		if (ready && authenticated) {
			router.replace(REDIRECT_AFTER_LOGIN);
		}
	}, [ready, authenticated, router]);

	const handleGoogleLogin = useCallback(async () => {
		setError(null);
		try {
			await initOAuth({ provider: "google" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed");
		}
	}, [initOAuth]);

	const isLoading = !ready || state.status === "loading";

	return (
		<main className="grid min-h-dvh place-items-center bg-background px-6">
			<div className="w-full max-w-[420px] rounded-[24px] border border-[#EDEEEE] bg-white p-8 shadow-[0_8px_32px_rgba(15,23,42,0.06)]">
				<div className="text-center">
					<h1 className="text-[24px] font-bold leading-[28px] text-[#0E2D2A]">
						Welcome to Vayla Arena
					</h1>
					<p className="mt-2 text-[14px] leading-[20px] text-[#6B7280]">
						Sign in to start submitting tracks and joining challenges.
					</p>
				</div>

				<Button
					type="button"
					onClick={handleGoogleLogin}
					disabled={isLoading}
					className={cn(
						"mt-8 flex h-[52px] w-full items-center justify-center gap-3 rounded-[12px] border border-[#E0E0E0] bg-white px-4 text-[15px] font-semibold text-[#1A1A1A] transition-colors",
						"hover:bg-[#F5F6F7] active:bg-[#EDEEEE]",
						"disabled:cursor-not-allowed disabled:opacity-60",
					)}
				>
					<GoogleLogo className="size-5" />
					{state.status === "loading" ? "Connecting..." : "Continue with Google"}
				</Button>

				{error ? (
					<p role="alert" className="mt-4 text-center text-[12px] leading-[16px] text-destructive">
						{error}
					</p>
				) : null}

				<p className="mt-6 text-center text-[11px] leading-[16px] text-[#9AA0A6]">
					By continuing, you agree to our Terms of Service and Privacy Policy.
				</p>
			</div>
		</main>
	);
}

function GoogleLogo({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 48 48" className={className} aria-hidden="true">
			<path
				fill="#FFC107"
				d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
			/>
			<path
				fill="#FF3D00"
				d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
			/>
			<path
				fill="#4CAF50"
				d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
			/>
			<path
				fill="#1976D2"
				d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
			/>
		</svg>
	);
}
