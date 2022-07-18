import { getApproximateTimeBetween } from "@/utils/date";
import { Box, Flex, Text } from "@chakra-ui/react";
import { AiOutlineClockCircle } from "react-icons/ai";
type EndsAtBoxProps = {
	endsAt: Date;
};

const EndsAtBox: React.FC<EndsAtBoxProps> = ({ endsAt }) => {
	const time = getApproximateTimeBetween(endsAt);

	return (
		<Flex p={4} align="center" backgroundColor="brandAlpha.50" w="full">
			<Box pr={2} color="brand.900" fontSize="xl">
				<AiOutlineClockCircle />
			</Box>
			<Text as="span" fontSize="sm" fontWeight={500}>
				{endsAt.getTime() > new Date().getTime()
					? `Voting ends in ${time}.`
					: `Voting closed ${time} ago.`}
			</Text>
		</Flex>
	);
};

export default EndsAtBox;
