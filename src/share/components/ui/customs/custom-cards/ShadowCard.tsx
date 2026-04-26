import { cn } from "@/share/lib/utils";

interface IShadowCardProps {
	children: React.ReactNode;
	className?: string;
}

export function ShadowCard(props: IShadowCardProps) {
	const { children, className } = props;

	return (
		<div
			className={cn(
				"rounded-[1rem] border border-white/30 bg-white px-6 py-6 shadow-[0_14px_30px_rgba(8,24,32,0.12),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md",
				className,
			)}
		>
			{children}
		</div>
	);
}
