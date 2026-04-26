import { cn } from "@/share/lib/utils";

type CustomBadgeStatusProps = {
	label: string;
	className?: string;
};
export const CustomBadgeStatus = (props: CustomBadgeStatusProps) => {
	const { label, className } = props;
	return (
		<p
			className={cn(
				"flex items-center gap-2 rounded-full bg-[#00D1C1] px-5 py-3 text-[10px] font-bold text-[#0F172A]",
				className,
			)}
		>
			<span className="size-2 rounded-full bg-white" />
			{label}
		</p>
	);
};
