"use client";

import { format, isValid, parseISO } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useMemo } from "react";
import behindTheScenesCornerIcon from "@/assets/icons/behide-the-sceen-corner.svg";
import checkedFillIcon from "@/assets/icons/checked-fill.svg";
import infoIcon from "@/assets/icons/info-2-icon.svg";
import play3Icon from "@/assets/icons/play-3-icon.svg";
import ticketPurchaseBenefitIcon from "@/assets/icons/purchase-benifit-corner.svg";
import starIcon from "@/assets/icons/star-2-icon.svg";
import token2Icon from "@/assets/icons/token-2-icon.svg";
import walletFillIcon from "@/assets/icons/wallet-fill-icon.svg";
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
import { cn } from "@/share/lib/utils";
import { BOOST_BRAND_TEAL } from "../constants";

function formatUsdAmount(amount: number): string {
	const hasFraction = !Number.isInteger(amount);
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: hasFraction ? 2 : 0,
		maximumFractionDigits: hasFraction ? 6 : 0,
	}).format(amount);
}

function formatFundingPeriod(startIso: string, endIso: string): string {
	const s = parseISO(startIso);
	const e = parseISO(endIso);
	if (!isValid(s) || !isValid(e)) return "—";
	return `${format(s, "MMM d")} – ${format(e, "MMM d, yyyy")}`;
}

function formatSettlementLine(iso: string): string {
	const d = parseISO(iso);
	if (!isValid(d)) return "";
	return format(d, "MMMM d, yyyy");
}

function statusDisplayLabel(status: string): string {
	if (status === EFundingBoostStatus.IN_PROGRESS || status === "active") return "Active";
	if (status === EFundingBoostStatus.UPCOMING) return "Upcoming";
	if (!status) return "Active";
	return status.replace(/_/g, " ");
}

function subtitleFromFunding(funding: FundingProjectClass): string {
	if (funding.category?.trim()) {
		const label = funding.category.replace(/_/g, " ");
		return `Global ${label} CrowdBoost`;
	}
	return "Global entertainment CrowdBoost";
}

function RewardRow({
	icon,
	title,
	subtitle,
	backgroundIcon,
}: {
	icon: ReactNode;
	title: string;
	subtitle: string;
	backgroundIcon?: string;
}) {
	return (
		<div className="flex items-center gap-4 rounded-[16px] border border-[#F1F5F9] bg-white p-4">
			<div
				className={cn(
					"flex size-10 shrink-0 items-center justify-center rounded-[12px]",
					backgroundIcon,
				)}
			>
				{icon}
			</div>
			<div className="min-w-0 flex-1">
				<p className="text-[16px] font-bold leading-[24px] text-[#0F172A]">{title}</p>
				<p className="mt-0.5 text-[12px] leading-[16px] text-[#64748B]">{subtitle}</p>
			</div>
			<Image src={checkedFillIcon} alt="" width={20} height={20} className="size-5" aria-hidden />
		</div>
	);
}

export default function BoostDetailPage() {
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
	const settlementDate = funding ? formatSettlementLine(settlementIso) : "";

	if (!idParam) {
		return (
			<PageTransitionMotion>
				<div className="container px-4 py-8">
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
			<PageTransitionMotion>
				<div className="min-h-[50vh] animate-pulse bg-[#F1F5F9]" />
			</PageTransitionMotion>
		);
	}

	if (isError || !funding) {
		return (
			<PageTransitionMotion>
				<div className="container px-4 py-8">
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

	const heroUrl = funding.cover_image_url?.trim();
	const heroIsRemote = Boolean(heroUrl && /^https?:\/\//i.test(heroUrl));

	const period = formatFundingPeriod(funding.start_date, funding.end_date);
	const minContribution =
		funding.min_contribution != null
			? formatUsdAmount(funding.min_contribution)
			: formatUsdAmount(100);
	const maxContribution =
		funding.max_contribution_per_person != null
			? formatUsdAmount(funding.max_contribution_per_person)
			: formatUsdAmount(funding.target_amount);
	const totalGoal = formatUsdAmount(funding.target_amount);
	const usdtRewardPct = funding.roi_rate > 0 ? funding.roi_rate : 5;
	const nftLabel = `${funding.title.slice(0, 28)}${funding.title.length > 28 ? "…" : ""} NFT`;

	return (
		<PageTransitionMotion className="bg-white ">
			<HeaderWithBackBtn title="Boost Detail" onBtnBackClick={() => router.back()} />
			<div className="container  space-y-6  pt-5">
				<div className="relative mx-auto h-[256px] min-w-[342px] max-w-full overflow-hidden rounded-[24px] ">
					<Image
						src={heroIsRemote ? (heroUrl as string) : cardFundingFallback}
						alt=""
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, 520px"
						priority
						unoptimized={heroIsRemote}
					/>
					<div className="pointer-events-none absolute inset-0 z-[1] bg-black/35" aria-hidden />
					<div className="absolute top-4 right-3 z-[2]">
						<CustomBadgeStatus
							label={funding.status}
							className="h-[23px] gap-2 px-[10px] py-0 text-[10px] font-bold uppercase text-white bg-[#10B981]"
						/>
					</div>
				</div>

				<div>
					<p className="text-balance text-[30px] font-bold leading-[37px] tracking-tight text-[#0F172A] mt-5">
						{funding.title}
					</p>
					<p className="mt-2 text-[16px] leading-[24px] text-[#64748B]">
						{subtitleFromFunding(funding)}
					</p>
				</div>

				{/* Boost Summary */}
				<section aria-labelledby="boost-summary-heading" className="mt-[30px] py-[9px]">
					<p
						id="boost-summary-heading"
						className="text-[20px] font-bold text-[#0F172A] leading-[28px]"
					>
						Boost Summary
					</p>
					<div className="mt-4 rounded-[16px] border border-[#F1F5F9] bg-white p-5 shadow-sm">
						<div className="flex items-center justify-between border-b border-[#F8FAFC] pb-4">
							<span className="text-[14px]  text-[#64748B] leading-[20px]">Total Goal</span>
							<span className="text-[18px] font-bold leading-[28px] text-text-link">
								{totalGoal}
							</span>
						</div>
						<dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5">
							<div>
								<dt className="text-[11px] text-[#94A3B8] tracking-[0.55px] uppercase">Period</dt>
								<dd className="mt-1 text-[14px] text-[#0F172A] leading-[20px]">{period}</dd>
							</div>
							<div>
								<dt className="text-[11px] text-[#94A3B8] tracking-[0.55px] uppercase">Status</dt>
								<dd className="mt-1 flex items-center gap-1.5 text-[14px] text-[#0F172A] leading-[20px]">
									<span
										className="size-1.5 rounded-full"
										style={{ backgroundColor: BOOST_BRAND_TEAL }}
										aria-hidden
									/>
									{statusDisplayLabel(funding.status)}
								</dd>
							</div>
							<div>
								<dt className="text-[11px] text-[#94A3B8] tracking-[0.55px] uppercase">Minimum</dt>
								<dd className="mt-1 text-[14px] text-[#0F172A] leading-[20px] font-semibold">
									{minContribution}
								</dd>
							</div>
							<div>
								<dt className="text-[11px] text-[#94A3B8] tracking-[0.55px] uppercase">Maximum</dt>
								<dd className="mt-1 text-[14px] text-[#0F172A] leading-[20px] font-semibold">
									{maxContribution}
								</dd>
							</div>
						</dl>
					</div>
				</section>

				{/* Rewards */}
				<section className="space-y-3 mt-[30px] py-[9px]" aria-labelledby="rewards-heading">
					<p
						id="rewards-heading"
						className="text-[20px] font-bold text-[#0F172A] leading-[28px] mb-4"
					>
						Rewards
					</p>
					<RewardRow
						icon={
							<Image
								src={walletFillIcon}
								alt=""
								width={18}
								height={18}
								className="size-6"
								aria-hidden
							/>
						}
						title={`${usdtRewardPct}% USDT Reward`}
						subtitle="Distributed after settlement"
						backgroundIcon="bg-[#10B9811A]"
					/>
					<RewardRow
						icon={
							<Image
								src={token2Icon}
								alt=""
								width={22}
								height={17}
								className="size-7 shrink-0 object-contain"
							/>
						}
						title="2.5% VAYLA Token Reward"
						subtitle="Platform utility token bonus"
						backgroundIcon="bg-[#06B6D41A]"
					/>
					<RewardRow
						icon={
							<Image
								src={token2Icon}
								alt=""
								width={22}
								height={17}
								className="size-7 shrink-0 object-contain"
							/>
						}
						title={nftLabel}
						subtitle="Limited edition collectible"
						backgroundIcon="bg-[#FEF3C7]"
					/>
				</section>

				{/* Exclusive benefits */}
				<section className="mt-5 py-[9px]" aria-labelledby="benefits-heading">
					<p id="benefits-heading" className="text-[18px] font-bold text-[#0F172A] leading-[28px]">
						Exclusive Participant Benefits
					</p>
					<div className="grid grid-cols-2 gap-3 mt-[16px]">
						<div className="relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-[20px] bg-[#181C1E] p-4 text-white">
							<p className="text-[32px] font-bold leading-none">50%</p>
							<p className="mt-2 text-[12px] leading-snug text-white pr-8">
								Ticket Purchase Benefit
							</p>
							<Image
								src={ticketPurchaseBenefitIcon}
								alt=""
								width={49}
								height={40}
								className="pointer-events-none absolute -bottom-1 -right-2 z-0 select-none opacity-95"
								aria-hidden
							/>
						</div>
						<div className="relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-[20px] p-4 text-white bg-[#10B981]">
							<Image
								src={behindTheScenesCornerIcon}
								alt=""
								width={45}
								height={30}
								className="pointer-events-none absolute -bottom-1 -right-2 z-0 select-none opacity-95"
								aria-hidden
							/>
							<div className="relative z-[1] flex flex-1 flex-col justify-between gap-5">
								<Image
									src={play3Icon}
									alt=""
									width={24}
									height={24}
									className="size-6"
									aria-hidden
								/>
								<p className="text-[13px] font-semibold leading-snug pr-8">
									Behind-the-scenes Videos
								</p>
							</div>
						</div>
					</div>
					<div
						className="flex items-start gap-4 rounded-[20px] px-4 py-4 text-white mt-3"
						style={{
							backgroundImage: "linear-gradient(to right, #06B6D4, #10B981)",
						}}
					>
						<div className="flex size-[48px] shrink-0 items-center justify-center rounded-[16px] bg-white/20">
							<Image
								src={starIcon}
								alt=""
								width={20}
								height={20}
								aria-hidden
								className="text-white"
							/>
						</div>
						<div>
							<p className="text-[16px] font-bold">Lucky Draw</p>
							<p className="mt-1 text-[12px] leading-snug text-white/90">
								DJ-signed merchandise lottery entry
							</p>
						</div>
					</div>
				</section>

				{/* Disclaimer */}
				<p className="flex items-start gap-2 text-[12px] leading-relaxed text-[#64748B] mt-1">
					<Image src={infoIcon} alt="" width={15} height={15} aria-hidden className="mt-0.5" />
					<span>
						Rewards are scheduled to be distributed on{" "}
						<strong className="font-semibold text-[#475569]">
							{settlementDate || "the settlement date"}
						</strong>
						, after ticket sales and settlement are completed.
					</span>
				</p>

				<div className="flex justify-center pb-8">
					<Button
						type="button"
						className="h-[56px] w-full max-w-[342px] rounded-2xl text-[16px] font-bold text-white bg-primary-button mx-auto"
						onClick={() => router.push(NAVIGATE.boostParticipate(funding.id))}
					>
						Participate in Boost
					</Button>
				</div>
			</div>
		</PageTransitionMotion>
	);
}
