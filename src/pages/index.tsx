import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function Home() {
  const { data: facts, refetch } = trpc.fact.getTwoRandomFacts.useQuery();
  const vote = trpc.fact.vote.useMutation();
  const { data: leaderboard } = trpc.fact.getTopFacts.useQuery();

  const handleVote = async (id: string, stars: number) => {
    await vote.mutateAsync({ id, stars });
    refetch();
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Useless Facts Fight Club</h1>

      {facts?.map((fact) => (
        <div key={fact.id} className="p-4 border my-2 rounded">
          <p>{fact.text}</p>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="bg-yellow-300 px-2 py-1 rounded"
                onClick={() => handleVote(fact.id, star)}
              >
                ⭐ {star}
              </button>
            ))}
          </div>
        </div>
      ))}

      <h2 className="text-xl mt-8 font-semibold">Top Facts</h2>
      {leaderboard?.map((fact) => (
        <div key={fact.id} className="p-2 border-b">
          ⭐ {fact.stars} - {fact.text}
        </div>
      ))}
    </div>
  );
}
