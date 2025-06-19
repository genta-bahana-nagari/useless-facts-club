"use client";

import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

export default function HomePage() {
  const {
    data: facts,
    refetch,
    isLoading,
  } = trpc.fact.getTwoRandomFacts.useQuery();
  const vote = trpc.fact.vote.useMutation();

  const handleVote = async (id: string, stars: number) => {
    try {
      await vote.mutateAsync({ id, stars });
      refetch();
    } catch (error) {
      console.error("Voting failed:", error);
      alert("Something went wrong while voting. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Useless Facts Fight Club</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <motion.h2
              className="text-3xl font-bold text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Welcome to
            </motion.h2>
            <motion.h1
              className="text-4xl font-extrabold text-center text-cyan-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              🥊 Useless Facts Fight Club
            </motion.h1>
            <motion.p
              className="text-gray-400 font-semibold max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Every day, two useless facts enter. Only one leaves... rated by
              your stars. Upvote the quirkiest, funniest, or most absurdly
              unnecessary knowledge you've never needed.
            </motion.p>
          </section>

          {/* How It Works */}
          <section className="bg-zinc-900 p-6 border border-cyan-500/10 rounded-lg space-y-2">
            <h3 className="text-lg text-cyan-400 font-bold">🤯 How It Works</h3>
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
              <li>Two random useless facts are shown to you.</li>
              <li>You rate each one from 1 to 5 stars.</li>
              <li>We collect the data and crown the weirdest facts.</li>
              <li>No real purpose. Just vibes and trivia.</li>
            </ul>
          </section>

          {/* Facts Battle */}
          <div className="grid md:grid-cols-2 gap-6">
            {isLoading ? (
              <p className="col-span-2 text-center text-gray-500">Loading...</p>
            ) : !facts || facts.length === 0 ? (
              <p className="col-span-2 text-center text-gray-500">
                No facts available.
              </p>
            ) : (
              facts.map((fact) => (
                <motion.div
                  key={fact.id}
                  className="bg-zinc-800 p-6 rounded-lg border border-cyan-500/10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-cyan-300 font-semibold mb-1">🤔 Fact</h3>
                  <p className="text-sm font-semibold text-gray-400 mb-2">
                    {fact.text}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    — {fact.user?.username ?? "Anonymous"}
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Button
                        key={s}
                        aria-label={`Vote ${s} stars`}
                        className="cursor-pointer text-yellow-400 border border-yellow-600 hover:bg-yellow-600/20 text-sm"
                        variant="outline"
                        onClick={() => handleVote(fact.id, s)}
                      >
                        ⭐ {s}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Why Useless Facts Matter */}
          <section className="bg-zinc-900 p-6 border border-rose-500/10 rounded-lg space-y-2">
            <h3 className="text-lg text-rose-400 font-bold">
              🧠 Why Useless Facts Matter
            </h3>
            <p className="text-gray-400 text-sm">
              They don’t. But that’s the beauty of it. In a world full of
              stress, productivity, and hustle — sometimes all you need is to
              know that octopuses have three hearts and blue blood. You’re
              welcome.
            </p>
          </section>

          {/* Reactions */}
          <section className="text-center mt-10">
            <h3 className="text-lg font-semibold text-yellow-400">
              Possible Side Effects:
            </h3>
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-300">
              <span className="bg-zinc-800 px-4 py-2 rounded-full border border-yellow-600/20">
                "I’ll never get these brain cells back."
              </span>
              <span className="bg-zinc-800 px-4 py-2 rounded-full border border-yellow-600/20">
                "This is the trivia hill I’ll die on."
              </span>
              <span className="bg-zinc-800 px-4 py-2 rounded-full border border-yellow-600/20">
                "I’m texting this to my group chat right now."
              </span>
              <span className="bg-zinc-800 px-4 py-2 rounded-full border border-yellow-600/20">
                "I’ll use this at a party and regret nothing."
              </span>
              <span className="bg-zinc-800 px-4 py-2 rounded-full border border-yellow-600/20">
                "Sudden urge to share with unsuspecting coworkers."
              </span>
              <span className="bg-zinc-800 px-4 py-2 rounded-full border border-yellow-600/20">
                "Uncontrollable laughter at inappropriate times."
              </span>
              <span className="bg-zinc-800 px-4 py-2 rounded-full border border-yellow-600/20">
                "Questioning the purpose of knowledge itself."
              </span>
              <span className="bg-zinc-800 px-4 py-2 rounded-full border border-yellow-600/20">
                "Developing a passion for pointless trivia."
              </span>
              <span className="bg-zinc-800 px-4 py-2 rounded-full border border-yellow-600/20">
                "Risk of becoming the 'fun fact' person in your friend group."
              </span>
            </div>
          </section>

          {/* FAQ as Chat Bubbles */}
          <section className="mt-16 space-y-6">
            <motion.h3
              className="text-2xl font-bold text-cyan-400 text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              🤔 FAQ (Frequently Absurd Questions)
            </motion.h3>

            <div className="flex flex-col items-center space-y-4">
              {[
                {
                  q: "Will these facts improve my life?",
                  a: "Only if you consider impressing strangers with random knowledge a life skill.",
                },
                {
                  q: "Can I submit a fact about my pet rock?",
                  a: "If it’s useless and weird, we want it. Pet rocks included.",
                },
                {
                  q: "How are the top facts decided?",
                  a: "The facts with the highest average star ratings rise to the top of the uselessness leaderboard.",
                },
                {
                  q: "Can I vote more than once?",
                  a: "You can rate as many facts as you like, but each fact can only be rated once per round.",
                },
                {
                  q: "Is there a prize for the weirdest fact?",
                  a: "The only prize is eternal glory in the annals of trivia. And maybe a few laughs.",
                },
                {
                  q: "Can I use these facts at a party?",
                  a: "Absolutely. We recommend it. Just don’t blame us for the reactions.",
                },
              ].map((faq, i) => (
                <div
                  key={faq.q}
                  className="w-full flex flex-col items-center space-y-2"
                >
                  <motion.div
                    className="self-end max-w-lg bg-cyan-900/80 text-cyan-100 rounded-2xl px-5 py-3 shadow-md border border-cyan-400/20"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                  >
                    <span className="font-semibold">Q:</span> {faq.q}
                  </motion.div>
                  <motion.div
                    className="self-start max-w-lg bg-zinc-800 text-gray-200 rounded-2xl px-5 py-3 shadow-md border border-gray-600/20"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * i + 0.1 }}
                  >
                    <span className="font-semibold text-cyan-300">A:</span>{" "}
                    {faq.a}
                  </motion.div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-zinc-900 border border-cyan-500/10 p-6 rounded-lg text-center">
            <p className="text-gray-300 text-lg mb-4">
              Got a fact that no one needs to know?
            </p>
            <Button
              asChild
              className="bg-cyan-500 text-black hover:bg-cyan-400 px-6 py-2 rounded-lg font-semibold"
            >
              <Link href="/submit">Submit Yours</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
