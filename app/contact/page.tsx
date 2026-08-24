"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending...");
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form.entries());
    const res = await fetch("/api/contact", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(body) });
    setStatus(res.ok ? "Thanks — your request was received." : "Something went wrong. Please try again.");
  }
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <div className="pill">Lead Generation</div>
        <h1 className="text-5xl font-black mt-5">Request a proposal</h1>
        <p className="text-neutral-600 mt-4">Describe the solution you need and the relevant capability.</p>
      </div>
      <form onSubmit={submit} className="card p-6 md:p-8 max-w-2xl mt-8 space-y-4">
        <input name="name" required minLength={2} placeholder="Name" className="w-full border rounded-xl p-3"/>
        <input name="email" required type="email" placeholder="Email" className="w-full border rounded-xl p-3"/>
        <input name="company" placeholder="Company (optional)" className="w-full border rounded-xl p-3"/>
        <select name="archetypeInterest" className="w-full border rounded-xl p-3">
          {["ecommerce","listing","content","saas","booking","custom"].map(x=><option key={x}>{x}</option>)}
        </select>
        <textarea name="message" required minLength={10} placeholder="What do you want to build?" rows={6} className="w-full border rounded-xl p-3"/>
        <button className="rounded-full bg-black text-white px-6 py-3 font-bold">Send proposal request</button>
        {status && <div className="text-sm text-neutral-600">{status}</div>}
      </form>
    </div>
  );
}
