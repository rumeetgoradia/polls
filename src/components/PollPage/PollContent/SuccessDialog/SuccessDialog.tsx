import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsPieChart } from "react-icons/bs";
import { ShareButton } from "../../atoms/ShareButton";

type SuccessDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	resultsAreVisible?: boolean;
	pollId: string;
};

const SuccessDialog: React.FC<SuccessDialogProps> = ({
	isOpen,
	onClose,
	resultsAreVisible,
	pollId,
}) => {
	const closeDialogRef = useRef<HTMLButtonElement>(null);

	const toast = useToast();

	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={closeDialogRef}
			onClose={onClose}
			motionPreset="slideInBottom"
			isCentered
		>
			<AlertDialogOverlay>
				<AlertDialogContent bg="gray.900">
					<AlertDialogHeader>
						<Flex align="center">
							<Flex
								justify="center"
								align="center"
								color="white"
								bg="brand.900"
								mr={4}
								fontSize="2xl"
								borderRadius="50%"
								p={1}
							>
								<AiOutlineCheck />
							</Flex>
							<Heading as="h4" fontWeight={500} fontSize="2xl" lineHeight={1}>
								Your vote has been cast!
							</Heading>
						</Flex>
					</AlertDialogHeader>

					<AlertDialogBody>
						Thanks for voting on this poll.{" "}
						{`${
							resultsAreVisible ? "Check out the results or s" : "S"
						}hare this poll with others!`}
					</AlertDialogBody>

					<AlertDialogFooter>
						<Grid w="full" templateColumns="repeat(2, 1fr)" gap={4}>
							{resultsAreVisible && (
								<GridItem colSpan={1}>
									<Link href={`/polls/${pollId}/results`} passHref>
										<Button
											as="a"
											w="full"
											colorScheme="brandAlpha"
											leftIcon={<BsPieChart />}
											title="Results"
											onClick={onClose}
										>
											Results
										</Button>
									</Link>
								</GridItem>
							)}
							<GridItem colSpan={resultsAreVisible ? 1 : 2}>
								<ShareButton
									pollId={pollId}
									colorScheme={resultsAreVisible ? "grayAlpha" : "brandAlpha"}
								/>
							</GridItem>
						</Grid>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default SuccessDialog;
