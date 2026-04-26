import { cn } from "@/share/lib/utils";
import { CustomSkeletonCard } from "./CustomSkeletonCard";

type CustomSkeletonSwapperVariant = "card";

type CustomSkeletonSwapperProps = {
	count: number;
	variant: CustomSkeletonSwapperVariant;
	className?: string;
};

export function CustomSkeletonSwapper({ count, variant, className }: CustomSkeletonSwapperProps) {
	const safeCount = Math.max(0, count);
	const skeletonKeys = Array.from({ length: safeCount }, (_, i) => `${variant}-skeleton-${i + 1}`);

	return (
		<div className={cn("flex flex-col gap-4", className)}>
			{skeletonKeys.map(key => {
				if (variant === "card") {
					return <CustomSkeletonCard key={key} />;
				}

				return null;
			})}
		</div>
	);
}
