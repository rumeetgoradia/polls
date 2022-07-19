import { SessionContext } from "@/context/session";
import { useColor } from "@/hooks/useColor";
import {
	Box,
	Button,
	Container,
	Flex,
	HStack,
	Link as Anchor,
} from "@chakra-ui/react";
import fade from "color-alpha";
import Link from "next/link";
import { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AccountPopover } from "./AccountPopover";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = ({}) => {
	const backgroundColor = useColor("black");

	return (
		<Flex
			as="header"
			justify="center"
			w="full"
			borderBottom="1px"
			borderBottomColor="gray.700"
			position="fixed"
			zIndex="banner"
			top={0}
			left={0}
			bg={fade(backgroundColor, 0.9)} //background
			backdropFilter="saturate(180%) blur(5px)"
			sx={{
				"@supports not (backdrop-filter: none)": {
					backdropFilter: "none",
					bg: "black",
				},
			}}
		>
			<Container maxW="container.md" py={2}>
				<Flex justify="space-between" align="center" w="full">
					<Link href="/" passHref>
						<Anchor
							fontWeight={300}
							title="rgPolls"
							fontSize={{ base: "3xl", sm: "4xl" }}
							textDecoration="none !important"
							_hover={{ transform: "scale(1.025)" }}
							_focusVisible={{ transform: "scale(1.025)" }}
							_active={{ transform: "scale(0.975)" }}
						>
							<Box as="span" color="brand.900">
								rg
							</Box>
							Polls
						</Anchor>
					</Link>
					<NavButtons />
				</Flex>
			</Container>
		</Flex>
	);
};

const NavButtons: React.FC = () => {
	const { session, signIn, signOut, status } = useContext(SessionContext);

	return (
		<HStack spacing={{ base: 2, sm: 4 }}>
			{/* {status !== "authenticated" && (
				<Flex w="52px" justify="center">
					<Spinner size="sm" />
				</Flex>
			)} */}
			{session?.isGuest && status === "authenticated" && (
				<Button
					onClick={() => signIn(session?.user?.id)}
					variant="link"
					size={{ base: "sm", sm: "md" }}
				>
					Sign In
				</Button>
			)}
			<Link href="/create" passHref>
				<Button
					as="a"
					leftIcon={<AiOutlinePlus />}
					title="Create a poll"
					size={{ base: "sm", sm: "md" }}
				>
					Create a poll
				</Button>
			</Link>
			{!session?.isGuest && status === "authenticated" && <AccountPopover />}
		</HStack>
	);
};

export default Navbar;
