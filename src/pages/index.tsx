import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const HomePage: NextPage = () => {
	const { status, data } = useSession();

	useEffect(() => {
		if (status === "unauthenticated") {
			signIn("anon", { redirect: false });
		}
	}, [status]);

	return <>{data?.user?.name}</>;
};

export default HomePage;
