import { FullPageSpinner } from "@/components/FullPageSpinner";
import { Layout } from "@/components/Layout";
import { PollResults } from "@/components/PollPage";
import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import { useRouter } from "next/router";

const ResultsPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	if (!id || typeof id !== "string") {
		// TODO render 404 page
		return null;
	}

	const { data, isLoading, error } = trpc.useQuery([
		"votes.results",
		{
			pollId: id,
		},
	]);

	const getPageTitle = () => {
		if (isLoading) return "Loading...";
		if (error || !data || !data.poll) return "404";
		if (data.poll) return `${data.poll.title} — Results`;
	};

	return (
		<Layout title={getPageTitle()}>
			{isLoading && <FullPageSpinner />}
			{error && !isLoading ? "404" : data && <PollResults {...data} />}
		</Layout>
	);
};

export default ResultsPage;