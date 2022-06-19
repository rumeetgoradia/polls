import { prisma } from "@/db/prisma"
import * as trpc from "@trpc/server"
import { z } from "zod"

export const questionsRouter = trpc
	.router()
	.query("get-all", {
		input: z
			.object({
				text: z.string().nullish(),
			})
			.nullish(),
		resolve({ input }) {
			return {
				greeting: `hello ${input?.text ?? "world"}`,
			}
		},
	})
	.mutation("create", {
		input: z.object({
			question: z.string().min(5).max(600),
			userId: z.string(),
		}),
		async resolve({ input }) {
			const newQuestion = await prisma.question.create({
				data: {
					...input,
				},
			})
		},
	})
