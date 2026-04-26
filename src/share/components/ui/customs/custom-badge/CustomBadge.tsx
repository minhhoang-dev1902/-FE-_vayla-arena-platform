import { cn } from "@/share/lib/utils";

interface ICustomBadgeProps {
	label: string;
	className?: string;
}
export function CustomBadge(props: ICustomBadgeProps) {
	const { label, className } = props;
	return (
		<p
			className={cn(
				"text-[10px] bg-accent-secondary px-3 py-1 rounded-2xl text-black w-fit h-fit text-center uppercase font-semibold",
				className,
			)}
		>
			{label}
		</p>
	);
}
