import { ErrorBox } from "@/components/ErrorBox";
import { arrayEquals } from "@/utils/equality";
import { createTransition } from "@/utils/transition";
import { trpc } from "@/utils/trpc";
import {
	Box,
	Button,
	Checkbox,
	Flex,
	Grid,
	GridItem,
	Radio,
	Text,
	Tooltip,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPieChart } from "react-icons/bs";
import { PollWithUserAndOptions } from "types/db";
import { Header } from "../atoms/Header";
import { ShareButton } from "../atoms/ShareButton";
import { EndsAtBox } from "./EndsAtBox";
import { SuccessDialog } from "./SuccessDialog";

type PollContentProps = {
	poll: PollWithUserAndOptions;
	isOwner: boolean;
	votesByCurrentUser: { optionId: string }[];
	resultsAreVisible: boolean;
};

const PollContent: React.FC<PollContentProps> = ({
	poll: initialPoll,
	isOwner,
	votesByCurrentUser: initialVotesByCurrentUser,
	resultsAreVisible: initialResultsAreVisible,
}) => {
	const [poll, setPoll] = useState<PollWithUserAndOptions>(initialPoll);
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [votesByCurrentUser, setVotesByCurrentUser] = useState<string[]>();
	const [resultsAreVisible, setResultsAreVisible] = useState<
		boolean | undefined
	>(initialResultsAreVisible);
	const [error, setError] = useState<string>();
	const [isSubmitting, setSubmitting] = useState<boolean>(false);

	const { mutate } = trpc.useMutation("votes.cast-vote");

	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		setSelectedOptions(
			initialVotesByCurrentUser?.map((vote) => vote.optionId) || []
		);
		setVotesByCurrentUser(
			initialVotesByCurrentUser?.map((vote) => vote.optionId) || []
		);
	}, [initialVotesByCurrentUser]);

	useEffect(() => {
		setResultsAreVisible(initialResultsAreVisible);
	}, [initialResultsAreVisible]);

	useEffect(() => {
		setPoll(initialPoll);
	}, [initialPoll]);

	const {
		createdAt,
		description,
		editedAt,
		endsAt,
		id: pollId,
		isMultipleSelection,
		resultsVisibility,
		title,
		User,
		options,
	} = poll;

	const hasPollEnded = () => {
		return endsAt && new Date().getTime() > endsAt.getTime();
	};

	const selectedOptionsAreUnchanged = () => {
		return (
			!!votesByCurrentUser &&
			!!votesByCurrentUser.length &&
			arrayEquals(votesByCurrentUser, selectedOptions)
		);
	};

	const updateSelectedOptions = (optionId: string) => {
		setSelectedOptions((prev) => {
			if (!isMultipleSelection) {
				return [optionId];
			}

			const newOptions = [...prev];

			if (prev.includes(optionId)) {
				newOptions.splice(newOptions.indexOf(optionId), 1);
			} else {
				newOptions.push(optionId);
			}

			return newOptions;
		});
	};

	const castVote = async () => {
		if (!selectedOptions.length) {
			setError(
				`Please select ${isMultipleSelection ? "at least one" : "an"} option.`
			);
			return;
		}

		if (selectedOptions.length > 1 && !isMultipleSelection) {
			setError("Please select only one option.");
			return;
		}

		if (hasPollEnded()) {
			setError(
				"Your vote can't be cast for this poll, as the voting period has closed."
			);
			return;
		}

		setSubmitting(true);

		mutate(
			{ selectedOptions, pollId },
			{
				onSettled: () => {
					setSubmitting(false);
				},
				onSuccess: (res) => {
					setError(undefined);
					setVotesByCurrentUser([...selectedOptions]);
					setResultsAreVisible(res);
					onOpen();
				},
				onError: ({ message }) => {
					setError(message);
				},
			}
		);
	};

	return (
		<>
			<VStack spacing={8} align="flex-start">
				<Header
					id={pollId}
					title={title}
					createdAt={createdAt}
					isOwner={isOwner}
					user={User.name!}
					editedAt={editedAt!}
				/>
				<Text>{description}</Text>
				<VStack spacing={2} align="flex-start" w="full">
					{options.map(({ title: optionTitle, id: optionId }) => {
						const isSelected = selectedOptions.includes(optionId);

						return (
							<Flex
								onClick={() => updateSelectedOptions(optionId)}
								p={4}
								bg={isSelected ? "whiteAlpha.300" : "whiteAlpha.50"}
								w="full"
								cursor="pointer"
								sx={{
									"& *": {
										opacity: isSelected ? 1 : 0.65,
										transition: createTransition("opacity"),
									},
								}}
								key={optionId}
							>
								{isMultipleSelection ? (
									<Checkbox colorScheme="brandAlpha" isChecked={isSelected} />
								) : (
									<Radio colorScheme="brandAlpha" isChecked={isSelected} />
								)}
								<Box ml={4}>{optionTitle}</Box>
							</Flex>
						);
					})}
				</VStack>
				{endsAt && <EndsAtBox endsAt={endsAt} />}
				{error && <ErrorBox error={error} />}
				<Grid templateColumns="repeat(4, 1fr)" w="full" gap={4}>
					<GridItem colSpan={resultsAreVisible ? 2 : 3}>
						<Tooltip
							shouldWrapChildren
							isDisabled={!(hasPollEnded() || selectedOptionsAreUnchanged())}
							label={
								hasPollEnded()
									? "This poll's voting period has ended."
									: `Your selected choice${
											selectedOptions.length > 1 ? "s are" : " is"
									  } unchanged.`
							}
							mt={3}
						>
							<Button
								onClick={castVote}
								isLoading={isSubmitting}
								disabled={hasPollEnded() || selectedOptionsAreUnchanged()}
								w="full"
							>
								Vote
							</Button>
						</Tooltip>
					</GridItem>
					{resultsAreVisible && (
						<GridItem colSpan={1}>
							<Link href={`/polls/${pollId}/results`} passHref>
								<Button
									as="a"
									w="full"
									colorScheme="grayAlpha"
									leftIcon={<BsPieChart />}
									title="Results"
								>
									Results
								</Button>
							</Link>
						</GridItem>
					)}
					<GridItem colSpan={1}>
						<ShareButton pollId={pollId} colorScheme="grayAlpha" />
					</GridItem>
					{!resultsAreVisible && (
						<GridItem colSpan={4} mt={-2}>
							<Text fontSize="sm" opacity={0.65}>
								{resultsVisibility === "VOTER"
									? "Results for this poll are only visible after casting a vote."
									: "Results for this poll are only visible to the poll's owner."}
							</Text>
						</GridItem>
					)}
				</Grid>
			</VStack>
			<SuccessDialog
				isOpen={isOpen}
				onClose={onClose}
				resultsAreVisible={resultsAreVisible}
				pollId={pollId}
			/>
		</>
	);
};

export default PollContent;
