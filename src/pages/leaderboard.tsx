'use client';

import { trpc } from '@/utils/trpc';
import { motion } from 'framer-motion';

export default function Leaderboard() {
  const { data, isLoading } = trpc.fact.getTopFacts.useQuery();

  return (
    <main className="bg-black min-h-screen text-white p-6 font-sans">
      <motion.h1
        className="text-3xl font-bold text-cyan-400 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🏆 Leaderboard
      </motion.h1>

      {isLoading ? (
        <motion.p
          className="text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading...
        </motion.p>
      ) : (
        <ul className="space-y-4 max-w-2xl mx-auto">
          {data?.map((fact, i) => (
            <motion.li
              key={fact.id}
              className="bg-zinc-900 border border-cyan-500/20 p-4 rounded-lg shadow hover:shadow-cyan-500/10 transition-shadow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm text-gray-300">{fact.text}</p>
                  <p className="text-xs text-gray-500">— {fact.user?.username ?? "Anonymous"}</p>
                </div>
                <span className="text-cyan-400 px-3 font-medium">{fact.stars} ⭐</span>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </main>
  );
}
