import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDashed, Code2, Database, Layers3, ShieldCheck, ShoppingBag, Workflow } from "lucide-react";

type ProgressItem = { title: string; description: string; status: "complete" | "pending" };
type ProgressPageProps = {
  phase: string;
  eyebrow: string;
  headline: string;
  mutedHeadline: string;
  intro: string;
  stats: [string, string][];
  sectionEyebrow: string;
  sectionTitle: string;
  items: ProgressItem[];
  panelTitle: string;
  panelDescription: string;
  flow: string[];
  note: string;
  previous?: string;
  next?: string;
  nextLabel?: string;
};

export function ProgressPage(props: ProgressPageProps) {
  return (
    <>
      <section className="grid-bg border-b border-neutral-200">
        <div className="container-page py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="pill mb-6">Capabilities Portfolio · Project Progress · {props.phase}</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[.95]">
              {props.headline}
              <span className="block text-neutral-500">{props.mutedHeadline}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg md:text-xl text-neutral-600 leading-8">{props.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              {props.previous && <Link href={props.previous} className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold">Previous phase</Link>}
              {props.next && <Link href={props.next} className="rounded-full bg-black text-white px-6 py-3 font-semibold flex items-center gap-2">{props.nextLabel ?? "Next phase"} <ArrowRight size={17}/></Link>}
              {!props.next && <Link href="/" className="rounded-full bg-black text-white px-6 py-3 font-semibold flex items-center gap-2">Back to portfolio <ArrowRight size={17}/></Link>}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16 max-w-4xl">
            {props.stats.map(([n,l]) => <div key={l} className="card p-5"><div className="text-3xl font-black">{n}</div><div className="text-sm text-neutral-500 mt-1">{l}</div></div>)}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-neutral-500">{props.sectionEyebrow}</div>
            <h2 className="text-4xl font-black mt-2">{props.sectionTitle}</h2>
          </div>
          <div className="hidden md:flex gap-2 text-neutral-500 text-sm items-center"><Layers3 size={16}/> frontend · backend · data · security</div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {props.items.map((item) => <article key={item.title} className="group card p-6">
            <div className="flex justify-between items-start">
              <div className="h-11 w-11 rounded-xl bg-neutral-100 flex items-center justify-center">{item.status === "complete" ? <CheckCircle2 size={21}/> : <CircleDashed size={21}/>}</div>
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">{item.status === "complete" ? "Completed" : "To verify"}</span>
            </div>
            <div className="mt-12 text-xs font-bold uppercase tracking-widest text-neutral-400">{props.eyebrow}</div>
            <h3 className="text-2xl font-black mt-2">{item.title}</h3>
            <p className="text-neutral-600 mt-2 leading-6">{item.description}</p>
          </article>)}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="card p-7 md:p-10 bg-black text-white">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div><Code2 className="mb-4"/><h3 className="text-2xl font-black">{props.panelTitle}</h3><p className="text-neutral-400 mt-2">{props.panelDescription}</p></div>
            <div><Database className="mb-4"/><h3 className="text-2xl font-black">Implementation flow</h3><div className="mt-3 space-y-2 text-sm text-neutral-300">{props.flow.map((step,i)=><div key={step}>{i+1}. {step}</div>)}</div></div>
            <div><ShieldCheck className="mb-4"/><h3 className="text-2xl font-black">Honest status</h3><p className="text-neutral-400 mt-2">{props.note}</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
