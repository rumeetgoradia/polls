import { useColor } from "@/hooks/useColor";
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
	Switch,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import fade from "color-alpha";
import { useState } from "react";
import { SubmitHandler, useFieldArray, UseFormReturn } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

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
				<Heading as="h1">{title}</Heading>
			</GridItem>
			<GridItem colSpan={2}>
				<FormControl isInvalid={!!errors.title}>
					<FormLabel htmlFor="title">Title</FormLabel>
					<Input type="text" {...register("title")} />
					<FormErrorMessage
						color="error.600"
						pt={2}
						mt={0}
						borderTop="2px"
						borderTopColor="error.600"
					>
						{errors.title?.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>
			<GridItem colSpan={2}>
				<FormControl isInvalid={!!errors.description}>
					<FormLabel htmlFor="description">
						Description <OptionalMarker />
					</FormLabel>
					<Textarea rows={8} {...register("description")} />
					<FormErrorMessage
						color="error.600"
						pt={2}
						mt={0}
						borderTop="2px"
						borderTopColor="error.600"
					>
						{errors.description?.message}
					</FormErrorMessage>
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
							Your poll is visible to everyone.
						</Text>
					</Box>
					<Switch colorScheme="brandAlpha" {...register("isPublic")} />
				</FormControl>
			</GridItem>
			<GridItem colSpan={{ base: 2, sm: 1 }}>
				<FormControl isInvalid={!!errors.endsAt}>
					<FormLabel htmlFor="endsAt">
						End Date <OptionalMarker />
					</FormLabel>
					<Input
						type="datetime-local"
						{...register("endsAt", {
							setValueAs: (val) =>
								isValidDateString(val) ? new Date(val) : undefined,
						})}
					/>
					<FormErrorMessage
						color="error.600"
						pt={2}
						mt={0}
						borderTop="2px"
						borderTopColor="error.600"
					>
						{errors.endsAt?.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>
			{hasEnoughOptions === false && (
				<GridItem colSpan={2}>
					<OptionsErrorBox />
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

const OptionsErrorBox: React.FC = () => {
	const backgroundColor = fade(useColor("error.200"), 0.15);

	return (
		<Flex
			p={4}
			align="center"
			border="2px"
			borderColor="error.600"
			backgroundColor={backgroundColor}
		>
			<Box pr={2} color="error.600" fontSize="xl">
				<RiErrorWarningFill />
			</Box>
			<Text as="span" fontSize="sm" fontWeight={500}>
				Please enter at least 2 valid options for your poll.
			</Text>
		</Flex>
	);
};

export default BasePollForm;
