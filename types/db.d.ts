import { Poll } from "@prisma/client";

export type PollWithUser = Poll & {
	User: {
		name: string | null;
	};
};
