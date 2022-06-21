import { trpc } from "@/utils/trpc";
import { Container, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";

const HomePage: NextPage = () => {
	const { data: ownedQuestions, isLoading: ownedQuestionsAreLoading } =
		trpc.useQuery(["questions.get-all-owned"]);
	const { data: publicQuestions, isLoading: publicQuestionsAreLoading } =
		trpc.useQuery(["questions.get-all-public"]);

	return (
		<Container maxW="container.md">
			<Heading as="h1">Your Questions</Heading>
			{ownedQuestions?.map((q) => (
				<Link href={`/questions/${q.id}`} key={`owned-${q.id}`}>
					{q.question}
				</Link>
			))}
			<Heading as="h1">Public Questions</Heading>
			{publicQuestions?.map((q) => (
				<Link href={`/questions/${q.id}`} key={`public-${q.id}`}>
					{q.question}
				</Link>
			))}
		</Container>
	);
};

export default HomePage;
