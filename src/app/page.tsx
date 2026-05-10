import { redirect } from "next/navigation";

import { NAVIGATE } from "@/share/contants/navigate";

/**
 * Landing route: send users to the main home experience (shell + tabs).
 */
export default function RootPage() {
	redirect(NAVIGATE.HOME);
}
