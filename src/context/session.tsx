import { trpc } from "@/utils/trpc";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export type SessionContextValues = {
	signIn: (guestId?: string) => void;
	signOut: () => void;
	session: Session | null;
	status: "authenticated" | "loading" | "unauthenticated";
};

const defaultSessionContextValues: SessionContextValues = {
	signIn: () => {},
	signOut: () => {},
	session: null,
	status: "unauthenticated",
};

export const SessionContext = createContext<SessionContextValues>(
	defaultSessionContextValues
);

export const SessionContextProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const LOCAL_STORAGE_KEY = "RGPOLLS_GUEST_ID";

	const { status, data: session } = useSession();

	const [guestId, setGuestId] = useState<string>();

	const { mutate } = trpc.useMutation("users.merge-guest-account");

	// On initial load, get the guest ID from local storage.
	useEffect(() => {
		setGuestId(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)!));
	}, []);

	// If the user is not logged in and there is no guest ID saved, create an anonymous session.
	useEffect(() => {
		if (status === "unauthenticated" && !guestId) {
			signIn("anon", { redirect: false });
		}
	}, [status, guestId]);

	// Merge the anonymous account and actual account upon logging in.
	useEffect(() => {
		if (status === "authenticated" && session && !session.isGuest && guestId) {
			mutate(
				{ guestId },
				{
					onSuccess: () => {
						window.localStorage.removeItem(LOCAL_STORAGE_KEY);
					},
				}
			);
		}
	}, [status, session, guestId, mutate]);

	// Save the guest ID to local storage, because signIn causes page refresh (redirect) and we lose guest ID.
	const setGuestIdAndSignIn = async (guestId?: string) => {
		window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guestId));
		setGuestId(guestId);
		await signOut();
		await signIn("github");
	};

	return (
		<SessionContext.Provider
			value={{
				signIn: setGuestIdAndSignIn,
				signOut,
				session,
				status,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
};
