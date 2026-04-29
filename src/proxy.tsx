// middleware.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { NAVIGATE } from "./share/contants/navigate";

const AUTH_ONLY_ROUTES: string[] = [];
const AUTH_AND_WALLET_ROUTES: string[] = [NAVIGATE.SUBMIT_TRACK];

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const privyToken = request.cookies.get("privy-token");

	const needsAuth =
		AUTH_ONLY_ROUTES.some(r => pathname.startsWith(r)) ||
		AUTH_AND_WALLET_ROUTES.some(r => pathname.startsWith(r));

	if (needsAuth && !privyToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}
