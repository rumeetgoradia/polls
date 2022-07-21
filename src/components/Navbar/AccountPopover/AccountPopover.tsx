import { createTransition } from "@/utils/transition";
import {
	Box,
	Flex,
	IconButton,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { BiPoll } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { HiLogout } from "react-icons/hi";

type AccountPopoverLink = {
	icon: JSX.Element;
	title: string;
	path?: string;
};

const ACCOUNT_POPOVER_LINKS: AccountPopoverLink[] = [
	{
		icon: <BiPoll />,
		title: "Your Polls",
		path: "/account/polls",
	},
	{
		icon: <HiLogout />,
		title: "Sign Out",
	},
];

const AccountPopover: React.FC = () => {
	const { isOpen, onToggle, onClose } = useDisclosure();

	return (
		<Popover
			returnFocusOnClose={false}
			isOpen={isOpen}
			onClose={onClose}
			placement="bottom-end"
		>
			<PopoverTrigger>
				<IconButton
					onClick={onToggle}
					icon={<BsPerson />}
					aria-label="Your account"
					colorScheme="grayAlpha"
					h={{ base: "32px", sm: "40px" }}
					w={{ base: "32px", sm: "40px" }}
					minW="none"
					fontSize="xl"
				/>
			</PopoverTrigger>
			<PopoverContent
				borderRadius={0}
				border="none"
				bg="gray.800"
				py={2}
				minW="none"
				w="auto"
			>
				{ACCOUNT_POPOVER_LINKS.map(({ icon, title, path }) => {
					if (path) {
						return (
							<Link href={path} passHref key={`${title}-popover-link`}>
								<a onClick={onClose}>
									<AccountPopoverItem title={title} icon={icon} />
								</a>
							</Link>
						);
					} else {
						return (
							<Box
								w="full"
								onClick={() => {
									signOut();
									onClose();
								}}
								key={`${title}-popover-link`}
							>
								<AccountPopoverItem title={title} icon={icon} />
							</Box>
						);
					}
				})}
			</PopoverContent>
		</Popover>
	);
};

const AccountPopoverItem: React.FC<{ title: string; icon: JSX.Element }> = ({
	title,
	icon,
}) => {
	return (
		<Flex
			as="a"
			title={title}
			w="full"
			align="center"
			py={3}
			px={6}
			_hover={{ bg: "whiteAlpha.100" }}
			cursor="pointer"
			lineHeight={1}
			transition={createTransition("bg")}
		>
			<Box flexBasis="15px" color="white">
				{icon}
			</Box>
			<Text
				ml={4}
				fontWeight={500}
				fontSize="sm"
				letterSpacing={1}
				textTransform="uppercase"
			>
				{title}
			</Text>
		</Flex>
	);
};

export default AccountPopover;
