"use client";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	tabsListVariants,
} from "@/share/components/ui/tabs";

const CustomTabs = {
	Tabs,
	List: TabsList,
	Tab: TabsTrigger,
	Content: TabsContent,
	listVariants: tabsListVariants,
} as const;

export { CustomTabs };
