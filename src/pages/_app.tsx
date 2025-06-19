import { AppType } from "next/app";
import { trpc } from "@/utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="bg-black text-white min-h-screen flex flex-col font-sans">
          {/* Header */}
          <header className="bg-zinc-900 border-b border-cyan-500/10">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-cyan-400">
                🥊 UFFC
              </Link>
              <ul className="flex gap-6 text-sm text-gray-300">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/all" className="hover:text-white">All Facts</Link></li>
                <li><Link href="/leaderboard" className="hover:text-white">Leaderboard</Link></li>
                <li><Link href="/submit" className="hover:text-white">Submit</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
              </ul>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1 px-4 py-10 max-w-6xl mx-auto">
            <Component {...pageProps} />
          </main>

          {/* Footer */}
          <footer className="bg-zinc-900 border-t border-cyan-500/10 text-center text-sm py-4 text-gray-400">
            © {new Date().getFullYear()} Useless Facts Fight Club. Built with 🧠 + ☕
          </footer>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default MyApp;
