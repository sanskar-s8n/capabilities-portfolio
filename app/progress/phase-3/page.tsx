import Link from "next/link";
import { ArrowLeft, CheckCircle2, CircleDashed, CreditCard, ShieldCheck, AlertTriangle } from "lucide-react";

const done = [
  ["Stripe checkout-session creation", "When Stripe is configured, the server creates a hosted checkout session using trusted database prices."],
  ["Webhook signature verification", "The webhook endpoint verifies incoming Stripe signatures before processing events."],
  ["Payment-state handling", "Successful payment events can transition matching pending orders to PAID; expired sessions can cancel pending orders and restore inventory."],
  ["Failure compensation", "Checkout includes recovery logic to cancel pending orders and restore inventory if Stripe session creation or persistence fails."]
];
const pending = [
  ["Neon connection stability", "A Prisma P1001 connection failure is currently blocking repeatable live database verification."],
  ["Stripe test-mode verification", "Complete a real Stripe test checkout and confirm signed webhook delivery and order-state changes."],
  ["End-to-end regression", "Re-run product, booking, contact, dashboard and checkout tests after database connectivity is stable."],
  ["Production sign-off", "Verify environment variables, deployment logs and production behaviour before calling the project production-ready."]
];

export default function PhaseThreePage() {
  return <div>
    <section className="grid-bg border-b border-neutral-200">
      <div className="container-page py-20 md:py-28">
        <div className="pill mb-6">Project progress · Phase 03 / 03</div>
        <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">Payments, testing & deployment</p>
        <h1 className="mt-3 max-w-4xl text-5xl md:text-7xl font-black tracking-tight leading-[.98]">Make it dependable.<span className="block text-neutral-500">Prove it end to end.</span></h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600">The final stage hardens payment handling and validates the full application. Core implementation exists, but live payment and database verification still need to be completed.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/progress/phase-2" className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold flex items-center gap-2"><ArrowLeft size={17}/> Previous phase</Link>
          <Link href="/" className="rounded-full bg-black px-6 py-3 font-semibold text-white">Back to portfolio</Link>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl">
          {[["01","Stripe integration"],["02","Webhook event paths"],["01","Compensation flow"],["04","Verification tasks open"]].map(([n,l])=><div className="card p-5" key={l}><div className="text-3xl font-black">{n}</div><div className="mt-1 text-sm text-neutral-500">{l}</div></div>)}
        </div>
      </div>
    </section>
    <section className="container-page py-16 md:py-20">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2"><ShieldCheck size={20}/><p className="text-sm font-bold uppercase tracking-widest text-neutral-500">Implemented</p></div>
          <h2 className="mt-2 text-3xl font-black">Payment safeguards</h2>
          <div className="mt-7 space-y-3">{done.map(([title,desc])=><div className="card p-5 flex gap-4" key={title}><CheckCircle2 className="shrink-0 mt-1" size={21}/><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-neutral-600">{desc}</p></div></div>)}</div>
        </div>
        <div>
          <div className="flex items-center gap-2"><CircleDashed size={20}/><p className="text-sm font-bold uppercase tracking-widest text-neutral-500">Still to verify</p></div>
          <h2 className="mt-2 text-3xl font-black">Final validation checklist</h2>
          <div className="mt-7 space-y-3">{pending.map(([title,desc])=><div className="card p-5 flex gap-4" key={title}><TriangleAlert className="shrink-0 mt-1 text-amber-700" size={21}/><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-neutral-600">{desc}</p></div></div>)}</div>
        </div>
      </div>
    </section>
    <section className="container-page pb-20"><div className="card p-7 md:p-10"><div className="flex items-center gap-3"><CreditCard size={24}/><p className="text-sm font-bold uppercase tracking-widest text-neutral-500">Definition of done</p></div><h2 className="mt-3 text-3xl font-black">A successful build is not the same as a verified production system.</h2><p className="mt-4 max-w-3xl text-neutral-600 leading-7">The project reaches final sign-off only when the database is reachable, critical workflows pass end-to-end tests, Stripe test payments produce verified webhook updates, and the deployed application behaves correctly with production environment settings.</p><div className="mt-7 rounded-xl bg-neutral-100 p-5 text-sm leading-6"><strong>Current honest status:</strong> Core features are implemented and a production build has passed. Final runtime and payment verification remain open.</div><div className="mt-7"><Link href="/progress/phase-1" className="font-semibold underline underline-offset-4">Review the project from the beginning</Link></div></div></section>
  </div>;
}