import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
	const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

	return (
		<>
			<h1>Questions</h1>
			{data?.map((q) => (
				<div key={q.question}>q.question</div>
			))}
		</>
	);
};

export default HomePage;
