import { Chakra } from "@/components/Chakra"
import theme, { Fonts } from "@/styles/theme"
import { DefaultSeo } from "next-seo"
import SeoProps from "next-seo.config"
import type { AppProps } from "next/app"

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<DefaultSeo {...SeoProps} />
			<Chakra cookies={pageProps.cookies} theme={theme}>
				<Fonts />
				<Component {...pageProps} />
			</Chakra>
		</>
	)
}

export { getServerSideProps } from "@/components/Chakra"
