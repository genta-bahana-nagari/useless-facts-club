"use client";
import "./globals.css";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="flex flex-col min-h-screen px-6 bg-black text-white text-center z-15">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <h1 className="text-6xl sm:text-7xl font-extrabold text-yellow-400">
            404
          </h1>

          <p className="text-md md:text-xl text-white/80 max-w-xl">
            Oops! The page you are looking for does not exist.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/"
                className="px-6 py-3 rounded-full text-sm font-semibold bg-white text-black hover:bg-yellow-500 transition"
              >
                Go Back Home
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}