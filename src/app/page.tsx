"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const { data: facts, refetch, isLoading } = trpc.fact.getAllFacts.useQuery();
  const vote = trpc.fact.vote.useMutation();

  const handleVote = async (id: string, stars: number) => {
    try {
      await vote.mutateAsync({ id, stars });
      refetch();
    } catch {
      alert("Something went wrong while voting. Please try again.");
    }
  };

  const shouldLoop = facts && facts.length > 1;

  return (
    <main className="bg-black min-h-screen w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        <section className="text-center space-y-3 sm:space-y-4">
          <motion.h2
            className="text-lg md:text-xl font-semibold text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to
          </motion.h2>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            🥊 Useless Facts Club
          </motion.h1>
          <motion.p
            className="text-gray-400 font-medium max-w-2xl mx-auto text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Every day, facts and trivia go head-to-head. Upvote the quirkiest, funniest, or most absurdly unnecessary knowledge you’ve never needed.
          </motion.p>
        </section>

        <section className="p-6 bg-zinc-900 border border-cyan-500/20 rounded-xl space-y-2 md:mx-16">
          <h3 className="text-cyan-400 font-bold text-lg">🤯 How It Works</h3>
          <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
            <li>Two random useless facts are shown to you.</li>
            <li>You rate each one from 1 to 5 stars.</li>
            <li>We collect the data and crown the weirdest facts.</li>
            <li>No real purpose. Just vibes and trivia.</li>
          </ul>
        </section>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ disableOnInteraction: true }}
          speed={1000}
          loop={shouldLoop}
          grabCursor
          spaceBetween={16}
          className="md:w-full"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {(isLoading || !facts?.length ? [...Array(2)] : facts).map((fact, i) => (
            <SwiperSlide key={fact?.id ?? i}>
              <motion.div
                className="bg-zinc-800 p-5 rounded-xl border border-cyan-500/20 flex flex-col justify-between shadow-lg hover:shadow-cyan-500/20 transition-all"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isLoading || !fact ? (
                  <p className="text-gray-500 font-semibold text-center text-base">Loading...</p>
                ) : (
                  <>
                    <div className="mb-4">
                      <h3 className="text-cyan-300 font-semibold mb-2">🤔 Fact</h3>
                      <p className="text-gray-400 font-medium text-sm mb-2 break-words">{fact.text}</p>
                      <p className="text-gray-500 text-xs">— {fact.user?.username ?? "Anonymous"}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Button
                          key={s}
                          aria-label={`Vote ${s} stars`}
                          className="text-yellow-400 border border-yellow-600 hover:bg-yellow-600/20 text-sm"
                          variant="outline"
                          onClick={() => handleVote(fact.id, s)}
                        >
                          ⭐ {s}
                        </Button>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center">
          <Button asChild className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2 rounded-lg font-semibold">
            <Link href="/all">View All Facts</Link>
          </Button>
        </div>

        <section className="bg-zinc-900 border border-rose-500/20 rounded-xl p-5 md:mx-16 space-y-2">
          <h3 className="text-rose-400 font-bold text-lg">🧠 Why Useless Facts Matter</h3>
          <p className="text-gray-400 text-sm">They don’t. But sometimes all you need is to know that octopuses have three hearts and blue blood.</p>
        </section>

        <section className="text-center space-y-4">
          <h3 className="text-yellow-400 font-semibold text-lg">Possible Side Effects:</h3>
          <div className="flex flex-wrap justify-center gap-2 text-gray-300 text-sm">
            {[
              "I'll never get these brain cells back.",
              "This is the trivia hill I'll die on.",
              "Texting this to my group chat now.",
              "I'll use this at a party and regret nothing.",
              "Sharing with unsuspecting coworkers.",
              "Uncontrollable laughter at odd times.",
              "Questioning the purpose of knowledge.",
              "Developing a trivia addiction.",
              "Risk: becoming the 'fun fact' person.",
            ].map((text, i) => (
              <span
                key={i}
                className="bg-zinc-800 px-4 py-1 rounded-full border border-yellow-600/20 max-w-[90%]"
              >
                {text}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-6 md:mx-16">
          <motion.h3
            className="text-cyan-400 font-bold text-2xl text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            🤔 FAQ
          </motion.h3>
          <div className="flex flex-col items-center space-y-6 w-full">
            {[
              { q: "Will these facts improve my life?", a: "Only if you consider impressing strangers a life skill." },
              { q: "Can I submit a fact about my pet rock?", a: "If it's useless and weird, we want it." },
              { q: "How are top facts decided?", a: "By average star rating. Crowning peak uselessness." },
              { q: "Can I vote more than once?", a: "Yes, but only once per fact per round." },
              { q: "Is there a prize for the weirdest fact?", a: "Just glory. And maybe a few giggles." },
              { q: "Can I use these facts at a party?", a: "Absolutely. But reactions may vary." },
            ].map((faq, i) => (
              <div key={faq.q} className="w-full flex flex-col space-y-2">
                <motion.div
                  className="self-end bg-cyan-700 text-white rounded-2xl px-4 py-2 shadow-lg max-w-[70%]"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <span className="font-semibold">Q:</span> {faq.q}
                </motion.div>
                <motion.div
                  className="self-start bg-zinc-800 text-gray-200 rounded-2xl px-4 py-2 shadow-lg border border-zinc-700/30 max-w-[70%]"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.1 }}
                >
                  <span className="text-cyan-300 font-semibold">A:</span> {faq.a}
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-zinc-900 border border-cyan-500/20 p-6 rounded-xl text-center">
          <p className="text-gray-300 text-sm mb-4">Got a fact that no one needs to know?</p>
          <Button asChild className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2 rounded-lg font-semibold">
            <Link href="/submit">Submit Yours</Link>
          </Button>
        </div>

      </div>
    </main>
  );
}