import { Layout } from "@/components/Layout";
import { CreatePollForm } from "@/components/Poll/Forms";

import { NextPage } from "next";

const CreatePage: NextPage = () => {
	return (
		<Layout title="Create Poll">
			<CreatePollForm />
		</Layout>
	);
};

export default CreatePage;
