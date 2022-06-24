import { Layout } from "@/components/Layout";
import { SessionContext } from "@/context/session";
import { trpc } from "@/utils/trpc";
import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
const PollPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const { session } = useContext(SessionContext);

	if (!id || typeof id !== "string") {
		// TODO render 404 page
		return null;
	}

	const { data } = trpc.useQuery(["polls.get-by-id", { id }]);

	return (
		<Layout title={data?.title}>
			<Heading as="h1">{data?.title}</Heading>
			{data?.userId}
		</Layout>
	);
};

export default PollPage;
