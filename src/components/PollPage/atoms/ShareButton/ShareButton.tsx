import { CopiedToast } from "@/components/PollPage/atoms/CopiedToast";
import { COPIED_TOAST_ID } from "@/components/PollPage/atoms/CopiedToast/CopiedToast";
import { Button, useToast } from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsShare } from "react-icons/bs";
type ShareButtonProps = {
	pollId: string;
	colorScheme: "brandAlpha" | "grayAlpha";
};

const ShareButton: React.FC<ShareButtonProps> = ({ pollId, colorScheme }) => {
	const toast = useToast();

	return (
		<CopyToClipboard
			text={`${
				process.env.VERCEL_URL
					? `https://${process.env.VERCEL_URL}`
					: "http://localhost:3000"
			}/polls/${pollId}`}
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
