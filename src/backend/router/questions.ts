import * as trpc from "@trpc/server"
import { z } from "zod"

export const questionsRouter = trpc.router().query("questions", {
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
