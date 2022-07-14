import { appRouter } from "@/backend/router";
import { createContext } from "@/backend/router/context";
import * as trpcNext from "@trpc/server/adapters/next";

// export API handler
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext,
});
