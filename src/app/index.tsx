"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
    } catch (error) {
      console.error("Voting failed:", error);
      alert("Something went wrong while voting. Please try again.");
    }
  };

  const shouldLoop = facts && facts.length > 1;

  return (
    <>
      <main className="w-full max-w-full overflow-x-hidden">
        <div className="w-full mx-auto px-2 sm:px-4 py-6 sm:py-10 space-y-8 sm:space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-3 sm:space-y-4">
            <motion.h2
              className="text-base sm:text-lg md:text-xl font-bold text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Welcome to
            </motion.h2>
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-cyan-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              🥊 Useless Facts Club
            </motion.h1>
            <motion.p
              className="text-gray-400 font-semibold max-w-full sm:max-w-2xl mx-auto text-xs sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Every day, facts and trivia go head-to-head. Rated by your stars.
              Upvote the quirkiest, funniest, or most absurdly unnecessary
              knowledge you’ve never needed.
            </motion.p>
          </section>

          {/* How It Works */}
          <section className="md:mx-16 p-6 bg-zinc-900 border border-cyan-500/10 rounded-lg space-y-1 sm:space-y-2">
            <h3 className="text-sm sm:text-lg text-cyan-400 font-bold">
              🤯 How It Works
            </h3>
            <ul className="list-disc list-inside text-gray-400 text-xs sm:text-sm space-y-1">
              <li>Two random useless facts are shown to you.</li>
              <li>You rate each one from 1 to 5 stars.</li>
              <li>We collect the data and crown the weirdest facts.</li>
              <li>No real purpose. Just vibes and trivia.</li>
            </ul>
          </section>

          {/* Facts Swiper */}
          <Swiper
            modules={[Autoplay]}
            autoplay={{ disableOnInteraction: true }}
            speed={1000}
            loop={shouldLoop}
            grabCursor={true}
            spaceBetween={8}
            className="md:w-full !overflow-hidden gap-4"
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {(isLoading || !facts?.length ? [...Array(2)] : facts).map(
              (fact, i) => (
                <SwiperSlide key={fact?.id ?? i}>
                  <motion.div
                    className="w-full max-w-full sm:max-w-[80%] md:max-w-md mx-auto bg-zinc-800 p-4 sm:p-6 rounded-lg border border-cyan-500/10 flex flex-col justify-between"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isLoading || !fact ? (
                      <p className="text-gray-500 font-semibold text-base sm:text-lg text-center">
                        Loading...
                      </p>
                    ) : (
                      <>
                        <div>
                          <h3 className="text-cyan-300 font-semibold mb-1">
                            🤔 Fact
                          </h3>
                          <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-2 break-words">
                            {fact.text}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 mb-4">
                            — {fact.user?.username ?? "Anonymous"}
                          </p>
                        </div>
                        <div className="flex gap-1 sm:gap-2 flex-wrap">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Button
                              key={s}
                              aria-label={`Vote ${s} stars`}
                              className="text-yellow-400 border border-yellow-600 hover:bg-yellow-600/20 text-xs sm:text-sm"
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
              )
            )}
          </Swiper>

          {/* CTA */}
          <div className="text-center">
            <Button
              asChild
              className="bg-cyan-500 text-black hover:bg-cyan-400 px-4 sm:px-6 py-2 rounded-lg font-semibold"
            >
              <Link href="/all">View All</Link>
            </Button>
          </div>

          {/* Why Useless Facts Matter */}
          <section className="bg-zinc-900 md:mx-16 p-3 sm:p-5 border border-rose-500/10 rounded-lg space-y-1 sm:space-y-2">
            <h3 className="text-sm sm:text-lg text-rose-400 font-bold">
              🧠 Why Useless Facts Matter
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              They don’t. But that’s the beauty of it. In a world full of
              stress, productivity, and hustle — sometimes all you need is to
              know that octopuses have three hearts and blue blood.
            </p>
          </section>

          {/* Reactions */}
          <section className="text-center mt-6 sm:mt-10">
            <h3 className="text-sm sm:text-lg font-semibold text-yellow-400">
              Possible Side Effects:
            </h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-300">
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
                  className="bg-zinc-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-yellow-600/20 break-words max-w-[90%]"
                >
                  {text}
                </span>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-10 sm:mt-16 space-y-4 sm:space-y-6">
            <motion.h3
              className="text-lg sm:text-2xl font-bold text-cyan-400 text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              🤔 FAQ (Frequently Absurd Questions)
            </motion.h3>

            <div className="flex flex-col items-center space-y-6 sm:space-y-8 w-full md:px-16">
              {[
                {
                  q: "Will these facts improve my life?",
                  a: "Only if you consider impressing strangers a life skill.",
                },
                {
                  q: "Can I submit a fact about my pet rock?",
                  a: "If it's useless and weird, we want it.",
                },
                {
                  q: "How are top facts decided?",
                  a: "By average star rating. Crowning peak uselessness.",
                },
                {
                  q: "Can I vote more than once?",
                  a: "Yes, but only once per fact per round.",
                },
                {
                  q: "Is there a prize for the weirdest fact?",
                  a: "Just glory. And maybe a few giggles.",
                },
                {
                  q: "Can I use these facts at a party?",
                  a: "Absolutely. But reactions may vary.",
                },
              ].map((faq, i) => (
                <div key={faq.q} className="w-full flex flex-col space-y-2">
                  {/* Question bubble */}
                  <motion.div
                    className="self-end w-auto md:max-w-[85%] max-w-[70%] break-words 
                   bg-gradient-to-r from-cyan-700 to-cyan-500 text-white 
                   rounded-2xl px-3 sm:px-4 md:px-5 py-2 sm:py-3 
                   shadow-lg text-sm sm:text-base md:text-lg"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                  >
                    <span className="font-semibold">Q:</span> {faq.q}
                  </motion.div>

                  {/* Answer bubble */}
                  <motion.div
                    className="self-start w-auto md:max-w-[85%] max-w-[70%] break-words 
                   bg-zinc-800 text-gray-200 rounded-2xl px-3 sm:px-4 md:px-5 
                   py-2 sm:py-3 shadow-lg border border-zinc-700/40 
                   text-sm sm:text-base md:text-lg"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * i + 0.1 }}
                  >
                    <span className="text-cyan-300 font-semibold">A:</span>{" "}
                    {faq.a}
                  </motion.div>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-zinc-900 border border-cyan-500/10 p-4 sm:p-6 rounded-lg text-center">
            <p className="text-gray-300 text-sm sm:text-lg mb-2 sm:mb-4">
              Got a fact that no one needs to know?
            </p>
            <Button
              asChild
              className="bg-cyan-500 text-black hover:bg-cyan-400 px-4 sm:px-6 py-2 rounded-lg font-semibold"
            >
              <Link href="/submit">Submit Yours</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
