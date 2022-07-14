import { PollHeader } from "@/components/PollPage/PollHeader";
import { useColor } from "@/hooks/useColor";
import { createTransition } from "@/utils/transition";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Option, Prisma } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { PollWithUser } from "types/db";
import { ShareButton } from "../atoms/ShareButton";

type PollResultsProps = {
	options: Option[];
	votes: (Prisma.PickArray<Prisma.VoteGroupByOutputType, "optionId"[]> & {
		_count: number;
	})[];
	numUsersVoted: number;
	poll: PollWithUser;
	isOwner: boolean;
};

type PollData = {
	title: string;
	percent: number;
	voteCount: number;
	index: number;
};

const PollResults: React.FC<PollResultsProps> = ({
	numUsersVoted,
	options,
	poll,
	votes,
	isOwner,
}) => {
	const [data, setData] = useState<PollData[]>([]);

	const COLORS = [
		useColor("brand.900"),
		useColor("brand.700"),
		useColor("brand.500"),
		useColor("brand.300"),
		useColor("brand.100"),
	];

	useEffect(() => {
		if (!options || !votes) {
			setData([]);
			return;
		}

		setData(
			options.map(({ id, title }, index) => {
				const voteCount =
					votes.filter(({ optionId }) => optionId === id)[0]?._count || 0;

				return {
					title,
					percent: voteCount / numUsersVoted,
					voteCount,
					index,
				};
			})
		);
	}, [options, votes, poll, numUsersVoted]);

	const {
		createdAt,
		description,
		editedAt,
		endsAt,
		id: pollId,
		isMultipleSelection,
		resultsVisibility,
		title,
		userId,
		User,
	} = poll;

	return (
		<VStack spacing={8} align="flex-start">
			<PollHeader
				title={title}
				createdAt={createdAt}
				isOwner={isOwner}
				user={User.name!}
				editedAt={editedAt!}
			/>
			{!numUsersVoted ? (
				<h1>No votes yet!</h1>
			) : (
				<>
					<VStack spacing={4} align="flex-start" w="full">
						{data.map(({ title, percent, index, voteCount }) => (
							<Box w="full" key={`${title}-${index}`}>
								<Flex w="full" justify="space-between" align="flex-end" mb={1}>
									<Text>{title}</Text>
									<Text
										ml={2}
										opacity={0.65}
										fontSize="sm"
										textAlign="right"
										flexBasis="120px"
										flexShrink={0}
									>
										{(percent * 100).toFixed(2)}% ({voteCount} vote
										{voteCount !== 1 && "s"})
									</Text>
								</Flex>
								<Box position="relative" w="full" bg="whiteAlpha.100" h={4}>
									<Box
										bg={COLORS[index % COLORS.length]}
										h="full"
										w={`${percent * 100}%`}
										transition={createTransition("width")}
									/>
								</Box>
							</Box>
						))}
					</VStack>
					<Box
						w="full"
						borderTop="1px"
						mt={6}
						pt={4}
						borderTopColor="whiteAlpha.300"
					>
						<Text opacity={0.65} textTransform="uppercase" fontSize="sm">
							Total voters: <strong>{numUsersVoted}</strong>
						</Text>
					</Box>
				</>
			)}
			<HStack spacing={4} w="full">
				<Link href={`/polls/${poll.id}`} passHref>
					<Button
						as="a"
						colorScheme="grayAlpha"
						w="full"
						leftIcon={<MdKeyboardBackspace />}
						title={poll.title}
					>
						Return to poll
					</Button>
				</Link>
				<ShareButton pollId={poll.id} colorScheme="brandAlpha" />
			</HStack>
		</VStack>
	);
};

export default PollResults;
