import Link from "next/link";
import { ArrowRight, Code2, Database, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { archetypes } from "@/lib/constants";
import { ArchetypeCard } from "@/components/shared/ArchetypeCard";
import { ContactCTA } from "@/components/shared/ContactCTA";

export default function Home() {
  return (
    <>
      <section className="grid-bg border-b border-neutral-200">
        <div className="container-page py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="pill mb-6">Capabilities Portfolio · Interactive Proof</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[.95]">
              Don&apos;t just list skills.
              <span className="block text-neutral-500">Prove what you can build.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg md:text-xl text-neutral-600 leading-8">
              A client-centric portfolio built around real website archetypes:
              commerce, listings, content, SaaS dashboards, and booking systems.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#archetypes" className="rounded-full bg-black text-white px-6 py-3 font-semibold flex items-center gap-2">
                Explore Capabilities <ArrowRight size={17} />
              </Link>
              <Link href="/playground" className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold">
                Open Proof Playground
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16 max-w-4xl">
            {[
              ["5", "Website archetypes"],
              ["4", "Skill layers"],
              ["15+", "Interactive proofs"],
              ["95+", "Lighthouse target"]
            ].map(([n, l]) => (
              <div key={l} className="card p-5">
                <div className="text-3xl font-black">{n}</div>
                <div className="text-sm text-neutral-500 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="archetypes" className="container-page py-20">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-neutral-500">The portfolio</div>
            <h2 className="text-4xl font-black mt-2">Five real-world builds</h2>
          </div>
          <div className="hidden md:flex gap-2 text-neutral-500 text-sm items-center">
            <Layers3 size={16}/> frontend · backend · data · security
          </div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {archetypes.map((a) => <ArchetypeCard key={a.id} {...a} />)}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="card p-7 md:p-10 bg-black text-white">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div>
              <Code2 className="mb-4" />
              <h3 className="text-2xl font-black">Interactive proof engine</h3>
              <p className="text-neutral-400 mt-2">Let evaluators click, test, inspect code and understand the architecture.</p>
            </div>
            <div>
              <Database className="mb-4" />
              <h3 className="text-2xl font-black">Production-minded stack</h3>
              <p className="text-neutral-400 mt-2">Next.js, PostgreSQL, MongoDB, Redis, Stripe and deployment-ready APIs.</p>
            </div>
            <div>
              <ShieldCheck className="mb-4" />
              <h3 className="text-2xl font-black">Security as proof</h3>
              <p className="text-neutral-400 mt-2">Validation, rate limiting, protected routes and payment webhook verification.</p>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
