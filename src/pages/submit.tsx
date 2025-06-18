import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function SubmitPage() {
  const [text, setText] = useState("");
  const submitFact = trpc.fact.submitFact.useMutation();

  const handleSubmit = async () => {
    if (text.length < 5) return;
    await submitFact.mutateAsync({ text });
    setText("");
    alert("Fact submitted!");
  };

  return (
    <main className="bg-black min-h-screen text-white p-6 font-sans flex flex-col items-center">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">💡 Submit a Useless Fact</h1>

      <div className="w-full max-w-xl">
        <textarea
          className="w-full p-4 bg-zinc-900 text-white border border-cyan-600/20 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          rows={5}
          placeholder="Type your useless fact here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="mt-4 w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
          onClick={handleSubmit}
        >
          🚀 Submit
        </button>
      </div>
    </main>
  );
}
