import { Container } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

type LayoutProps = {
	title?: string;
	children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
	return (
		<>
			<NextSeo title={title} />
			<Container maxW="container.md" pt={24} pb={10} minH="calc(100vh - 26px)">
				{children}
			</Container>
		</>
	);
};

export default Layout;
