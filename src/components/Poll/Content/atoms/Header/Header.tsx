import { getApproximateTimeBetween } from "@/utils/date";
import {
	Box,
	Flex,
	Heading,
	IconButton,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
type PollHeaderProps = {
	id: string;
	title: string;
	isOwner: boolean;
	user: string;
	createdAt: Date;
	editedAt?: Date;
};

const Header: React.FC<PollHeaderProps> = ({
	createdAt,
	id,
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
		<Flex w="full" align="flex-start">
			<Box flexGrow={1}>
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
					{formattedEditedAt && (
						<>&middot; last edited {formattedEditedAt} ago</>
					)}
				</Text>
			</Box>
			{isOwner && (
				<Box pl={4}>
					<Tooltip label="Edit poll">
						<Box>
							<Link href={`/polls/${id}/edit`} passHref>
								<IconButton icon={<FiEdit />} aria-label="Edit poll" as="a" />
							</Link>
						</Box>
					</Tooltip>
				</Box>
			)}
		</Flex>
	);
};

export default Header;
