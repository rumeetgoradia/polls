import { FullPageSpinner } from "@/components/FullPageSpinner";
import { Layout } from "@/components/Layout";
import { PollContent } from "@/components/PollPage";
import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import { useRouter } from "next/router";
const PollPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	if (!id || typeof id !== "string") {
		// TODO 404 page
		return <Layout title="404">404</Layout>;
	}

	const { data, isLoading, error } = trpc.useQuery([
		"polls.get-content",
		{ id },
	]);

	const getPageTitle = () => {
		if (isLoading) return "Loading...";
		if (error || !data || !data.poll) return "404";
		if (data.poll) return `${data.poll.title} — Results`;
	};

	return (
		<Layout title={getPageTitle()}>
			<>
				{isLoading && <FullPageSpinner />}
				{error && !isLoading
					? // TODO 404 page
					  "404"
					: data && <PollContent {...data} />}
			</>
		</Layout>
	);
};

export default PollPage;
