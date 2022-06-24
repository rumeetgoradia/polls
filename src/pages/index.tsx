import { Layout } from "@/components/Layout";
import { trpc } from "@/utils/trpc";
import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";

const HomePage: NextPage = () => {
	const { data: ownedPolls, isLoading: ownedPollsAreLoading } = trpc.useQuery([
		"polls.get-all-owned",
	]);
	const { data: publicPolls, isLoading: publicPollsAreLoading } = trpc.useQuery(
		["polls.get-all-public"]
	);

	return (
		<Layout>
			<Heading as="h1">Your Polls</Heading>
			{ownedPolls?.map((poll) => (
				<Link href={`/polls/${poll.id}`} key={`owned-${poll.id}`}>
					{poll.title}
				</Link>
			))}
			<Heading as="h1">Public Polls</Heading>
			{publicPolls?.map((poll) => (
				<Link href={`/polls/${poll.id}`} key={`public-${poll.id}`}>
					{poll.title}
				</Link>
			))}
		</Layout>
	);
};

export default HomePage;
