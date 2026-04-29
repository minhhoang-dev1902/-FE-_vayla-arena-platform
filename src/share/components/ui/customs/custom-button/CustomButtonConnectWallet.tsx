"use client";

import { useConnectWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { LogOutIcon, WalletIcon } from "lucide-react";
import { type ComponentProps, useCallback, useMemo, useState } from "react";

import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";

function shortenAddress(address?: string) {
	if (!address) return "";
	return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export type CustomButtonConnectWalletProps = Omit<
	ComponentProps<typeof Button>,
	"onClick" | "children"
> & {
	connectedLabel?: (address: string) => string;
	disconnectedLabel?: string;
};

export function CustomButtonConnectWallet(props: CustomButtonConnectWalletProps) {
	const {
		className,
		connectedLabel = shortenAddress,
		disconnectedLabel = "Connect Wallet",
		variant,
		size = "lg",
		...rest
	} = props;

	const { ready, authenticated, logout } = usePrivy();
	const { wallets } = useWallets();
	const { connectWallet } = useConnectWallet({
		onError: err => {
			console.warn("connect wallet failed:", err);
		},
	});

	const [confirmingLogout, setConfirmingLogout] = useState(false);

	const activeAddress = useMemo(() => wallets[0]?.address, [wallets]);
	const isConnected = ready && authenticated && Boolean(activeAddress);

	const handleClick = useCallback(() => {
		if (!ready) return;

		if (!isConnected) {
			connectWallet();
			return;
		}

		if (!confirmingLogout) {
			setConfirmingLogout(true);
			return;
		}

		void logout();
		setConfirmingLogout(false);
	}, [ready, isConnected, confirmingLogout, connectWallet, logout]);

	const label = isConnected
		? confirmingLogout
			? "Disconnect"
			: connectedLabel(activeAddress as string)
		: disconnectedLabel;

	return (
		<Button
			type="button"
			variant={variant ?? (isConnected ? "outline" : "default")}
			size={size}
			disabled={!ready}
			onClick={handleClick}
			onMouseLeave={() => setConfirmingLogout(false)}
			className={cn(
				"gap-2 rounded-full px-4",
				isConnected ? "border-[#00A88E]/30 bg-[#E6F7F3] text-[#0E2D2A] hover:bg-[#D4F0EA]" : "",
				confirmingLogout
					? "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/30"
					: "",
				className,
			)}
			{...rest}
		>
			{isConnected ? (
				confirmingLogout ? (
					<LogOutIcon className="size-4" />
				) : (
					<span className="size-2 rounded-full bg-[#00A88E]" aria-hidden="true" />
				)
			) : (
				<WalletIcon className="size-4" />
			)}
			<span className="font-mono text-[13px] tracking-tight">{label}</span>
		</Button>
	);
}
