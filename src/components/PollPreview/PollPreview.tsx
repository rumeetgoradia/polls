import { SessionContext } from "@/context/session";
import { createTransition } from "@/utils/transition";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { PollWithUser } from "types/db";

type PollPreviewProps = {
	poll: PollWithUser;
};

const PollPreview: React.FC<PollPreviewProps> = ({ poll }) => {
	const { session } = useContext(SessionContext);

	const [isOwned, setIsOwned] = useState<boolean>(false);

	useEffect(() => {
		if (session?.user?.id === poll.userId) {
			setIsOwned(true);
		} else {
			setIsOwned(false);
		}
	}, [session, poll]);

	return (
		<Link href={`/polls/${poll.id}`} passHref>
			<Box
				w="full"
				as="a"
				display="block"
				bg="whiteAlpha.50"
				p={6}
				title={poll.title}
				transition={createTransition("transform")}
				_hover={{
					transform: "scale(1.025)",
				}}
			>
				<Text as="h6" fontSize="xl" fontWeight={500} lineHeight={1.25}>
					{poll.title}
				</Text>
				<Flex flexDirection="column" align="flex-end" mt={2} w="full">
					<Text fontSize="sm" textAlign="right" opacity={0.65} maxW="200px">
						created by {isOwned ? <strong>You</strong> : poll.User.name}
					</Text>
					<Text fontSize="sm" textAlign="right" opacity={0.65}>
						{poll.createdAt.toLocaleString()}
					</Text>
				</Flex>
			</Box>
		</Link>
	);
};

export default PollPreview;
