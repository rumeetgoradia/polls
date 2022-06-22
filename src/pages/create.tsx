import { CreatePollForm } from "@/components/PollForms";
import { Container } from "@chakra-ui/react";
import { NextPage } from "next";

const CreatePage: NextPage = () => {
	return (
		<Container maxW="container.md">
			<CreatePollForm />
		</Container>
	);
};

export default CreatePage;
