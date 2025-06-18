import { trpc } from '@/utils/trpc';

export default function Leaderboard() {
  const { data, isLoading } = trpc.fact.getTopFacts.useQuery();

  return (
    <main className="bg-black min-h-screen text-white p-6 font-sans">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">🏆 Leaderboard</h1>

      {isLoading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <ul className="space-y-4 max-w-2xl mx-auto">
          {data?.map((fact, i) => (
            <li
              key={fact.id}
              className="bg-zinc-900 border border-cyan-500/20 p-4 rounded-lg shadow hover:shadow-cyan-500/10 transition-shadow"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-cyan-300">#{i + 1}</span>
                <span className="text-gray-300 text-sm">{fact.text}</span>
                <span className="text-cyan-400 font-medium">{fact.votes} ⭐</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
