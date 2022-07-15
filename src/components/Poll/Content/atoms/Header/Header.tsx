import { getApproximateTimeBetween } from "@/utils/date";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
type PollHeaderProps = {
	title: string;
	isOwner?: boolean;
	user: string;
	createdAt: Date;
	editedAt?: Date;
};

const Header: React.FC<PollHeaderProps> = ({
	createdAt,
	isOwner,
	title,
	user,
	editedAt,
}) => {
	const [formattedCreatedAt, setFormattedCreatedAt] = useState<string>();
	const [formattedEditedAt, setFormattedEditedAt] = useState<string>();

	useEffect(() => {
		setFormattedCreatedAt(getApproximateTimeBetween(createdAt));

		if (editedAt) {
			setFormattedEditedAt(getApproximateTimeBetween(editedAt));
		} else {
			setFormattedEditedAt(undefined);
		}
	}, [createdAt, editedAt]);

	return (
		<Box>
			<Heading as="h1" fontWeight={600} lineHeight={1.15}>
				{title}
			</Heading>
			<Heading as="h2" fontWeight={400} fontSize="xl" opacity={0.65}>
				<>
					by{" "}
					{isOwner ? (
						<Box
							as="strong"
							fontSize="lg"
							textTransform="uppercase"
							fontWeight={700}
						>
							You
						</Box>
					) : (
						user
					)}
				</>
			</Heading>
			<Text fontWeight={400} fontSize="sm" opacity={0.65} mt={2}>
				created {formattedCreatedAt} ago{" "}
				{formattedEditedAt && <>&middot; last edited {formattedEditedAt} ago</>}
			</Text>
		</Box>
	);
};

export default Header;
