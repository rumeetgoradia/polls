import { createRouter } from "@/backend/router/context";
import { prisma } from "@/db/prisma";
import { pollFieldsValidator } from "@/utils/validator";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const pollsRouter = createRouter()
	.query("get-all-public", {
		async resolve() {
			return await prisma.poll.findMany({
				where: {
					isPublic: {
						equals: true,
					},
				},
				include: {
					User: {
						select: {
							name: true,
						},
					},
				},
				orderBy: {
					createdAt: "desc",
				},
			});
		},
	})
	.query("get-all-owned", {
		async resolve({ ctx }) {
			if (!ctx.token) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
				});
			}

			return await prisma.poll.findMany({
				where: {
					userId: ctx.token,
				},
				orderBy: {
					createdAt: "desc",
				},
			});
		},
	})
	.query("get-content", {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ input, ctx }) {
			const poll = await prisma.poll.findUnique({
				where: {
					id: input.id,
				},
				include: {
					User: {
						select: {
							name: true,
						},
					},
					options: {
						select: {
							id: true,
							title: true,
						},
					},
				},
			});

			if (!poll) {
				throw new TRPCError({ code: "NOT_FOUND" });
			}

			const isOwner = poll.userId === ctx.token;

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

			const resultsAreVisible =
				isOwner ||
				poll.resultsVisibility === "PUBLIC" ||
				(poll.resultsVisibility === "VOTER" && !!votesByCurrentUser.length);

			return {
				poll,
				isOwner,
				votesByCurrentUser,
				resultsAreVisible,
			};
		},
	})
	.query("get-by-title", {
		input: z.object({
			query: z.string(),
		}),
		async resolve({ input }) {
			return await prisma.poll.findMany({
				where: {
					title: {
						startsWith: input.query,
						contains: input.query,
					},
				},
				orderBy: {
					createdAt: "desc",
				},
			});
		},
	})
	.mutation("create", {
		input: pollFieldsValidator,
		async resolve({ input, ctx }) {
			if (!ctx.token) {
				throw new TRPCError({ code: "UNAUTHORIZED" });
			}

			return await prisma.poll.create({
				data: {
					...input,
					options: {
						createMany: {
							data: [...input.options],
						},
					},
					userId: ctx.token,
				},
			});
		},
	})
	.mutation("edit", {
		input: pollFieldsValidator.and(z.object({ id: z.string() })),
		async resolve({ input, ctx }) {
			if (!ctx.token) {
				throw new TRPCError({ code: "UNAUTHORIZED" });
			}

			const poll = await prisma.poll.findUnique({
				where: {
					id: input.id,
				},
				include: {
					User: {
						select: {
							name: true,
						},
					},
					options: {
						select: {
							id: true,
							title: true,
						},
					},
				},
			});

			if (!poll) {
				throw new TRPCError({ code: "NOT_FOUND" });
			}

			if (ctx.token !== poll.userId) {
				throw new TRPCError({ code: "UNAUTHORIZED" });
			}

			const existingOptions = await prisma.option.findMany({
				where: {
					pollId: poll.id,
				},
			});

			// All input options without an ID or with an ID that doesn't already exist
			const optionsToCreate = input.options.filter(
				(option) =>
					!option.id ||
					!existingOptions.some(
						(existingOption) => existingOption.id === option.id
					)
			);
			// All existing options that aren't in the input options
			const optionsToDelete = existingOptions.filter(
				(existingOption) =>
					!input.options.some((option) => option.id === existingOption.id)
			);
			// All input options with a matching existing option ID but differing existing option title
			const optionsToUpdate = input.options.filter((option) =>
				existingOptions.some(
					(existingOption) =>
						existingOption.id === option.id &&
						existingOption.title !== option.title
				)
			);
			console.log(optionsToCreate, optionsToDelete, optionsToUpdate);

			await prisma.poll.update({
				where: {
					id: input.id,
				},
				data: {
					...input,
					options: {
						createMany: {
							data: [...optionsToCreate],
						},
						deleteMany: {
							id: {
								in: optionsToDelete.map((option) => option.id!),
							},
						},
					},
				},
			});

			for (const option of optionsToUpdate) {
				await prisma.option.update({
					where: {
						id: option.id,
					},
					data: {
						...option,
					},
				});
			}

			return { id: poll.id };
		},
	});
