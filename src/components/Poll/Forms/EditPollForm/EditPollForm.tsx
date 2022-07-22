import { BasePollForm } from "@/components/Poll/Forms/BasePollForm";
import { trpc } from "@/utils/trpc";
import { CreatePollFields, pollFieldsValidator } from "@/utils/validator";
import { Button, HStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { PollWithUserAndOptions } from "types/db";

type EditPollFormProps = {
	poll: PollWithUserAndOptions;
};

const EditPollForm: React.FC<EditPollFormProps> = ({ poll }) => {
	const formFunctionality = useForm<CreatePollFields>({
		resolver: zodResolver(pollFieldsValidator),
		defaultValues: {
			...poll,
			description: poll.description || undefined,
			endsAt: poll.endsAt || undefined,
		},
	});

	const router = useRouter();

	const { mutate, isLoading } = trpc.useMutation("polls.edit", {
		onSuccess: ({ id }) => {
			router.push(`/polls/${id}`);
		},
	});

	return (
		<BasePollForm
			title="Edit Poll"
			actionButtons={<ActionButtons isLoading={isLoading} pollId={poll.id} />}
			onSubmit={(data) => {
				console.log("data", data);
				mutate({ ...data, id: poll.id });
			}}
			formFunctionality={formFunctionality}
		/>
	);
};

const ActionButtons: React.FC<{ isLoading: boolean; pollId: string }> = ({
	isLoading,
	pollId,
}) => {
	return (
		<HStack justify="end" w="full" spacing={2}>
			<Link href={`/polls/${pollId}`} passHref>
				<Button colorScheme="grayAlpha" as="a" w="141px">
					Cancel
				</Button>
			</Link>
			<Button type="submit" isLoading={isLoading} w="141px">
				Save
			</Button>
		</HStack>
	);
};

export default EditPollForm;
