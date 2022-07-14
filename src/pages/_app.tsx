import { AppRouter } from "@/backend/router";
import { Chakra } from "@/components/Chakra";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SessionContextProvider } from "@/context/session";
import theme, { Fonts } from "@/styles/theme";
import { getBaseUrl } from "@/utils/url";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import SeoProps from "next-seo.config";
import { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";

const MyApp: AppType = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<SessionContextProvider>
				<DefaultSeo {...SeoProps} />
				<Chakra cookies={pageProps.cookies} theme={theme}>
					<Fonts />
					<Navbar />
					<Component {...pageProps} />
					<Footer />
				</Chakra>
			</SessionContextProvider>
		</SessionProvider>
	);
};

export default withTRPC<AppRouter>({
	config({ ctx }) {
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		const url = `${getBaseUrl()}/api/trpc`;

		return {
			headers() {
				return {
					cookie: ctx?.req?.headers.cookie,
				};
			},
			url,
			transformer: superjson,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: true,
})(MyApp);

export { getServerSideProps } from "@/components/Chakra";
