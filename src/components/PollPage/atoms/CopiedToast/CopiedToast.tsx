import { Box, Flex, Text } from "@chakra-ui/react";
import { MdContentCopy } from "react-icons/md";
type CopiedToastProps = {};

const CopiedToast: React.FC<CopiedToastProps> = ({}) => {
	return (
		<Box p={6} mt="71px">
			<Flex p={4} align="center" backgroundColor="brandAlpha.400" w="full">
				<Box pr={4} fontSize="lg">
					<MdContentCopy />
				</Box>
				<Text as="span" fontSize="md" lineHeight={1}>
					Copied link to this poll!
				</Text>
			</Flex>
		</Box>
	);
};

export const COPIED_TOAST_ID = "copied";

export default CopiedToast;
