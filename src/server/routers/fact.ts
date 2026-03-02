import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "../db";

export const factRouter = router({
  submitFact: publicProcedure
    .input(z.object({ text: z.string().min(5), username: z.string().min(3) }))
    .mutation(async ({ input }) => {
      const { text, username } = input;

      const user = await prisma.user.upsert({
        where: { username },
        update: {},
        create: { username },
      });

      return prisma.fact.create({
        data: {
          text,
          user: { connect: { id: user.id } },
        },
      });
    }),

  getAllFacts: publicProcedure.query(() => {
    return prisma.fact.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true },
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

  getTopFacts: publicProcedure.query(() => {
    return prisma.fact.findMany({
      orderBy: { stars: "desc" },
      take: 20,
      include: { user: true },
    });
  }),
});