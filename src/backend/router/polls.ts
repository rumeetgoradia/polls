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
				return [];
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
	.query("get-by-id", {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ input }) {
			return await prisma.poll.findUnique({
				where: {
					id: input.id,
				},
			});
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
	});
