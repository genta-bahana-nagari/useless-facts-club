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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Submit a Useless Fact</h1>
      <textarea
        className="border p-2 w-full"
        rows={4}
        placeholder="Your useless fact..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
