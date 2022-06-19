import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const HomePage: NextPage = () => {
	const { status, data } = useSession();

	const [user, setUser] = useState<string>();

	useEffect(() => {
		if (status === "unauthenticated") {
			signIn("anon", { redirect: false }).then((response) => {
				if (response?.ok) {
					setUser("guest");
					// anonymous login complete
					//  - status will be 'authenticated'
					//  - data.isLoggedIn will be true
				} else {
					// anonymous login failed, check response.error and display an error
				}
			});
		}
	}, [status]);

	return <>{data?.user?.name}</>;
};

export default HomePage;
