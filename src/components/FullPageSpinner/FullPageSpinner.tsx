import { Box, Flex, Spinner } from "@chakra-ui/react";

const FullPageSpinner: React.FC = () => {
	return (
		<Flex
			w="full"
			h="calc(100vh - 26px - 96px - 40px)"
			justify="center"
			align="center"
		>
			<Box transform="scale(3)">
				<Spinner size="xl" />
			</Box>
		</Flex>
	);
};

export default FullPageSpinner;
