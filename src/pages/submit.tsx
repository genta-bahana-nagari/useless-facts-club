import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SubmitPage() {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const submitFact = trpc.fact.submitFact.useMutation();

  const handleSubmit = async () => {
    if (text.length < 5 || username.length < 3 || submitFact.isLoading) return;

    await submitFact.mutateAsync({ text, username });
    setText("");
    setUsername("");
    alert("Fact submitted!");
  };

  const isSubmitting = submitFact.isLoading;

  return (
    <main className="bg-black min-h-screen text-white p-6 font-sans flex flex-col items-center">
      <motion.h1
        className="text-3xl font-bold text-cyan-400 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        💡 Submit a Useless Fact
      </motion.h1>

      <motion.div
        className="w-full max-w-xl space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <input
          className="w-full p-3 bg-zinc-900 text-white border border-cyan-600/20 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <textarea
          className="w-full p-4 bg-zinc-900 text-white border border-cyan-600/20 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          rows={5}
          placeholder="Type your useless fact here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <motion.button
          className={`w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 px-4 rounded-lg transition-colors ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "🚀 Submit"}
        </motion.button>
      </motion.div>
    </main>
  );
}
