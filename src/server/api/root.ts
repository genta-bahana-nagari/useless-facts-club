import { createTRPCRouter } from "@/server/api/trpc";
import { factRouter } from "../routers/fact";

export const appRouter = createTRPCRouter({
  fact: factRouter,
});

export type AppRouter = typeof appRouter;
