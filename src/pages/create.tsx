import { Layout } from "@/components/Layout";
import { CreatePollForm } from "@/components/PollForms";
import { NextPage } from "next";

const CreatePage: NextPage = () => {
	return (
		<Layout>
			<CreatePollForm />
		</Layout>
	);
};

export default CreatePage;
