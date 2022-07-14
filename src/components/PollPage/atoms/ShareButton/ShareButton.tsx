import { CopiedToast } from "@/components/PollPage/atoms/CopiedToast";
import { COPIED_TOAST_ID } from "@/components/PollPage/atoms/CopiedToast/CopiedToast";
import { Button, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsShare } from "react-icons/bs";
type ShareButtonProps = {
	pollId: string;
	colorScheme: "brandAlpha" | "grayAlpha";
};

const ShareButton: React.FC<ShareButtonProps> = ({ pollId, colorScheme }) => {
	const [baseUrl, setBaseUrl] = useState<string>();

	useEffect(() => {
		setBaseUrl(getBaseUrl());
	}, []);

	const toast = useToast();

	function getBaseUrl() {
		if (typeof window !== "undefined") {
			return "";
		}
		if (process.browser) return ""; // Browser should use current path
		if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

		return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
	}

	return (
		<CopyToClipboard
			text={`${baseUrl}/polls/${pollId}`}
			onCopy={() => {
				if (!toast.isActive(COPIED_TOAST_ID)) {
					toast({
						id: COPIED_TOAST_ID,
						position: "top-right",
						render: () => <CopiedToast />,
					});
				}
			}}
		>
			<Button
				w="full"
				colorScheme={colorScheme}
				leftIcon={<BsShare />}
				title="Share"
			>
				Share
			</Button>
		</CopyToClipboard>
	);
};

export default ShareButton;
