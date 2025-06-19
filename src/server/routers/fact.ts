import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "@/server/db";

export const factRouter = router({
  submitFact: publicProcedure
    .input(z.object({
      text: z.string().min(5),
      username: z.string().min(3),
    }))
    .mutation(async ({ input }) => {
      const { text, username } = input;

      const user = await prisma.user.upsert({
        where: { username },
        update: {},
        create: { username },
      });

      const fact = await prisma.fact.create({
        data: {
          text,
          user: { connect: { id: user.id } },
        },
      });

      return fact;
    }),

  // 🆕 Get Two Random Facts
  getTwoRandomFacts: publicProcedure.query(async () => {
    const facts = await prisma.fact.findMany({
      orderBy: { createdAt: 'desc' }, // or use raw SQL with RANDOM()
      take: 20, // larger pool for randomness
      include: { user: true },
    });

    if (facts.length < 2) return facts;
    const shuffled = facts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }),

  // 🆕 Vote on Fact
  vote: publicProcedure
    .input(z.object({
      id: z.string(),
      stars: z.number().min(1).max(5),
    }))
    .mutation(async ({ input }) => {
      const { id, stars } = input;

      return await prisma.fact.update({
        where: { id },
        data: {
          stars: {
            increment: stars,
          },
        },
      });
    }),

    getTopFacts: publicProcedure.query(async () => {
      return await prisma.fact.findMany({
        orderBy: {
          stars: 'desc',
        },
        take: 20,
        include: {
          user: true,
        },
      });
    }),
});
