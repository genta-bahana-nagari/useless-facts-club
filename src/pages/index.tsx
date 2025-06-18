'use client';

import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import Link from "next/link";

export default function HomePage() {
  const { data: facts, refetch, isLoading } = trpc.fact.getTwoRandomFacts.useQuery();
  const vote = trpc.fact.vote.useMutation();

  const handleVote = async (id: string, stars: number) => {
    await vote.mutateAsync({ id, stars });
    refetch();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      <motion.h1
        className="text-4xl font-extrabold text-center text-cyan-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        🥊 Useless Facts Fight Club
      </motion.h1>

      {/* CTA */}
      <div className="bg-zinc-900 border border-cyan-500/10 p-6 rounded-lg text-center">
        <p className="text-gray-300 text-lg mb-4">Got a fact that no one needs to know?</p>
        <Button className="bg-cyan-500 text-black hover:bg-cyan-400 px-6 py-2 rounded-lg font-semibold">
          <Link href="/submit">Submit Yours</Link>
        </Button>
      </div>

      {/* Facts Battle */}
      <div className="grid md:grid-cols-2 gap-6">
        {isLoading
          ? <p className="col-span-2 text-center text-gray-500">Loading...</p>
          : facts?.map((fact) => (
            <motion.div
              key={fact.id}
              className="bg-zinc-800 p-6 rounded-lg border border-cyan-500/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-cyan-300 font-semibold mb-2">🤔 Fact</h3>
              <p className="text-sm text-gray-400 mb-4">{fact.text}</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Button
                    key={s}
                    className="text-yellow-400 border border-yellow-600 hover:bg-yellow-600/20 text-sm"
                    variant="outline"
                    onClick={() => handleVote(fact.id, s)}
                  >
                    ⭐ {s}
                  </Button>
                ))}
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
