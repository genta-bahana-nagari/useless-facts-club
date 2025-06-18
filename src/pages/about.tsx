export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-300 space-y-6">
      <h1 className="text-3xl font-bold text-cyan-400">About</h1>
      <p>
        Welcome to <span className="text-white font-semibold">Useless Facts Fight Club</span> — a
        battleground for the most random, pointless, yet strangely delightful facts known to the internet.
      </p>
      <p>
        Submit your own ridiculous trivia, rate others, and climb the leaderboard of ultimate uselessness.
      </p>
      <p className="text-sm text-gray-500">
        Built with ❤️ using Next.js, tRPC, and TailwindCSS.
      </p>
    </div>
  );
}
