import { Layout } from "@/components/Layout";
import { PollPreview } from "@/components/Poll/PollPreview";
import { trpc } from "@/utils/trpc";
import {
	Box,
	Flex,
	Heading,
	Link as ChakraLink,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Poll } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import Masonry from "react-masonry-css";

const AccountPollsPage: NextPage = () => {
	const { data, isLoading, error } = trpc.useQuery(["polls.get-all-owned"]);

	return (
		<Layout title="Your Polls">
			<VStack w="full" align="flex-start" spacing={8}>
				<Heading as="h3" fontWeight={600} lineHeight={1}>
					Your Polls
				</Heading>
				<AccountPollsList isLoading={isLoading} polls={data} />
			</VStack>
		</Layout>
	);
};

const AccountPollsList: React.FC<{
	isLoading: boolean;
	polls?: Poll[];
}> = ({ isLoading, polls }) => {
	if (isLoading) {
		return (
			<Flex justify="center" align="center" w="full">
				<Spinner size="lg" />
			</Flex>
		);
	}

	if (!polls || !polls.length) {
		return (
			<Text fontSize="xl" opacity={0.65}>
				You don&apos;t have any polls! Why not{" "}
				<Link href="/create" passHref>
					<ChakraLink color="brand.900">create one</ChakraLink>
				</Link>
				?
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
						<PollPreview poll={poll} showUser={false} />
					</Box>
				))}
			</Masonry>
		</Box>
	);
};

export default AccountPollsPage;
