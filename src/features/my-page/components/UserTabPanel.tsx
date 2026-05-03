"use client";

import Image from "next/image";
import tetherIcon from "@/assets/icons/tether-icon.svg";
import challengeThumb from "@/assets/images/challenge-thumnails.png";
import vaylaSymbol from "@/assets/images/vayla-symbol-custom-icon.png";
import vaylaSymbolIcon from "@/assets/images/vayla-symbol-icon.png";
import { Button } from "@/share/components/ui/button";
import { cn } from "@/share/lib/utils";

const TEAL = "#01A88E";

function fmtUsd(n: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(n);
}

function fmtNum(n: number): string {
	return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n);
}

const MOCK_HOLDINGS = [
	{ name: "VAYLA", main: 8540.2, usdEquivalent: 6832.16 },
	{ name: "USDT", main: 5618.64, usdEquivalent: 5618.64 },
] as const;

const _MOCK_NFTS = [
	{
		id: "1",
		title: "Genesis Badge #01",
		sub: "VAYLA EXCLUSIVE",
		rarity: "LEGENDARY" as const,
		corner: "STAKED" as const,
		image: vaylaSymbol,
	},
	{
		id: "2",
		title: "Arena Pass #12",
		sub: "SEASON 1",
		rarity: "RARE" as const,
		corner: "LOCKED" as const,
		image: challengeThumb,
	},
] as const;

function _RarityBadge({ type }: { type: "LEGENDARY" | "RARE" }) {
	if (type === "LEGENDARY") {
		return (
			<span className="absolute left-2 top-2 rounded-md bg-[#FACC15] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black">
				Legendary
			</span>
		);
	}
	return (
		<span className="absolute left-2 top-2 rounded-md bg-[#67E8F9] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#0C4A6E]">
			Rare
		</span>
	);
}

function _CornerBadge({ type }: { type: "STAKED" | "LOCKED" }) {
	if (type === "STAKED") {
		return (
			<span className="absolute bottom-2 right-2 rounded-full bg-[#0D9488] px-2 py-0.5 text-[8px] font-bold uppercase text-white shadow-sm">
				Staked
			</span>
		);
	}
	return (
		<span className="absolute bottom-2 right-2 rounded-full bg-[#1E293B] px-2 py-0.5 text-[8px] font-bold uppercase text-white shadow-sm">
			Locked
		</span>
	);
}

function HoldingTokenIcon({ symbol }: { symbol: string }) {
	const ringWrap = "";
	if (symbol === "VAYLA") {
		return (
			<div className={cn(ringWrap, "")} aria-hidden>
				<Image
					src={vaylaSymbolIcon}
					alt=""
					width={30}
					height={30}
					unoptimized
					className="object-contain"
				/>
			</div>
		);
	}
	if (symbol === "USDT") {
		return (
			<div className={cn(ringWrap, "")} aria-hidden>
				<Image
					src={tetherIcon}
					alt=""
					width={30}
					height={30}
					unoptimized
					className="object-contain"
				/>
			</div>
		);
	}
	return (
		<div className={cn(ringWrap, "bg-[#F4F4F5] text-[14px] font-bold text-[#18181B]")} aria-hidden>
			{symbol.slice(0, 1)}
		</div>
	);
}

export function UserTabPanel() {
	return (
		<>
			{/* Total assets */}
			<section
				className="overflow-hidden rounded-[20px] p-6 text-white mt-5"
				style={{
					background: "linear-gradient(180deg, #102222 0%, #1A2E2E 100%)",
				}}
			>
				<p className="text-[11px] font-semibold uppercase tracking-[0.55px] text-[#9CA3AF] leading-[16.5px]">
					Total Assets
				</p>

				<p className="mt-1 text-[30px] font-bold leading-[36px] tracking-tight">
					{fmtUsd(12450.8)}
				</p>

				<div className="mt-5 grid grid-cols-2 gap-3">
					<div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
						<p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
							Staked
						</p>
						<p className="mt-[2px] text-[16px] font-semibold">{fmtUsd(4200)}</p>
						{/* <p className="mt-1 text-[11px]" style={{ color: "#0D9488" }}>
							+34% Achieved
						</p> */}
					</div>
					<div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
						<p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
							Rewards
						</p>
						<p className="mt-[2px] text-[16px] font-semibold text-[#60FFF3]">~{fmtUsd(892.35)}</p>
					</div>
				</div>
			</section>

			{/* Holdings */}
			<section aria-labelledby="holdings-heading">
				<div className="rounded-[32px] bg-white p-6 shadow-sm">
					<ul className="divide-y divide-[#F3F4F6]">
						{MOCK_HOLDINGS.map(row => (
							<li
								key={row.name}
								className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
							>
								<div className="flex min-w-0 items-center gap-3">
									<HoldingTokenIcon symbol={row.name} />
									<p className="text-[15px] font-bold tracking-tight text-[#18181B]">{row.name}</p>
								</div>
								<div className="shrink-0 text-right">
									<p className="text-[15px] font-bold tabular-nums text-[#18181B]">
										{fmtNum(row.main)}
									</p>
									<p className="mt-0.5 text-[13px] font-normal tabular-nums text-[#9CA3AF]">
										{fmtUsd(row.usdEquivalent)}
									</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* NFT */}
			{/* <section aria-labelledby="nft-heading">
				<div className="mb-3 flex items-center justify-between">
					<h2 id="nft-heading" className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
						My NFT
					</h2>
					<Link
						href={NAVIGATE.HOME}
						className="inline-flex items-center gap-0.5 text-[13px] font-semibold text-[#002B2B]"
					>
						View All NFT
						<ChevronRight className="size-4" aria-hidden />
					</Link>
				</div>
				<div className="grid grid-cols-2 gap-3">
					{MOCK_NFTS.map(nft => (
						<div
							key={nft.id}
							className="overflow-hidden rounded-2xl border border-[#F1F5F9] bg-white shadow-sm"
						>
							<div className="relative aspect-square w-full bg-[#F1F5F9]">
								<Image src={nft.image} alt="" fill className="object-cover" sizes="(max-width: 480px) 45vw, 200px" />
								<RarityBadge type={nft.rarity} />
								<CornerBadge type={nft.corner} />
							</div>
							<div className="p-3">
								<p className="text-[14px] font-bold leading-tight text-[#0F172A]">{nft.title}</p>
								<p className="mt-1 text-[10px] font-semibold uppercase tracking-wide" style={{ color: TEAL }}>
									{nft.sub}
								</p>
							</div>
						</div>
					))}
				</div>
			</section> */}

			{/* Discovery progress */}
			<section
				className="mt-3 rounded-[20px] bg-white p-5 shadow-sm"
				aria-labelledby="discovery-heading"
			>
				<div className="flex items-start justify-between gap-3">
					<div>
						<h2 id="discovery-heading" className="text-[16px] font-bold text-[#0F172A]">
							Discovery Challenge
						</h2>
						<p className="mt-1 text-[12px] text-[#64748B]">Track votes & collect rewards</p>
					</div>
					<Button
						type="button"
						size="sm"
						className="shrink-0 rounded-full bg-[#0F172A] px-4 text-[11px] font-bold uppercase text-white hover:bg-[#0F172A]/90"
					>
						Manage
					</Button>
				</div>
				<div className="mt-4">
					<div className="mb-1 flex justify-between text-[11px] font-medium text-[#64748B]">
						<span>Progress</span>
						<span style={{ color: TEAL }}>34% Achieved</span>
					</div>
					<div className="h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
						<div className="h-full w-[34%] rounded-full" style={{ backgroundColor: TEAL }} />
					</div>
				</div>
				<div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#F1F5F9] pt-4">
					<div>
						<p className="text-[9px] font-bold uppercase tracking-wide text-[#94A3B8]">
							Total Reward Earned
						</p>
						<p className="mt-1 text-[15px] font-semibold tabular-nums" style={{ color: TEAL }}>
							~{fmtUsd(450.2)}
						</p>
					</div>
					<div>
						<p className="text-[9px] font-bold uppercase tracking-wide text-[#94A3B8]">
							NFTs Collected
						</p>
						<p className="mt-1 text-[15px] font-semibold tabular-nums text-[#0F172A]">12</p>
					</div>
				</div>
				<div className="mt-4 flex flex-wrap gap-2">
					<Button
						type="button"
						variant="outline"
						className="h-10 flex-1 rounded-xl border-[#E2E8F0] text-[13px] font-semibold"
					>
						My Votes
					</Button>
					<Button
						type="button"
						variant="outline"
						className="h-10 flex-1 rounded-xl border-[#E2E8F0] text-[13px] font-semibold"
					>
						Rewards
					</Button>
				</div>
			</section>
		</>
	);
}
