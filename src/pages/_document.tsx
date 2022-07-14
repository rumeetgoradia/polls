import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="preload"
						href="/fonts/Inter.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/favicons/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicons/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicons/favicon-16x16.png"
					/>
					<link rel="manifest" href="/favicons/site.webmanifest" />
					<link
						rel="mask-icon"
						href="/favicons/safari-pinned-tab.svg"
						color="#035841"
					/>
					<link rel="shortcut icon" href="/favicons/favicon.ico" />
					<meta name="msapplication-TileColor" content="#00a300" />
					<meta
						name="msapplication-config"
						content="/favicons/browserconfig.xml"
					/>
					<meta name="theme-color" content="#f5f5f5" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
