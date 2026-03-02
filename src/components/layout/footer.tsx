export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-cyan-500/10 text-center text-sm py-4 text-gray-400">
      © {new Date().getFullYear()} Useless Facts Club. Built with the power of facts!
    </footer>
  );
}