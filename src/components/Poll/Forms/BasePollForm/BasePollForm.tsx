import { ErrorBox } from "@/components/ErrorBox";
import { CreatePollFields, isValidDateString } from "@/utils/validator";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Select,
	Switch,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useFieldArray, UseFormReturn } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";

type BasePollFormProps = {
	title: string;
	/**
	 * Should include exactly one button with type="submit".
	 */
	actionButtons: React.ReactNode;
	onSubmit: SubmitHandler<CreatePollFields>;
	formFunctionality: UseFormReturn<CreatePollFields>;
};

const BasePollForm: React.FC<BasePollFormProps> = ({
	title,
	actionButtons,
	onSubmit,
	formFunctionality,
}) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = formFunctionality;
	const {
		fields: optionFields,
		append,
		remove,
	} = useFieldArray<CreatePollFields>({
		name: "options",
		control,
	});

	const [hasEnoughOptions, setEnoughOptions] = useState<boolean>();

	const checkOptionsThenSubmit = (data: CreatePollFields) => {
		const { options } = data;
		const filteredOptions = options.filter(
			(option) => option.title.trim().length > 0
		);

		if (filteredOptions.length < 2) {
			setEnoughOptions(false);
			return;
		} else {
			setEnoughOptions(true);
			onSubmit({ ...data, options: filteredOptions });
		}
	};

	return (
		<Grid
			onSubmit={handleSubmit(checkOptionsThenSubmit)}
			as="form"
			noValidate
			w="full"
			gap={8}
			templateColumns="repeat(2, 1fr)"
		>
			<GridItem colSpan={2}>
				<Heading as="h1" fontWeight={600}>
					{title}
				</Heading>
			</GridItem>
			<GridItem colSpan={2}>
				<FormControl isInvalid={!!errors.title}>
					<FormLabel htmlFor="title">Title</FormLabel>
					<Input type="text" {...register("title")} />
					<ErrorMessage message={errors.title?.message} />
				</FormControl>
			</GridItem>
			<GridItem colSpan={2}>
				<FormControl isInvalid={!!errors.description}>
					<FormLabel htmlFor="description">
						Description <OptionalMarker />
					</FormLabel>
					<Textarea rows={8} {...register("description")} />
					<ErrorMessage message={errors.description?.message} />
				</FormControl>
			</GridItem>
			<GridItem colSpan={2}>
				<FormControl id="options">
					<FormLabel>Options</FormLabel>
					<VStack spacing={2} align="flex-start" justify="stretch">
						{optionFields.map((option, index) => (
							<Box w="full" key={option.id}>
								<InputGroup>
									<Input
										{...register(`options.${index}.title`, {
											required: true,
										})}
										placeholder={`Option ${index + 1}`}
									/>
									{!(optionFields.length < 3) && (
										<InputRightElement tabIndex={-1}>
											<IconButton
												onClick={() => remove(index)}
												icon={
													<Box transform="rotate(45deg)">
														<AiOutlinePlus />
													</Box>
												}
												disabled={optionFields.length < 3}
												aria-label={`Remove option ${index}`}
												bg="transparent !important"
												tabIndex={-1}
												border="none"
											/>
										</InputRightElement>
									)}
								</InputGroup>
							</Box>
						))}
						<Flex justify="space-between" align="center" w="full">
							<Button
								onClick={() => append({ title: "" })}
								leftIcon={<AiOutlinePlus />}
								colorScheme="grayAlpha"
							>
								Add option
							</Button>
							<Text opacity={0.65} fontSize="sm" ml={2}>
								{optionFields.length} options
							</Text>
						</Flex>
					</VStack>
				</FormControl>
			</GridItem>
			<GridItem colSpan={{ base: 2, sm: 1 }}>
				<FormControl display="flex" justifyContent="space-between">
					<Box>
						<FormLabel htmlFor="isPublic" mb="0">
							Public
						</FormLabel>
						<Text fontSize="sm" opacity={0.65}>
							Anyone can see and vote on your poll.
						</Text>
					</Box>
					<Switch colorScheme="brandAlpha" {...register("isPublic")} />
				</FormControl>
			</GridItem>
			<GridItem colSpan={{ base: 2, sm: 1 }}>
				<FormControl display="flex" justifyContent="space-between">
					<Box>
						<FormLabel htmlFor="isMultipleSelection" mb="0">
							Allow multiple choice selections
						</FormLabel>
					</Box>
					<Switch
						colorScheme="brandAlpha"
						{...register("isMultipleSelection")}
					/>
				</FormControl>
			</GridItem>
			<GridItem colSpan={{ base: 2, sm: 1 }}>
				<FormControl>
					<FormLabel htmlFor="resultsVisibility">Results visibility</FormLabel>
					<Select defaultValue="PUBLIC" {...register("resultsVisibility")}>
						<option value="PUBLIC">Visible to everyone</option>
						<option value="VOTER">Visible to voters and you</option>
						<option value="OWNER">Visible to only you</option>
					</Select>
				</FormControl>
			</GridItem>
			<GridItem colSpan={{ base: 2, sm: 1 }}>
				<FormControl isInvalid={!!errors.endsAt}>
					<FormLabel htmlFor="endsAt">
						End date <OptionalMarker />
					</FormLabel>
					<Input
						type="datetime-local"
						{...register("endsAt", {
							setValueAs: (val) =>
								isValidDateString(val) ? new Date(val) : undefined,
						})}
					/>
					<ErrorMessage message={errors.endsAt?.message} />
				</FormControl>
			</GridItem>
			{hasEnoughOptions === false && (
				<GridItem colSpan={2}>
					<ErrorBox error="Please enter at least 2 valid options for your poll." />
				</GridItem>
			)}
			<GridItem colSpan={2}>{actionButtons}</GridItem>
		</Grid>
	);
};

const OptionalMarker: React.FC = () => {
	return (
		<Text as="span" fontSize="sm" opacity={0.65}>
			(optional)
		</Text>
	);
};

const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
	return (
		<FormErrorMessage
			color="error.600"
			pt={2}
			mt={0}
			borderTop="2px"
			borderTopColor="error.600"
		>
			{message}
		</FormErrorMessage>
	);
};

export default BasePollForm;
