"use client";

import { format, isValid, parseISO } from "date-fns";
import { ArrowLeft, MapPin } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import upChartIcon from "@/assets/icons/up-chart-icon.svg";
import walletMutedIcon from "@/assets/icons/wallet-muted-icon.svg";
import cardFundingFallback from "@/assets/images/card_funding_web3.png";
import { useGetFundingById } from "@/features/fundings/hooks/useGetFundingById";
import {
	EFundingBoostStatus,
	type FundingProjectClass,
} from "@/features/fundings/models/class/funding-list.class";
import { HeaderWithBackBtn } from "@/share/components/layout/headers/HeadeWithBackBtn";
import { Button } from "@/share/components/ui/button";
import { CustomBadgeStatus } from "@/share/components/ui/customs/custom-badge/CustomBadgeStatus";
import { CustomEmpty } from "@/share/components/ui/customs/custom-fallback/CustomEmpty";
import { PageTransitionMotion } from "@/share/components/ui/customs/custom-motion/PageTransitionMotion";
import { NAVIGATE } from "@/share/contants/navigate";

const MAX_INPUT_INTEGER_DIGITS = 15;
const MAX_INPUT_FRACTION_DIGITS = 6;

const PLATFORM_FEE_RATE = 0.004;
const NETWORK_FEE_USDT = 5;
const MOCK_AVAILABLE_BALANCE_USDT = 12_450;
const DEFAULT_EST_REWARD_PCT = 12.5;

function formatSettlementLine(iso: string): string {
	const d = parseISO(iso);
	if (!isValid(d)) return "";
	return format(d, "MMMM d, yyyy");
}

function statusBadgeLabel(status: string): string {
	if (status === "active" || status === EFundingBoostStatus.IN_PROGRESS) return "ACTIVE";
	if (!status) return "ACTIVE";
	return status.replace(/_/g, " ").toUpperCase();
}

/** Cắt phần nguyên / thập phân theo ngưỡng khi user gõ quá dài */
function limitDecimalInputLength(raw: string): string {
	const cleaned = raw.replace(/,/g, "").replace(/[^\d.]/g, "");
	const firstDot = cleaned.indexOf(".");
	const intSection = firstDot === -1 ? cleaned : cleaned.slice(0, firstDot);
	const fracSection = firstDot === -1 ? "" : cleaned.slice(firstDot + 1).replace(/\./g, "");

	let intDigits = intSection.replace(/^0+(?=\d)/, "");
	intDigits = intDigits.slice(0, MAX_INPUT_INTEGER_DIGITS);

	if (firstDot === -1) {
		return intDigits;
	}

	if (intDigits === "" && fracSection.length > 0) {
		intDigits = "0";
	}

	const fracDigits = fracSection.slice(0, MAX_INPUT_FRACTION_DIGITS);

	if (cleaned.endsWith(".") && fracSection === "") {
		return `${intDigits || "0"}.`;
	}

	if (fracDigits.length > 0) {
		return `${intDigits || "0"}.${fracDigits}`;
	}

	return intDigits || "0";
}

function parseAmountInput(raw: string): number {
	const cleaned = raw.replace(/,/g, "").replace(/[^\d.]/g, "");
	if (cleaned === "" || cleaned === ".") return 0;
	const n = Number.parseFloat(cleaned);
	if (!Number.isFinite(n)) return 0;
	if (n > Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
	if (n < -Number.MAX_SAFE_INTEGER) return -Number.MAX_SAFE_INTEGER;
	return n;
}

function formatInputDisplay(n: number): string {
	if (n <= 0) return "";
	if (Number.isInteger(n)) return String(n);
	return String(n);
}

function formatUsdtAmount(n: number): string {
	return new Intl.NumberFormat("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(n);
}

function formatUsdtInteger(n: number): string {
	return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
}

function suggestedParticipation(funding: FundingProjectClass): number {
	const minU = funding.min_contribution ?? 100;
	const remaining = Math.max(0, funding.target_amount - funding.raised_amount);
	const suggestion = remaining > 0 ? Math.min(5000, remaining) : minU;
	return Math.max(minU, suggestion);
}

export default function BoostParticipatePage() {
	const router = useRouter();
	const params = useParams();
	const rawId =
		typeof params?.id === "string"
			? params.id
			: Array.isArray(params?.id)
				? params.id[0]
				: undefined;
	const idParam = rawId?.trim() || undefined;

	const { data, isPending, isError } = useGetFundingById(idParam);

	const funding = useMemo((): FundingProjectClass | undefined => {
		const project = data?.data?.project;
		if (!data?.success || !project?.id) return undefined;
		return project;
	}, [data]);

	const settlementIso = funding?.settlement_date ?? funding?.end_date ?? "";
	const _settlementDate = funding ? formatSettlementLine(settlementIso) : "";

	const minU = funding ? (funding.min_contribution ?? 100) : 0;
	const remainingPool = funding ? Math.max(0, funding.target_amount - funding.raised_amount) : 0;

	const [amountStr, setAmountStr] = useState("");

	useEffect(() => {
		if (!funding) return;
		setAmountStr(formatInputDisplay(suggestedParticipation(funding)));
	}, [funding]);

	const participationParsed = parseAmountInput(amountStr);
	const effectiveAmount = !funding
		? 0
		: amountStr.trim() === ""
			? minU
			: Math.max(minU, participationParsed);

	const platformFee = effectiveAmount * PLATFORM_FEE_RATE;
	const totalCost = effectiveAmount + platformFee + NETWORK_FEE_USDT;
	const estRewardPct = funding && funding.roi_rate > 0 ? funding.roi_rate : DEFAULT_EST_REWARD_PCT;

	const heroUrl = funding?.cover_image_url?.trim();
	const heroIsRemote = Boolean(heroUrl && /^https?:\/\//i.test(heroUrl ?? ""));

	const locationLabel = funding?.organizer_name?.trim() || "Event location TBA";

	if (!idParam) {
		return (
			<PageTransitionMotion className="min-h-dvh bg-white">
				<div className="container py-8">
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="mb-6"
						onClick={() => router.push(NAVIGATE.BOOST)}
					>
						<ArrowLeft className="mr-2 size-4" />
						Back
					</Button>
					<CustomEmpty
						title="Boost not found"
						description="Invalid boost link. Open a project from the Boost list."
					/>
				</div>
			</PageTransitionMotion>
		);
	}

	if (isPending) {
		return (
			<PageTransitionMotion className="min-h-dvh bg-white">
				<div className="min-h-[50vh] animate-pulse bg-[#F3F4F6]" />
			</PageTransitionMotion>
		);
	}

	if (isError || !funding) {
		return (
			<PageTransitionMotion className="min-h-dvh bg-white">
				<div className="container  py-8">
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="mb-6"
						onClick={() => router.push(NAVIGATE.BOOST)}
					>
						<ArrowLeft className="mr-2 size-4" />
						Back
					</Button>
					<CustomEmpty
						title="Boost not found"
						description="This project may have been removed or the link is invalid."
					/>
				</div>
			</PageTransitionMotion>
		);
	}

	const setMax = () => {
		setAmountStr(formatInputDisplay(Math.max(minU, MOCK_AVAILABLE_BALANCE_USDT)));
	};

	const onAmountChange = (v: string) => {
		const cleaned = v.replace(/,/g, "").replace(/[^\d.]/g, "");
		const firstDot = cleaned.indexOf(".");
		const normalized =
			firstDot === -1
				? cleaned
				: `${cleaned.slice(0, firstDot + 1)}${cleaned.slice(firstDot + 1).replace(/\./g, "")}`;
		setAmountStr(limitDecimalInputLength(normalized));
	};

	const onAmountBlur = () => {
		if (!funding) return;
		const parsed = parseAmountInput(amountStr);
		if (amountStr.trim() === "" || parsed <= 0) {
			setAmountStr(formatInputDisplay(minU));
			return;
		}
		const v = Math.max(minU, parsed);
		setAmountStr(formatInputDisplay(v));
	};

	return (
		<PageTransitionMotion className="min-h-dvh bg-white pb-10">
			<HeaderWithBackBtn title="Boost Detail" onBtnBackClick={() => router.back()} />

			<div className="container mx-auto  space-y-6 pt-5">
				<div className="flex gap-4 rounded-[24px]  bg-white p-4 shadow-xs">
					<div className="relative h-[80px] w-[80px] shrink-0">
						<div className="relative h-full w-full overflow-hidden rounded-[12px]">
							<Image
								src={heroIsRemote ? (heroUrl as string) : cardFundingFallback}
								alt=""
								fill
								className="object-cover"
								sizes="80px"
								unoptimized={heroIsRemote}
							/>
						</div>
						<div className="absolute -top-2 -right-2 z-[2]">
							<CustomBadgeStatus
								label={statusBadgeLabel(funding.status)}
								className="h-auto min-h-[22px] gap-0 border-[3px] border-white bg-[#85F6E5] px-[10px] py-1 text-[10px] font-bold uppercase tracking-wide text-[#005048] shadow-[0_3px_10px_rgba(15,23,42,0.18)] [&>span:first-of-type]:hidden"
							/>
						</div>
					</div>
					<div className="min-w-0 flex-1 pt-0.5">
						<p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-[#3B4A46] leading-[15px]">
							Current opportunity
						</p>
						<p className="mt-1 text-[#181C1E] text-[20px] font-bold leading-[25px]">
							{funding.title}
						</p>
						<p className="mt-2 flex items-center gap-1 text-[14px] text-[#3B4A46B2]">
							<MapPin className="size-3.5 shrink-0 text-[#3B4A46B2]" aria-hidden />
							<span className="truncate">{locationLabel}</span>
						</p>
					</div>
				</div>

				<section className="space-y-3 mt-[30px]" aria-labelledby="participation-heading">
					<div className="flex items-center justify-between gap-2">
						<p
							id="participation-heading"
							className="text-[11px] font-bold uppercase tracking-[0.88px] text-[#3B4A46]"
						>
							Participation amount
						</p>
						<p className="text-right text-[14px] text-[#3B4A46] font-semibold">
							Remaining:{" "}
							<strong className="font-bold text-[#181C1E]">
								{formatUsdtInteger(remainingPool)} USDT
							</strong>
						</p>
					</div>

					<div className="mt-4 flex h-[104px] items-center gap-2 rounded-2xl bg-[#F3F4F6] px-4">
						<span className="shrink-0 text-[20px] font-medium text-[#3B4A46]">USDT</span>
						<input
							type="text"
							inputMode="decimal"
							value={amountStr}
							onChange={e => onAmountChange(e.target.value)}
							onBlur={onAmountBlur}
							className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap bg-transparent text-center text-3xl font-bold tabular-nums text-[#0F172A] outline-none placeholder:text-[#CBD5E1] sm:text-3xl"
							aria-label="Participation amount in USDT"
						/>
						<Button
							type="button"
							variant="outline"
							className="h-9 shrink-0 rounded-xl border-0 bg-cus-progress px-4 text-[13px] font-bold text-[#005048] hover:bg-cus-progress/90"
							onClick={setMax}
						>
							MAX
						</Button>
					</div>

					<div className="mt-6 flex flex-wrap items-center justify-between gap-2">
						<p className="text-[12px] text-[#3B4A4699] font-semibold">
							Min. {formatUsdtInteger(minU)} USDT
						</p>
						<div className="inline-flex items-center gap-1.5 rounded-full bg-[#57CABB1A] px-3 py-1 text-[12px] font-semibold text-text-link">
							<Image
								src={upChartIcon}
								alt=""
								width={16}
								height={9}
								aria-hidden
								className="size-3.5"
							/>
							<span>Est. Reward: +{estRewardPct}%</span>
						</div>
					</div>
				</section>

				<section
					className="space-y-3 rounded-[20px] bg-[#F1F4F6] p-6"
					aria-labelledby="summary-heading"
				>
					<p
						id="summary-heading"
						className="text-[11px] font-bold uppercase tracking-[0.88px] text-[#3B4A46]"
					>
						Transaction summary
					</p>

					<dl className="space-y-[14px] my-5">
						<div className="flex min-w-0 justify-between gap-3 text-[13px] sm:text-[14px]">
							<dt className="max-w-[42%] shrink-0 text-[#3B4A46] text-[14px] leading-[20px]">
								Participation Amount
							</dt>
							<dd className="min-w-0 flex-1 whitespace-normal break-all text-right font-semibold tabular-nums text-[#181C1E] text-[16px] leading-[24px]">
								{formatUsdtAmount(effectiveAmount)} USDT
							</dd>
						</div>
						<div className="flex min-w-0 justify-between gap-3 text-[13px] sm:text-[14px]">
							<dt className="max-w-[52%] shrink-0 text-[#3B4A46] text-[14px] leading-[20px]">
								Platform Fee (0.4%)
							</dt>
							<dd className="min-w-0 flex-1 whitespace-normal break-all text-right font-semibold tabular-nums text-[#181C1E] text-[16px] leading-[24px]">
								{formatUsdtAmount(platformFee)} USDT
							</dd>
						</div>
						<div className="flex min-w-0 justify-between gap-3 text-[13px] sm:text-[14px]">
							<dt className="max-w-[42%] shrink-0 text-[#3B4A46] text-[14px] leading-[20px]">
								Network Fee
							</dt>
							<dd className="min-w-0 flex-1 whitespace-normal break-all text-right font-semibold tabular-nums text-[#181C1E] text-[16px] leading-[24px]">
								{formatUsdtAmount(NETWORK_FEE_USDT)} USDT
							</dd>
						</div>
					</dl>

					<div className="flex min-w-0 gap-1 border-t border-[#BACAC51A] pt-3 items-center justify-between">
						<span className="shrink-0 pt-0.5 text-[16px] font-bold text-[#181C1E]">Total Cost</span>
						<span className="min-w-0 text-right text-[20px] font-bold leading-snug break-all whitespace-normal tabular-nums text-text-link ">
							{formatUsdtAmount(totalCost)} USDT
						</span>
					</div>
					<p className="flex items-center gap-2 text-[12px] text-[#64748B] mx-auto w-fit mt-5">
						<Image
							src={walletMutedIcon}
							alt=""
							width={11}
							height={10}
							aria-hidden
							className="size-3.5"
						/>
						<span>
							Available Balance:{" "}
							<strong className="font-semibold text-[#0F172A]">
								{formatUsdtAmount(MOCK_AVAILABLE_BALANCE_USDT)} USDT
							</strong>
						</span>
					</p>
				</section>

				<div className="flex flex-col gap-3 pt-2 mt-[30px]">
					<Button
						type="button"
						className="h-[60px] w-full rounded-[16px] text-[16px] font-bold text-white bg-primary-button"
						onClick={() => {
							// TODO: confirm / sign transaction
						}}
					>
						Confirm Participation
					</Button>
					<Button
						type="button"
						variant="outline"
						className="h-[60px] w-full rounded-[16px] border-[#8B919D] text-[16px] font-semibold text-dark-primary "
						onClick={() => router.push(NAVIGATE.boostDetail.format({ id: funding.id }))}
					>
						Cancel & Return
					</Button>
				</div>

				{/* <p className="flex items-start gap-2 text-[12px] leading-relaxed text-[#64748B]">
                    <Image
                        src={infoIcon}
                        alt=""
                        width={15}
                        height={15}
                        aria-hidden
                        className="mt-0.5 shrink-0"
                    />
                    <span>
                        Rewards are scheduled to be distributed on{" "}
                        <strong className="font-semibold text-[#475569]">
                            {settlementDate || "the settlement date"}
                        </strong>
                        , after ticket sales and settlement are completed.
                    </span>
                </p> */}
			</div>
		</PageTransitionMotion>
	);
}
