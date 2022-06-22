import { createRouter } from "@/backend/router/context";
import superjson from "superjson";
import { pollsRouter } from "./polls";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("polls.", pollsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
