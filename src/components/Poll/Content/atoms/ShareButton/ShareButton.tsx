import { CopiedToast } from "@/components/Poll/Content/atoms/CopiedToast";
import { COPIED_TOAST_ID } from "@/components/Poll/Content/atoms/CopiedToast/CopiedToast";
import { SITE_URL } from "@/constants/seo";
import { Button, useToast } from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsShare } from "react-icons/bs";
type ShareButtonProps = {
	pollId: string;
	colorScheme: "brandAlpha" | "grayAlpha";
	onClick?: () => void;
};

const ShareButton: React.FC<ShareButtonProps> = ({
	pollId,
	colorScheme,
	onClick,
}) => {
	const toast = useToast();

	return (
		<CopyToClipboard
			text={`${SITE_URL}/polls/${pollId}`}
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
				onClick={onClick}
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
