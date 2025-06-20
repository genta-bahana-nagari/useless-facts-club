import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <motion.div
      className="max-w-3xl mx-auto px-4 py-12 text-gray-300 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold text-cyan-400">About</h1>
      <p>
        Welcome to{" "}
        <span className="text-white font-semibold">Useless Facts Club</span> — a
        battleground for the most random, pointless, yet strangely delightful
        facts known to the internet.
      </p>
      <p>
        Submit your own ridiculous trivia, rate others, and climb the
        leaderboard of ultimate uselessness.
      </p>
      <p className="text-sm text-gray-500">
        Built with ❤️ using Next.js, tRPC, and TailwindCSS.
      </p>
    </motion.div>
  );
}
