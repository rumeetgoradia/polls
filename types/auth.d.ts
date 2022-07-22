import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	interface User {
		id: string;
		isGuest?: boolean;
	}
	interface Session {
		user?: User;
		expires: string;
		isGuest?: boolean;
	}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		isGuest?: boolean;
	}
}
