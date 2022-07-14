import { createRouter } from "@/backend/router/context";
import { prisma } from "@/db/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const votesRouter = createRouter()
	.mutation("cast-vote", {
		input: z.object({
			selectedOptions: z.array(z.string()),
			pollId: z.string(),
		}),
		async resolve({ input, ctx }) {
			if (!ctx.token) {
				throw new TRPCError({ code: "UNAUTHORIZED" });
			}

			const poll = await prisma.poll.findUnique({
				where: {
					id: input.pollId,
				},
			});

			if (!poll) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "The selected poll doesn't exist.",
				});
			}

			if (!input.selectedOptions.length) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: `${
						poll.isMultipleSelection ? "At least one" : "An"
					} option must be selected.`,
				});
			}

			if (!poll.isMultipleSelection && input.selectedOptions.length !== 1) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Only one option must be selected.",
				});
			}

			const options = await prisma.option.findMany({
				where: {
					id: {
						in: input.selectedOptions,
					},
				},
			});

			if (options.length !== input.selectedOptions.length) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "At least one option you selected doesn't exist.",
				});
			}

			for (const option of options) {
				if (option.pollId !== poll.id) {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message:
							"At least one option you selected isn't for the requested poll.",
					});
				}
			}

			// Delete all existing votes for this user and poll
			await prisma.vote.deleteMany({
				where: {
					userId: ctx.token,
					option: {
						pollId: poll.id,
					},
				},
			});

			// Create new votes
			const newData = options.map(({ id }) => ({
				optionId: id,
				userId: ctx.token!,
			}));

			await prisma.vote.createMany({
				data: newData,
			});

			return poll.userId === ctx.token || poll.resultsVisibility !== "OWNER";
		},
	})
	.query("results", {
		input: z.object({
			pollId: z.string(),
		}),
		async resolve({ input, ctx }) {
			if (!ctx.token) {
				throw new TRPCError({ code: "UNAUTHORIZED" });
			}

			const poll = await prisma.poll.findUnique({
				where: {
					id: input.pollId,
				},
				include: {
					User: {
						select: {
							name: true,
						},
					},
				},
			});

			if (!poll) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "The selected poll doesn't exist.",
				});
			}

			const votesByCurrentUser = await prisma.vote.findMany({
				where: {
					userId: ctx.token,
					option: {
						pollId: poll.id,
					},
				},
				select: {
					optionId: true,
				},
			});

			const isOwner = poll.userId === ctx.token;

			const resultsAreVisible =
				isOwner ||
				poll.resultsVisibility === "PUBLIC" ||
				(poll.resultsVisibility === "VOTER" && !!votesByCurrentUser.length);

			if (!resultsAreVisible) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "Results are not visible to you for this poll.",
				});
			}

			const options = await prisma.option.findMany({
				where: {
					pollId: input.pollId,
				},
			});

			const votes = await prisma.vote.groupBy({
				where: {
					option: {
						pollId: poll.id,
					},
				},
				by: ["optionId"],
				_count: true,
			});

			const users = await prisma.vote.findMany({
				where: {
					option: {
						pollId: input.pollId,
					},
				},
				distinct: ["userId"],
				select: {
					userId: true,
				},
			});

			return {
				isOwner,
				poll,
				options,
				votes,
				numUsersVoted: users.length,
			};
		},
	});
