import { Box, Link } from "@chakra-ui/react";

type FooterProps = {};

const Footer: React.FC<FooterProps> = ({}) => {
	return (
		<Box
			w="full"
			textAlign="center"
			fontSize="xs"
			fontWeight={300}
			opacity={0.8}
			py={1}
		>
			Created by{" "}
			<Link
				href="https://rumeetgoradia.com"
				isExternal
				_hover={{ color: "brand.900" }}
				_focusVisible={{ color: "brand.900" }}
			>
				Rumeet Goradia
			</Link>
		</Box>
	);
};

export default Footer;
