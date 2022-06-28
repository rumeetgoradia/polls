import { Layout } from "@/components/Layout";
import { PollPreview } from "@/components/PollPreview";
import { trpc } from "@/utils/trpc";
import {
	Box,
	Button,
	Flex,
	Heading,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { BiPoll } from "react-icons/bi";
import Masonry from "react-masonry-css";
import { PollWithUser } from "types/db";

const HomePage: NextPage = () => {
	const { data, isLoading } = trpc.useQuery(["polls.get-all-public"]);

	return (
		<Layout>
			<VStack align="flex-start" spacing={10}>
				<Box w="full" bg="brandAlpha.300" position="relative" overflow="hidden">
					<VStack
						w="full"
						maxW="500px"
						px={12}
						py={14}
						align="flex-start"
						spacing={6}
						position="relative"
						zIndex={8}
					>
						<Heading
							as="h1"
							fontWeight={300}
							fontSize={{ base: "3xl", sm: "5xl" }}
							lineHeight={1.15}
						>
							Create your poll <br />
							<strong>in seconds</strong>.
						</Heading>
						<Heading as="h2" fontWeight={400} fontSize="xl" lineHeight={1.35}>
							Want to ask your friends where to go friday night or arrange a
							meeting with co-workers? Create a poll &mdash; and get answers in
							no time.
						</Heading>
						<Link href="/create" passHref>
							<Button
								size="lg"
								variant="invertedSolid"
								as="a"
								title="Create a poll"
							>
								Create a poll
							</Button>
						</Link>
					</VStack>
					<Box
						display={{ base: "none", sm: "block" }}
						position="absolute"
						zIndex={7}
						bottom="-67px"
						right="-63px"
						opacity={0.1}
						color="white"
						fontSize="400"
						mr={12}
						transform="rotate(180deg)"
					>
						<BiPoll />
					</Box>
				</Box>
				<VStack w="full" align="flex-start" spacing={4}>
					<Heading as="h3" fontWeight={600} lineHeight={1}>
						Public Polls
					</Heading>
					<PublicPollsList isLoading={isLoading} polls={data} />
				</VStack>
			</VStack>
		</Layout>
	);
};

const PublicPollsList: React.FC<{
	isLoading: boolean;
	polls?: PollWithUser[];
}> = ({ isLoading, polls }) => {
	if (isLoading) {
		return (
			<Flex justify="center" align="center" w="full">
				<Spinner size="lg" />
			</Flex>
		);
	}

	if (!polls) {
		return (
			<Text fontSize="xl" opacity={0.65}>
				No public polls! You should create the first one ;)
			</Text>
		);
	}

	return (
		<Box
			w="full"
			sx={{
				"& .public-polls-grid": {
					display: "flex",
					ml: -4,
					mb: -4,
					width: "auto",
					"&_column": {
						pl: 4,
						bgClip: "padding-box",
					},
				},
			}}
		>
			<Masonry
				breakpointCols={{
					default: 2,
					640: 1,
				}}
				className="public-polls-grid"
				columnClassName="public-polls-grid_column"
			>
				{polls.map((poll) => (
					<Box w="full" mb={4} key={poll.id}>
						<PollPreview poll={poll} />
					</Box>
				))}
			</Masonry>
		</Box>
	);
};

export default HomePage;
