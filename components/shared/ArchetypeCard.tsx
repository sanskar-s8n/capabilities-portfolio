"use client";
import Link from "next/link";
import { ArrowUpRight, BarChart3, CalendarDays, FileText, MapPin, ShoppingBag } from "lucide-react";
import type { Archetype } from "@/lib/constants";

const icons = { ShoppingBag, MapPin, FileText, BarChart3, CalendarDays };

export function ArchetypeCard({ id, title, icon, description, color }: Archetype) {
  const Icon = icons[icon as keyof typeof icons] ?? FileText;
  return (
    <Link href={`/archetypes/${id}`} className="group card p-6 hover:-translate-y-1 transition-transform">
      <div className="flex justify-between items-start">
        <div className="h-11 w-11 rounded-xl bg-neutral-100 flex items-center justify-center">
          <Icon size={21}/>
        </div>
        <ArrowUpRight className="text-neutral-400 group-hover:text-black transition-colors" size={20}/>
      </div>
      <div className="mt-12 text-xs font-bold uppercase tracking-widest text-neutral-400">{color}</div>
      <h3 className="text-2xl font-black mt-2">{title}</h3>
      <p className="text-neutral-600 mt-2 leading-6">{description}</p>
      <div className="mt-5 text-sm font-bold">View skill matrix →</div>
    </Link>
  );
}
