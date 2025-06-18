import { initTRPC } from '@trpc/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  getRandomFact: publicProcedure.query(async () => {
    const facts = await prisma.fact.findMany();
    return facts[Math.floor(Math.random() * facts.length)];
  }),
  getLeaderboard: publicProcedure.query(async () => {
    return await prisma.user.findMany({
      orderBy: { wins: 'desc' },
      take: 10,
    });
  }),
});

export type AppRouter = typeof appRouter;