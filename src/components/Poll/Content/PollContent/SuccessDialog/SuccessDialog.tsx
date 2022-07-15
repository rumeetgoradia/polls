import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
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

	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={closeDialogRef}
			onClose={onClose}
			motionPreset="slideInBottom"
			isCentered
		>
			<AlertDialogOverlay>
				<AlertDialogContent bg="gray.900" m={4} position="relative">
					<AlertDialogHeader>
						<Flex align="center">
							<Flex
								justify="center"
								align="center"
								color="white"
								bg="brand.900"
								mr={{ base: 2, sm: 4 }}
								fontSize={{ base: "lg", sm: "2xl" }}
								borderRadius="50%"
								p={1}
							>
								<AiOutlineCheck />
							</Flex>
							<Heading
								as="h4"
								fontWeight={500}
								fontSize={{ base: "xl", sm: "2xl" }}
								lineHeight={1}
							>
								Your vote has been cast!
							</Heading>
						</Flex>
						<AlertDialogCloseButton
							ref={closeDialogRef}
							display={{ base: "none", sm: "block" }}
						/>
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
									onClick={onClose}
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
