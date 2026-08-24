import Link from "next/link";
import { archetypes } from "@/lib/constants";

export default function Playground() {
  return (
    <div className="container-page py-16">
      <div className="max-w-3xl">
        <div className="pill">Interactive Proof Engine</div>
        <h1 className="text-5xl font-black mt-5">Playground</h1>
        <p className="text-lg text-neutral-600 mt-4">Test the portfolio&apos;s core proof widgets. Each demo is designed to be understandable to a client or evaluator.</p>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
        {archetypes.map((a) => (
          <Link key={a.id} href={`/playground/${a.id}`} className="card p-6 hover:-translate-y-1 transition-transform">
            <div className="font-black text-xl">{a.title}</div>
            <div className="text-sm text-neutral-500 mt-2">{a.description}</div>
            <div className="mt-5 font-bold text-sm">Launch widget →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
