import { Card, CardContent, CardHeader } from "@/share/components/ui/card";
import { Skeleton } from "@/share/components/ui/skeleton";

export function CustomSkeletonCard() {
	return (
		<Card className="w-full">
			<CardHeader>
				<Skeleton className="h-4 w-2/3" />
				<Skeleton className="h-4 w-1/2" />
			</CardHeader>
			<CardContent>
				<Skeleton className="aspect-video w-full" />
			</CardContent>
		</Card>
	);
}
