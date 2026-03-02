import { router } from "../trpc";
import { factRouter } from "./fact";

export const appRouter = router({
  fact: factRouter,
});

export type AppRouter = typeof appRouter;