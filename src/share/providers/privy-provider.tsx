"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import vaylaLogo from "@/assets/icons/vayla_symbol_icon.svg";

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? "";

export default function PrivyProviders({ children }: { children: React.ReactNode }) {
	return (
		<PrivyProvider
			appId={PRIVY_APP_ID}
			config={{
				loginMethods: ["google", "email"],
				appearance: {
					theme: "light",
					accentColor: "#00A88E",
					logo: vaylaLogo.src,
					showWalletLoginFirst: false,
				},
				embeddedWallets: {
					ethereum: {
						createOnLogin: "users-without-wallets",
					},
				},
			}}
		>
			{children}
		</PrivyProvider>
	);
}
