import { Layout } from "@/components/Layout";
import { EditPollForm } from "@/components/Poll/Forms/EditPollForm";
import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import { useRouter } from "next/router";

const EditPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	if (!id || typeof id !== "string") {
		// TODO render 404 page
		return null;
	}

	const { data, isLoading, error } = trpc.useQuery([
		"polls.get-content",
		{
			id,
		},
	]);

	const getPageTitle = () => {
		if (isLoading) return "Loading...";
		// TODO if error is unauthorized, then return results are not visible page
		if (error || !data || !data.poll) return "404";
		if (data.poll) return `${data.poll.title} — Results`;
	};

	return (
		<Layout title={getPageTitle()}>
			{/* TODO add fallback */}
			<EditPollForm poll={data?.poll!} />
		</Layout>
	);
};

export default EditPage;
