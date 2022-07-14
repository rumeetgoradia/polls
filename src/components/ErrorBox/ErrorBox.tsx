import { useColor } from "@/hooks/useColor";
import { Box, Flex, Text } from "@chakra-ui/react";
import fade from "color-alpha";
import { RiErrorWarningLine } from "react-icons/ri";
type ErrorBoxProps = {
	error: string;
};

const ErrorBox: React.FC<ErrorBoxProps> = ({ error }) => {
	const backgroundColor = fade(useColor("error.600"), 0.125);

	return (
		<Flex p={4} align="center" w="full" backgroundColor={backgroundColor}>
			<Box pr={2} color="error.600" fontSize="xl">
				<RiErrorWarningLine />
			</Box>
			<Text as="span" fontSize="sm" fontWeight={500}>
				{error}
			</Text>
		</Flex>
	);
};

export default ErrorBox;
