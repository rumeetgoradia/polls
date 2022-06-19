import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/constants/seo";
import { NextSeoProps } from "next-seo";

const SeoProps: NextSeoProps = {
	defaultTitle: SITE_NAME,
	titleTemplate: `%s — ${SITE_NAME}`,
	description: SITE_DESCRIPTION,
	canonical: SITE_URL,
	openGraph: {
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		type: "website",
		locale: "en_IE",
		url: SITE_URL,
		site_name: SITE_NAME,
		images: [
			{
				url: `/images/seo/card.png`,
				width: 1200,
				height: 628,
				alt: SITE_NAME,
			},
		],
	},
	twitter: {
		cardType: "summary_large_image",
		site: SITE_NAME,
	},
};

export default SeoProps;
