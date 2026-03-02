"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-zinc-900 border-b border-cyan-500/10">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-cyan-400">
          UFC
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="text-gray-300 hover:text-white"
          >
            ☰
          </button>
        </div>

        <ul className="hidden md:flex gap-6 text-sm text-gray-300">
          <NavLinks />
        </ul>
      </nav>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-2 text-sm text-gray-300">
            <NavLinks close={() => setMenuOpen(false)} />
          </ul>
        </div>
      )}
    </header>
  );
}

function NavLinks({ close }: { close?: () => void }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/all", label: "All Facts" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/submit", label: "Submit" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={close}
            className="hover:text-white block py-2"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
}