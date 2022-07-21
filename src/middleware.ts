import { withAuth } from "next-auth/middleware";

export default withAuth({
	callbacks: {
		authorized: ({ token, req }) => {
			const { pathname } = req.nextUrl;

			if (pathname.startsWith("/account")) {
				return !!token && token.name !== "guest";
			}

			return true;
		},
	},
	pages: {
		signIn: "/",
	},
});
