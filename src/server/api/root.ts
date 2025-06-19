import { createTRPCRouter } from "@/server/api/trpc";
import { factRouter } from "../routers/fact";
import { allRouter } from "../routers/all";

export const appRouter = createTRPCRouter({
  fact: factRouter,
  all: allRouter,
});

export type AppRouter = typeof appRouter;
