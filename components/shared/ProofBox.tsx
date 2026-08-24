import Link from "next/link";

export function ProofBox({ title, description, demoUrl }: { title: string; description: string; demoUrl: string }) {
  return (
    <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-5">
      <div className="text-xs font-black tracking-widest text-amber-800">● LIVE PROOF OF CONCEPT</div>
      <h3 className="font-black text-lg mt-2">{title}</h3>
      <p className="text-sm text-amber-950/70 mt-1">{description}</p>
      <Link href={demoUrl} className="inline-block mt-4 text-sm font-bold underline">Open proof →</Link>
    </div>
  );
}
