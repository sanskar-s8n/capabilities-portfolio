import { notFound } from "next/navigation";
import Link from "next/link";
import { archetypes } from "@/lib/constants";
import { SkillMatrix } from "@/components/shared/SkillMatrix";
import { ProofBox } from "@/components/shared/ProofBox";

export function generateStaticParams() {
  return archetypes.map((a) => ({ id: a.id }));
}

export default async function ArchetypePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = archetypes.find((x) => x.id === id);
  if (!a) notFound();

  return (
    <div className="container-page py-16">
      <Link href="/#archetypes" className="text-sm font-bold underline">← All archetypes</Link>
      <div className="max-w-4xl mt-8">
        <div className="pill">{a.id}</div>
        <h1 className="text-5xl font-black tracking-tight mt-4">{a.title}</h1>
        <p className="text-xl text-neutral-600 mt-4 max-w-2xl">{a.businessNeed}</p>
      </div>
      <div className="mt-10">
        <SkillMatrix archetypeId={a.id} skills={a.skills} />
      </div>
      <div className="mt-8">
        <ProofBox title={`Test the ${a.title} proof`} description="Open the interactive playground and test the core behavior without needing production credentials." demoUrl={`/playground/${a.id}`} />
      </div>
    </div>
  );
}
