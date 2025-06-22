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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="bg-black text-white min-h-screen flex flex-col font-sans">
          {/* Header */}
          <header className="bg-zinc-900 border-b border-cyan-500/10">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-cyan-400">
                🥊 UFC
              </Link>
              {/* Hamburger menu button for mobile */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="text-gray-300 hover:text-white focus:outline-none"
                  aria-label="Open menu"
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              {/* Desktop nav */}
              <ul className="hidden md:flex gap-6 text-sm text-gray-300">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/all" className="hover:text-white">
                    All Facts
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="hover:text-white">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="hover:text-white">
                    Submit
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
            {/* Mobile menu */}
            {menuOpen && (
              <div className="md:hidden px-4 pb-4">
                <ul className="flex flex-col gap-2 text-sm text-gray-300 bg-zinc-900 rounded shadow">
                  <li>
                    <Link href="/" className="block py-2 px-2 hover:text-white text-center" onClick={() => setMenuOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/all" className="block py-2 px-2 hover:text-white text-center" onClick={() => setMenuOpen(false)}>
                      All Facts
                    </Link>
                  </li>
                  <li>
                    <Link href="/leaderboard" className="block py-2 px-2 hover:text-white text-center" onClick={() => setMenuOpen(false)}>
                      Leaderboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/submit" className="block py-2 px-2 hover:text-white text-center" onClick={() => setMenuOpen(false)}>
                      Submit
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="block py-2 px-2 hover:text-white text-center" onClick={() => setMenuOpen(false)}>
                      About
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </header>

          {/* Main Content */}
          <main className="flex-1 px-4 py-10 max-w-6xl mx-auto">
            <Component {...pageProps} />
          </main>

          {/* Footer */}
          <footer className="bg-zinc-900 border-t border-cyan-500/10 text-center text-sm py-4 text-gray-400">
            © {new Date().getFullYear()} Useless Facts Club. Built with 🧠 + ☕
          </footer>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default MyApp;
