import { trpc } from '@/utils/trpc';

export default function Home() {
  const { data: fact, isLoading } = trpc.getRandomFact.useQuery();
  const { data: leaderboard } = trpc.getLeaderboard.useQuery();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Useless Facts Fight Club</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Random Fact</h2>
        {isLoading ? 'Loading...' : <p>{fact?.text}</p>}
      </div>

      <div>
        <h2 className="text-xl font-semibold">Leaderboard</h2>
        <ul>
          {leaderboard?.map((user, i) => (
            <li key={user.id}>
              {i + 1}. {user.username} - {user.wins} wins
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
