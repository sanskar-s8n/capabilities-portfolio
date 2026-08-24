"use client";
import Link from "next/link";

export function SkillMatrix({ archetypeId, skills }: { archetypeId: string; skills: any }) {
  const cols = ["frontend", "backend", "database", "security"] as const;
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cols.map((col) => (
        <div key={col} className="card p-5">
          <div className="text-xs uppercase tracking-widest font-bold text-neutral-400">{col}</div>
          <div className="mt-5 space-y-4">
            {skills[col].map((s: any) => (
              <div key={s.name} className="border-t border-neutral-100 pt-4">
                <div className="font-bold">{s.name}</div>
                <div className="text-sm font-semibold mt-1">{s.feature}</div>
                <p className="text-sm text-neutral-500 mt-1 leading-5">{s.description}</p>
                {s.hasDemo && <Link className="inline-block mt-3 text-xs font-bold underline" href={`/playground/${archetypeId}-${col}`}>Test demo</Link>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
