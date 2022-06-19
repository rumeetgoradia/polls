import { nanoid } from "nanoid";
import { JWT } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

function middleware(req: NextRequest & { nextauth: { token: JWT } }) {
	if (req.cookies["poll-token"] || req.nextauth.token) return;

	const random = nanoid();

	// Redirect (to apply cookie)
	const res = NextResponse.redirect(req.nextUrl);

	res.cookie("poll-token", random, { sameSite: "strict" });

	return res;
}

// @ts-ignore
export default withAuth(middleware, {
	callbacks: {
		authorized({ token }) {
			return true;
		},
	},
});
