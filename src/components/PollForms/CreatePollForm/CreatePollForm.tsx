import { trpc } from "@/utils/trpc";
import { CreatePollFields, pollFieldsValidator } from "@/utils/validator";
import { Button, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { BasePollForm } from "../BasePollForm";
type CreatePollFormProps = {};

const CreatePollForm: React.FC<CreatePollFormProps> = ({}) => {
	const formFunctionality = useForm<CreatePollFields>({
		resolver: zodResolver(pollFieldsValidator),
		defaultValues: {
			options: [
				{
					title: "",
				},
				{
					title: "",
				},
			],
		},
	});

	const router = useRouter();

	const { mutate, isLoading } = trpc.useMutation("polls.create", {
		onSuccess: ({ id }) => {
			router.push(`/polls/${id}`);
		},
	});

	return (
		<BasePollForm
			title="Create Poll"
			actionButtons={<ActionButtons isLoading={isLoading} />}
			onSubmit={(data) => mutate(data)}
			formFunctionality={formFunctionality}
		/>
	);
};

const ActionButtons: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
	return (
		<Flex justify="end">
			<Button type="submit" isLoading={isLoading}>
				Create Poll
			</Button>
		</Flex>
	);
};

export default CreatePollForm;
