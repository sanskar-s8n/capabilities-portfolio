import Link from "next/link";
import { ArrowRight, CheckCircle2, Database, Server, ShieldCheck, Workflow } from "lucide-react";

const items = [
  ["Project foundation", "Next.js 15 App Router, React 19, Tailwind CSS v4 and shared application layout."],
  ["Database layer", "PostgreSQL on Neon with Prisma models for products, orders, bookings and contact leads."],
  ["Booking workflow", "Booking creation, cancellation and unique slot protection to prevent duplicate reservations."],
  ["Backend foundations", "Persistent API routes for bookings, contact leads and dashboard metrics."],
  ["Build verification", "Production build completed successfully with TypeScript checks and static page generation."]
];

export default function PhaseOnePage() {
  return <div>
    <section className="grid-bg border-b border-neutral-200">
      <div className="container-page py-20 md:py-28">
        <div className="pill mb-6">Project progress · Phase 01 / 03</div>
        <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">The foundation</p>
        <h1 className="mt-3 max-w-4xl text-5xl md:text-7xl font-black tracking-tight leading-[.98]">Build the engine.<span className="block text-neutral-500">Make it reliable.</span></h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600">The first stage established the application architecture, database layer and core backend workflows that the rest of the portfolio depends on.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/progress/phase-2" className="rounded-full bg-black px-6 py-3 font-semibold text-white flex items-center gap-2">Next: Commerce <ArrowRight size={17}/></Link>
          <Link href="/progress/phase-3" className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold">View final phase</Link>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl">
          {[["01","Application architecture"],["02","Persistent data layer"],["03","Core API workflows"],["04","Build verification"]].map(([n,l])=><div className="card p-5" key={n}><div className="text-3xl font-black">{n}</div><div className="mt-1 text-sm text-neutral-500">{l}</div></div>)}
        </div>
      </div>
    </section>
    <section className="container-page py-16 md:py-20">
      <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">What was delivered</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-black">Core systems in place</h2>
          <div className="mt-8 space-y-3">{items.map(([title,desc])=><div className="card p-5 flex gap-4" key={title}><CheckCircle2 className="shrink-0 mt-1" size={21}/><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-neutral-600">{desc}</p></div></div>)}</div>
        </div>
        <aside className="card p-7 md:p-8 h-fit">
          <Database size={25}/><h3 className="mt-5 text-2xl font-black">System architecture</h3>
          <p className="mt-2 text-sm leading-6 text-neutral-600">A clear separation between the user interface, API layer, application logic and persistent storage.</p>
          <div className="mt-7 space-y-2 text-sm font-semibold">
            {["Next.js application","API routes + validation","Prisma ORM","PostgreSQL · Neon"].map((x,i)=><div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4" key={x}>{x}{i<3&&<div className="text-neutral-400 mt-1">↓</div>}</div>)}
          </div>
          <div className="mt-6 rounded-xl bg-neutral-100 p-4 text-sm"><span className="font-bold">Verification note:</span> The build passed. Neon connectivity is currently being re-checked after a later P1001 connection failure.</div>
        </aside>
      </div>
    </section>
    <section className="container-page pb-20"><div className="card bg-black text-white p-7 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"><div><p className="text-xs uppercase tracking-widest text-neutral-400">Phase 01 outcome</p><h2 className="mt-2 text-2xl md:text-3xl font-black">A working foundation for real features.</h2><p className="mt-2 text-neutral-400">The project is ready for commerce and user-facing workflows.</p></div><Link href="/progress/phase-2" className="rounded-full bg-white text-black px-5 py-3 font-semibold inline-flex items-center gap-2">Continue <ArrowRight size={16}/></Link></div></section>
  </div>;
}