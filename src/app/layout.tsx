// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Providers from "./providers";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Useless Facts Club",
  description: "Rate the weirdest useless facts on the internet.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col font-sans">
        <Providers>
          <Navbar />
          <main className="flex-1 px-4 py-10 max-w-6xl mx-auto w-full">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
