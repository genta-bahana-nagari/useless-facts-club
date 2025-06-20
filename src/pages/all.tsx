"use client";

import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Head from "next/head";

export default function AllPage() {
  const { data: facts, refetch, isLoading } = trpc.all.getAllFacts.useQuery();

  const vote = trpc.fact.vote.useMutation();

  const handleVote = async (id: string, stars: number) => {
    try {
      await vote.mutateAsync({ id, stars });
      refetch();
    } catch (error) {
      console.error("Voting failed:", error);
      alert("Something went wrong while voting. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Useless Facts Club</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
          <motion.h1
            className="text-4xl font-extrabold text-center text-cyan-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Check all useless facts here!
          </motion.h1>

          {/* Facts Battle */}
          <div
            className={`grid gap-6 ${
              facts && facts.length === 1
                ? "grid-cols-1"
                : facts && facts.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {isLoading ? (
              <p className="col-span-2 text-center text-gray-500">Loading...</p>
            ) : !facts || facts.length === 0 ? (
              <p className="col-span-2 text-center text-gray-500">
                No facts available.
              </p>
            ) : (
              facts.map((fact) => (
                <motion.div
                  key={fact.id}
                  className="bg-zinc-800 p-6 rounded-lg border border-cyan-500/10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-cyan-300 font-semibold mb-1">🤔 Fact</h3>
                  <p className="text-sm font-semibold text-gray-400 mb-2">
                    {fact.text}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    — {fact.user?.username ?? "Anonymous"}
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Button
                        key={s}
                        aria-label={`Vote ${s} stars`}
                        className="cursor-pointer text-yellow-400 border border-yellow-600 hover:bg-yellow-600/20 text-sm"
                        variant="outline"
                        onClick={() => handleVote(fact.id, s)}
                      >
                        ⭐ {s}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
