import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
type AnonymousSessionProviderProps = {
	children: React.ReactNode;
};

const AnonymousSessionProvider: React.FC<AnonymousSessionProviderProps> = ({
	children,
}) => {
	const { status, data } = useSession();

	useEffect(() => {
		if (status === "unauthenticated") {
			signIn("anon", { redirect: false });
		}
	}, [status]);

	return <>{children}</>;
};

export default AnonymousSessionProvider;
