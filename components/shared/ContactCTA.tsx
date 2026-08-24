import Link from "next/link";

export function ContactCTA() {
  return (
    <section className="container-page pb-20">
      <div className="card p-8 md:p-12">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-widest font-bold text-neutral-400">Next step</div>
          <h2 className="text-3xl md:text-4xl font-black mt-2">Have a real problem to solve?</h2>
          <p className="text-neutral-600 mt-3 leading-7">Turn one of these proof-of-concepts into a client-ready solution.</p>
          <Link href="/contact" className="inline-block mt-6 rounded-full bg-black text-white px-6 py-3 font-bold">Request Proposal</Link>
        </div>
      </div>
    </section>
  );
}
