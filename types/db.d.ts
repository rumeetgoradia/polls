import { Poll } from "@prisma/client";

export type PollWithUser = Poll & {
	User: {
		name: string | null;
	};
};

export type PollWithUserAndOptions = PollWithUser & {
	options: {
		title: string;
		id: string;
	}[];
};
