import { createRouter } from "@/backend/router/context";
import { prisma } from "@/db/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const questionsRouter = createRouter()
	.query("get-all", {
		async resolve({ input }) {
			return await prisma.question.findMany();
		},
	})
	.mutation("create", {
		input: z.object({
			question: z.string().min(5).max(600),
		}),
		async resolve({ input, ctx }) {
			if (!ctx.token) {
				throw new TRPCError({ code: "UNAUTHORIZED" });
			}

			return await prisma.question.create({
				data: {
					question: input.question,
					userId: ctx.token,
				},
			});
		},
	});
