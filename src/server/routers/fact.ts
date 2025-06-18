import { z } from "zod";
import { prisma } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const factRouter = createTRPCRouter({
  getTwoRandomFacts: publicProcedure.query(async () => {
    const facts = await prisma.fact.findMany({
      take: 2,
      orderBy: { createdAt: "desc" },
    });
    return facts;
  }),

  submitFact: publicProcedure
    .input(z.object({ text: z.string().min(5) }))
    .mutation(async ({ input }) => {
      return prisma.fact.create({
        data: { text: input.text },
      });
    }),

  vote: publicProcedure
    .input(z.object({ id: z.string(), stars: z.number().min(1).max(5) }))
    .mutation(async ({ input }) => {
      return prisma.fact.update({
        where: { id: input.id },
        data: { stars: { increment: input.stars } },
      });
    }),

  getTopFacts: publicProcedure.query(() =>
    prisma.fact.findMany({
      orderBy: { stars: "desc" },
      take: 10,
    })
  ),
});