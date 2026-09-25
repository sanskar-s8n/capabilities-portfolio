"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { archetypes } from "@/lib/constants";
import { getProofFeatures } from "@/lib/proof-engine/registry";
import {
  ArrowRight,
  Check,
  Copy,
  Search,
  ShoppingCart,
} from "lucide-react";

export default function PlaygroundDetail() {
  const { id } = useParams<{ id: string }>();

  const a = archetypes.find((x) => x.id === id);
  const proofFeatures = getProofFeatures(id);

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
const [testMode, setTestMode] = useState(false);
const [count, setCount] = useState(0);
const [testResults, setTestResults] = useState<Record<string, string>>({});
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const data = useMemo(
    () =>
      [
        "Starter Listing",
        "Premium Service",
        "Enterprise Plan",
        "Local Package",
      ].filter((x) =>
        x.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  if (!a) {
    return (
      <div className="container-page py-20">
        Demo not found.
      </div>
    );
  }

  const code = `// ${a.title} proof widget
const result = await fetch("/api/${id}");
return result;`;

  async function copy() {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  function toggleFeature(featureId: string) {
    setSelectedFeatures((current) =>
      current.includes(featureId)
        ? current.filter((id) => id !== featureId)
        : [...current, featureId]
    );
  }

  return (
    <div className="container-page py-16">
      <div className="pill">LIVE PROOF</div>

      <h1 className="text-5xl font-black mt-4">
        {a.title}
      </h1>

      <p className="text-neutral-600 mt-3 max-w-2xl">
        {a.description}
      </p>

      <div className="grid lg:grid-cols-2 gap-6 mt-10">
        {/* LEFT SIDE */}
        <div className="card p-6">
          <div className="flex justify-between items-center">
            <h2 className="font-black">
              Live widget
            </h2>

            <span className="text-xs text-emerald-700 font-bold flex gap-1 items-center">
              <Check size={14} />
              functional
            </span>
          </div>

          {/* PROOF ENGINE */}
          {!testMode ? (
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black">
                  Choose features to test
                </h3>

                <span className="text-xs text-neutral-500">
                  {selectedFeatures.length} selected
                </span>
              </div>

              <div className="mt-3 space-y-2">
                {proofFeatures.map((feature) => {
                  const selected =
                    selectedFeatures.includes(feature.id);

                  return (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() =>
                        toggleFeature(feature.id)
                      }
                      className={`w-full text-left border rounded-xl p-4 transition ${
                        selected
                          ? "border-black bg-neutral-100"
                          : "hover:bg-neutral-50"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="font-bold">
                            {feature.name}
                          </div>

                          <div className="text-sm text-neutral-500 mt-1">
                            {feature.description}
                          </div>

                          <div className="text-xs text-neutral-400 mt-2">
                            {feature.category} ·{" "}
                            {feature.testType}
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                            selected
                              ? "bg-black border-black text-white"
                              : "border-neutral-300"
                          }`}
                        >
                          {selected && (
                            <Check size={13} />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedFeatures.length > 0 && (
                <div className="mt-4 rounded-xl bg-neutral-950 text-white p-4">
                  <div className="text-sm font-bold">
                    {selectedFeatures.length} feature
                    {selectedFeatures.length !== 1
                      ? "s"
                      : ""}{" "}
                    selected
                  </div>

                  <div className="text-xs text-neutral-400 mt-1">
                    Ready to launch a test sandbox.
                  </div>

                  <button
                    type="button"
                    onClick={() => setTestMode(true)}
                    className="mt-4 w-full rounded-xl bg-white text-black py-3 font-bold hover:bg-neutral-200"
                  >
                    Launch Test →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6">
              <div className="rounded-2xl bg-neutral-950 text-white p-6">
                <div className="text-xs uppercase tracking-widest text-neutral-400">
                  Test Mode
                </div>

                <h3 className="text-2xl font-black mt-2">
                  Sandbox ready
                </h3>

                <p className="text-sm text-neutral-400 mt-2">
                  You are testing the features selected for
                  this project.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {proofFeatures
                  .filter((feature) =>
                    selectedFeatures.includes(feature.id)
                  )
                  .map((feature) => (
                    <div
                      key={feature.id}
                      className="border rounded-xl p-5"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-black">
                            {feature.name}
                          </div>

                          <div className="text-sm text-neutral-500 mt-1">
                            {feature.description}
                          </div>
                        </div>

                        <span className="text-xs pill">
                          Ready
                        </span>
                      </div>

                      <div className="mt-4 rounded-xl bg-neutral-100 p-4">
                        <div className="text-sm font-bold">
                          Test action
                        </div>

                        <div className="text-sm text-neutral-500 mt-1">
                          Interactive test for{" "}
                          {feature.name} will appear here.
                        </div>

                        <button
  type="button"
  onClick={() => {
    if (feature.name === "Live Cart") {
      const before = count;

      setCount((current) => current + 1);

      setTestResults((current) => ({
        ...current,
        [feature.id]: `Test passed: cart count increased from ${before} to ${before + 1}.`,
      }));
    }
  }}
  className="mt-3 border border-black rounded-lg px-4 py-2 text-sm font-bold hover:bg-white"
>
  Run Test
</button>

{testResults[feature.id] && (
  <div className="mt-3 rounded-lg bg-white border p-3 text-sm">
    <div className="font-bold text-emerald-700">
      ✓ Test Passed
    </div>

    <div className="text-neutral-600 mt-1">
      {testResults[feature.id]}
    </div>
  </div>
)}
                      </div>
                    </div>
                  ))}
              </div>

              <button
                type="button"
                onClick={() => setTestMode(false)}
                className="mt-4 text-sm font-bold underline"
              >
                ← Back to feature selection
              </button>
            </div>
          )}

          {/* EXISTING LIVE DEMOS */}
          {id === "ecommerce" ? (
            <div className="mt-6">
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Starter Kit",
                  "Pro Kit",
                  "Growth Pack",
                  "Enterprise",
                ].map((p, i) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() =>
                      setCount((current) => current + 1)
                    }
                    className="border rounded-xl p-4 text-left hover:bg-neutral-50"
                  >
                    <div className="font-bold">
                      {p}
                    </div>

                    <div className="text-sm text-neutral-500 mt-1">
                      ${(49 + i * 50).toFixed(2)}
                    </div>

                    <div className="text-xs font-bold mt-4">
                      Add to cart +
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-xl bg-neutral-100 p-4 flex justify-between">
                <span className="flex gap-2 items-center">
                  <ShoppingCart size={17} />
                  Cart items
                </span>

                <b>{count}</b>
              </div>
            </div>
          ) : id === "listing" ? (
            <div className="mt-6">
              <div className="relative">
                <Search
                  className="absolute left-3 top-3.5 text-neutral-400"
                  size={17}
                />

                <input
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  placeholder="Search listings..."
                  className="w-full border rounded-xl py-3 pl-10 pr-3"
                />
              </div>

              <div className="mt-4 space-y-2">
                {data.map((x) => (
                  <div
                    key={x}
                    className="border rounded-xl p-4 flex justify-between"
                  >
                    <span>{x}</span>

                    <span className="text-xs pill">
                      active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-neutral-950 text-white p-7">
              <div className="text-xs uppercase tracking-widest text-neutral-400">
                Demo mode
              </div>

              <div className="text-2xl font-black mt-3">
                {id === "booking"
                  ? "Availability & conflict detection"
                  : id === "saas"
                    ? "Role-based metrics"
                    : "CMS editor + preview"}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="bg-white/10 rounded-lg p-3 text-sm">
                  Input
                </div>

                <div className="bg-white/10 rounded-lg p-3 text-sm">
                  API
                </div>

                <div className="bg-white/10 rounded-lg p-3 text-sm">
                  Result
                </div>
              </div>

              <div className="mt-5 text-neutral-400 text-sm">
                This local demo is credential-free.
                Production integrations are enabled
                through environment variables.
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE — CODE */}
        <div className="card overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="font-black">
              Code
            </h2>

            <button
              type="button"
              onClick={copy}
              className="text-sm font-bold flex gap-2 items-center"
            >
              {copied ? (
                <Check size={15} />
              ) : (
                <Copy size={15} />
              )}

              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <pre className="p-5 bg-neutral-950 text-neutral-200 text-sm overflow-auto min-h-64">
            <code>{code}</code>
          </pre>

          <div className="p-5 border-t text-sm text-neutral-500 flex gap-2 items-center">
            <ArrowRight size={15} />

            Architecture:
            UI → Next.js API → data/integration layer
          </div>
        </div>
      </div>
    </div>
  );
}