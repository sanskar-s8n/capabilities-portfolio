"use client";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { archetypes } from "@/lib/constants";
import { ArrowRight, Check, Copy, Search, ShoppingCart } from "lucide-react";

export default function PlaygroundDetail() {
  const { id } = useParams<{ id: string }>();
  const a = archetypes.find((x) => x.id === id);
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const data = useMemo(() => ["Starter Listing", "Premium Service", "Enterprise Plan", "Local Package"].filter(x => x.toLowerCase().includes(query.toLowerCase())), [query]);

  if (!a) return <div className="container-page py-20">Demo not found.</div>;

  const code = `// ${a.title} proof widget
const result = await fetch("/api/${id}");
return result;`;

  async function copy() {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="container-page py-16">
      <div className="pill">LIVE PROOF</div>
      <h1 className="text-5xl font-black mt-4">{a.title}</h1>
      <p className="text-neutral-600 mt-3 max-w-2xl">{a.description}</p>

      <div className="grid lg:grid-cols-2 gap-6 mt-10">
        <div className="card p-6">
          <div className="flex justify-between items-center">
            <h2 className="font-black">Live widget</h2>
            <span className="text-xs text-emerald-700 font-bold flex gap-1 items-center"><Check size={14}/> functional</span>
          </div>

          {id === "ecommerce" ? (
            <div className="mt-6">
              <div className="grid grid-cols-2 gap-3">
                {["Starter Kit", "Pro Kit", "Growth Pack", "Enterprise"].map((p, i) => (
                  <button key={p} onClick={() => setCount(count + 1)} className="border rounded-xl p-4 text-left hover:bg-neutral-50">
                    <div className="font-bold">{p}</div><div className="text-sm text-neutral-500 mt-1">${(49 + i*50).toFixed(2)}</div>
                    <div className="text-xs font-bold mt-4">Add to cart +</div>
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-neutral-100 p-4 flex justify-between">
                <span className="flex gap-2 items-center"><ShoppingCart size={17}/> Cart items</span><b>{count}</b>
              </div>
            </div>
          ) : id === "listing" ? (
            <div className="mt-6">
              <div className="relative"><Search className="absolute left-3 top-3.5 text-neutral-400" size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search listings..." className="w-full border rounded-xl py-3 pl-10 pr-3"/></div>
              <div className="mt-4 space-y-2">{data.map(x=><div key={x} className="border rounded-xl p-4 flex justify-between"><span>{x}</span><span className="text-xs pill">active</span></div>)}</div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-neutral-950 text-white p-7">
              <div className="text-xs uppercase tracking-widest text-neutral-400">Demo mode</div>
              <div className="text-2xl font-black mt-3">{id === "booking" ? "Availability & conflict detection" : id === "saas" ? "Role-based metrics" : "CMS editor + preview"}</div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="bg-white/10 rounded-lg p-3 text-sm">Input</div><div className="bg-white/10 rounded-lg p-3 text-sm">API</div><div className="bg-white/10 rounded-lg p-3 text-sm">Result</div>
              </div>
              <div className="mt-5 text-neutral-400 text-sm">This local demo is credential-free. Production integrations are enabled through environment variables.</div>
            </div>
          )}
        </div>

        <div className="card overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="font-black">Code</h2>
            <button onClick={copy} className="text-sm font-bold flex gap-2 items-center">{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? "Copied" : "Copy"}</button>
          </div>
          <pre className="p-5 bg-neutral-950 text-neutral-200 text-sm overflow-auto min-h-64"><code>{code}</code></pre>
          <div className="p-5 border-t text-sm text-neutral-500 flex gap-2 items-center"><ArrowRight size={15}/> Architecture: UI → Next.js API → data/integration layer</div>
        </div>
      </div>
    </div>
  );
}
