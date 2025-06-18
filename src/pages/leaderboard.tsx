// src/pages/leaderboard.tsx
import { trpc } from '@/utils/trpc';

export default function Leaderboard() {
  const { data, isLoading } = trpc.fact.getTopFacts.useQuery();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏆 Leaderboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {data?.map((fact, i) => (
            <li key={fact.id} className="p-3 bg-white rounded shadow">
              <span className="font-bold">#{i + 1}</span> — {fact.text}
              <span className="float-right text-blue-600">{fact.votes} ⭐</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
