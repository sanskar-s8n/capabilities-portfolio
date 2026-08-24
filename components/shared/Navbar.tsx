import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="container-page h-16 flex items-center justify-between">
        <Link href="/" className="font-black tracking-tight">CAPABILITIES<span className="text-neutral-400">.</span></Link>
        <nav className="flex gap-5 text-sm font-semibold">
          <Link href="/#archetypes" className="hover:text-neutral-500">Archetypes</Link>
          <Link href="/playground" className="hover:text-neutral-500">Playground</Link>
          <Link href="/contact" className="hover:text-neutral-500">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
