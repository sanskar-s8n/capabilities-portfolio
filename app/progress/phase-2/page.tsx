import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, CreditCard, Package, ShoppingCart } from "lucide-react";

const items = [
  ["Database-backed catalogue", "The products API reads available products from PostgreSQL and filters out items with no inventory."],
  ["Seed data", "An idempotent Prisma seed creates Starter Kit, Pro Kit and Growth Pack records."],
  ["Inventory-aware cart", "The playground fetches real product data, displays price and stock, and supports cart quantities."],
  ["Server-side checkout", "Checkout validates product IDs and quantities, calculates prices from the database and checks stock."],
  ["Order persistence", "A database transaction decrements inventory and creates a pending order with its order items."]
];

export default function PhaseTwoPage() {
  return <div>
    <section className="grid-bg border-b border-neutral-200">
      <div className="container-page py-20 md:py-28">
        <div className="pill mb-6">Project progress · Phase 02 / 03</div>
        <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">Commerce & integration</p>
        <h1 className="mt-3 max-w-4xl text-5xl md:text-7xl font-black tracking-tight leading-[.98]">Turn features into<span className="block text-neutral-500">real workflows.</span></h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600">The second stage connected the playground interface to live product records and built a server-controlled checkout flow with inventory and order persistence.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/progress/phase-1" className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold flex items-center gap-2"><ArrowLeft size={17}/> Previous phase</Link>
          <Link href="/progress/phase-3" className="rounded-full bg-black px-6 py-3 font-semibold text-white flex items-center gap-2">Next: Verification <ArrowRight size={17}/></Link>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl">
          {[["03","Seeded products"],["01","Live catalogue API"],["01","Checkout pipeline"],["DB","Persistent orders"]].map(([n,l])=><div className="card p-5" key={l}><div className="text-3xl font-black">{n}</div><div className="mt-1 text-sm text-neutral-500">{l}</div></div>)}
        </div>
      </div>
    </section>
    <section className="container-page py-16 md:py-20">
      <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">What was delivered</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-black">A connected commerce experience</h2>
          <div className="mt-8 space-y-3">{items.map(([title,desc])=><div className="card p-5 flex gap-4" key={title}><CheckCircle2 className="shrink-0 mt-1" size={21}/><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-neutral-600">{desc}</p></div></div>)}</div>
        </div>
        <aside className="card p-7 md:p-8 h-fit">
          <ShoppingCart size={25}/><h3 className="mt-5 text-2xl font-black">Commerce flow</h3>
          <p className="mt-2 text-sm leading-6 text-neutral-600">The client selects products, but the server remains responsible for pricing, stock validation and order creation.</p>
          <div className="mt-7 space-y-2 text-sm font-semibold">
            {["Playground product catalogue","Cart + quantity selection","Checkout API validation","Inventory transaction","Pending order + order items"].map((x,i)=><div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4" key={x}>{x}{i<4&&<div className="text-neutral-400 mt-1">↓</div>}</div>)}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-neutral-100 p-4"><Package size={19}/><p className="mt-2 text-xs text-neutral-500">Inventory</p><p className="font-bold">Database-backed</p></div><div className="rounded-xl bg-neutral-100 p-4"><CreditCard size={19}/><p className="mt-2 text-xs text-neutral-500">Checkout</p><p className="font-bold">Demo / Stripe</p></div></div>
          <p className="mt-5 text-xs leading-5 text-neutral-500">A demo checkout was tested: an order was created and inventory decreased. Demo mode does not collect payment.</p>
        </aside>
      </div>
    </section>
    <section className="container-page pb-20"><div className="card bg-black text-white p-7 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"><div><p className="text-xs uppercase tracking-widest text-neutral-400">Phase 02 outcome</p><h2 className="mt-2 text-2xl md:text-3xl font-black">The interface now talks to real application data.</h2><p className="mt-2 text-neutral-400">Next: payment lifecycle, reliability and final verification.</p></div><Link href="/progress/phase-3" className="rounded-full bg-white text-black px-5 py-3 font-semibold inline-flex items-center gap-2">Continue <ArrowRight size={16}/></Link></div></section>
  </div>;
}