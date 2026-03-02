import { appRouter } from "@/server/api/root";
import { createContext } from "@/server/api/context";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
  router: appRouter,
  createContext,
});
