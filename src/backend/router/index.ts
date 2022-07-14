import { createRouter } from "@/backend/router/context";
import superjson from "superjson";
import { pollsRouter } from "./polls";
import { usersRouter } from "./users";
import { votesRouter } from "./votes";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("polls.", pollsRouter)
	.merge("users.", usersRouter)
	.merge("votes.", votesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
