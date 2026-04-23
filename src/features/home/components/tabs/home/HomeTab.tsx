import { ChevronRight } from "lucide-react";
import Image from "next/image";
import tokenMark from "@/assets/icons/vayla-token-section-icon.svg";

export function HomeTab() {
	return (
		<div className="mt-6 flex flex-col gap-[1rem] pb-8">
			<section
				className="relative overflow-hidden rounded-[1.75rem] p-6 text-white"
				style={{
					background: "linear-gradient(180deg, #102222 0%, #1A2E2E 100%)",
					boxShadow: "0px 8px 32px 0px rgba(0,0,0,0.04)",
				}}
			>
				<p className="font-sans text-2xl font-bold tracking-tight text-white">
					VAYLA - Start for WEB 4.0
				</p>
				<p className="mt-3 text-[0.9375rem] font-normal leading-relaxed text-foreground">
					VAYLA Arena is a platform aimed at WEB 4.0, the future created by AI that will replace
					human economic activities, starting with the Web3 global fandom platform where global
					music fandom participates in Boost, voting, and creation and is rewarded for its
					contributions.
				</p>
			</section>

			<section className="rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
				<h2 className="font-sans text-lg font-bold tracking-tight text-[#10B981]">
					What is VAYLA Arena?
				</h2>
				<p className="mt-3 text-[0.9375rem] font-normal leading-relaxed text-muted-foreground">
					VAYLA Arena is a Web3-powered platform where fans participate directly in music, events,
					and creative projects through Boost, voting, and rewards.
				</p>
			</section>

			<section className="rounded-[1.75rem] bg-[#F0FDFA] p-6 shadow-sm border border-light-green">
				<div className="flex items-start justify-between gap-4">
					<div className="min-w-0">
						<p className="font-sans text-2xl font-bold tracking-tight text-[#0D9488]">
							VAYLA Token
						</p>
						<p className="mt-1 text-xs font-medium tracking-[0.2em] text-[#0D9488]/60">
							ECOSYSTEM UTILITY
						</p>
					</div>
					<div className="flex items-center justify-center rounded-full bg-primary/15 px-2 py-3">
						<Image width={27} height={27} src={tokenMark} alt="token mark" />
					</div>
				</div>
				<p className="mt-4 text-[0.9375rem] font-normal leading-relaxed text-[#475569]">
					VAYLA Token powers the entire ecosystem. It is used for voting, rewards, and unlocking
					premium benefits.
				</p>
				<div className="mt-5 border-t border-primary/15 pt-4">
					<button
						type="button"
						className="flex w-full items-center justify-between gap-2 text-left font-sans text-sm font-bold tracking-[0.1rem] text-[#0D9488] transition-opacity hover:opacity-80"
					>
						<span>MORE DETAILS</span>
						<ChevronRight className="size-6 shrink-0 text-primary" strokeWidth={2.25} />
					</button>
				</div>
			</section>
		</div>
	);
}
