import { createRouter } from "@/backend/router/context";
import { prisma } from "@/db/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const questionsRouter = createRouter()
	.query("get-all-public", {
		async resolve() {
			return await prisma.question.findMany({
				where: {
					isPublic: {
						equals: true,
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

			return await prisma.question.findMany({
				where: {
					userId: ctx.token,
				},
				orderBy: {
					createdAt: "desc",
				},
			});
		},
	})
	.mutation("create", {
		input: z.object({
			question: z.string().min(5).max(600),
			isPublic: z.boolean(),
		}),
		async resolve({ input, ctx }) {
			if (!ctx.token) {
				throw new TRPCError({ code: "UNAUTHORIZED" });
			}

			return await prisma.question.create({
				data: {
					question: input.question,
					userId: ctx.token,
					isPublic: input.isPublic,
				},
			});
		},
	});
