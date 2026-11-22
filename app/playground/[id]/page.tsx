"use client";

import { useEffect, useMemo, useState } from "react";
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
const [runningTests, setRunningTests] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id !== "ecommerce") return;
    let active = true;
    fetch("/api/products")
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Unable to load products");
        return payload;
      })
      .then((items) => {
        if (active) setProducts(items);
      })
      .catch((error) => {
        if (active) setProductsError(error instanceof Error ? error.message : "Unable to load products");
      });
    return () => { active = false; };
  }, [id]);

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  async function checkout() {
    if (cartCount === 0 || checkingOut) return;
    setCheckingOut(true);
    setCheckoutMessage("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: Object.entries(cart).map(([productId, quantity]) => ({ productId, quantity }))
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Checkout failed");
      if (result.mode === "stripe" && result.url) {
        window.location.href = result.url;
        return;
      }
      setCheckoutMessage(`Demo order created: ${result.orderId} · $ ${result.total}. No payment collected.`);
      setCart({});
      const refreshed = await fetch("/api/products");
      if (refreshed.ok) setProducts(await refreshed.json());
    } catch (error) {
      setCheckoutMessage(error instanceof Error ? error.message : "Checkout failed");
    } finally {
      setCheckingOut(false);
    }
  }

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

  const endpoints: Record<string, string> = {
    ecommerce: "/api/products", listing: "/api/listings", content: "/api/content",
    saas: "/api/dashboard/metrics", booking: "/api/bookings",
  };
  const code = `// ${a.title} proof widget\nconst result = await fetch("${endpoints[id]}");\nreturn result.json();`;

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
              interactive demo
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
                          disabled={runningTests.includes(feature.id)}
                          onClick={async () => {
                            setRunningTests((current) => [...current, feature.id]);
                            setTestResults((current) => {
                              const next = { ...current };
                              delete next[feature.id];
                              return next;
                            });

                            try {
                              if (id === "ecommerce" && feature.name === "Live Cart") {
                                const before = count;
                                setCount((current) => current + 1);
                                setTestResults((current) => ({
                                  ...current,
                                  [feature.id]: `PASS — cart count changed from ${before} to ${before + 1}.`,
                                }));
                                return;
                              }

                              const endpoints: Record<string, string> = {
                                ecommerce: "/api/products",
                                listing: "/api/listings",
                                content: "/api/content",
                                saas: "/api/dashboard/metrics",
                                booking: "/api/bookings",
                              };
                              const response = await fetch(endpoints[id]);
                              const payload = await response.json();

                              if (!response.ok) {
                                throw new Error(payload.error || `API returned ${response.status}`);
                              }

                              const summary =
                                Array.isArray(payload) ? `${payload.length} records returned` :
                                Array.isArray(payload.data) ? `${payload.data.length} listings returned` :
                                typeof payload === "object" && payload !== null ? "Valid JSON response received" :
                                "Response received";

                              setTestResults((current) => ({
                                ...current,
                                [feature.id]: `PASS — ${endpoints[id]} responded successfully. ${summary}.`,
                              }));
                            } catch (error) {
                              setTestResults((current) => ({
                                ...current,
                                [feature.id]: `FAIL — ${error instanceof Error ? error.message : "Request failed"}`,
                              }));
                            } finally {
                              setRunningTests((current) => current.filter((item) => item !== feature.id));
                            }
                          }}
                          className="mt-3 border border-black rounded-lg px-4 py-2 text-sm font-bold hover:bg-white disabled:opacity-50"
                        >
                          {runningTests.includes(feature.id) ? "Testing..." : "Run Test"}
                        </button>

{testResults[feature.id] && (
  <div className="mt-3 rounded-lg bg-white border p-3 text-sm">
    <div className={`font-bold ${testResults[feature.id].startsWith("PASS") ? "text-emerald-700" : "text-red-700"}`}>
      {testResults[feature.id].startsWith("PASS") ? "✓ Test Passed" : "✕ Test Failed"}
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
              {productsError && <p className="text-sm text-red-700 mb-3">{productsError}</p>}
              {products.length === 0 && !productsError ? (
                <p className="text-sm text-neutral-500">Loading products from the database...</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {products.map((product) => (
                    <div key={product.id} className="border rounded-xl p-4">
                      <div className="font-bold">{product.name}</div>
                      <div className="text-sm text-neutral-500 mt-1">
                        ${Number(product.price).toFixed(2)}
                      </div>
                      <div className="text-xs text-neutral-400 mt-1">
                        {product.inventory} in stock
                      </div>
                      <button
                        type="button"
                        disabled={product.inventory <= 0}
                        onClick={() => setCart((current) => ({
                          ...current,
                          [product.id]: Math.min((current[product.id] || 0) + 1, product.inventory)
                        }))}
                        className="mt-4 text-xs font-bold border rounded-lg px-3 py-2 hover:bg-neutral-50 disabled:opacity-40"
                      >
                        Add to cart +
                      </button>
                      {(cart[product.id] || 0) > 0 && (
                        <div className="text-xs mt-2">In cart: {cart[product.id]}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 rounded-xl bg-neutral-100 p-4">
                <div className="flex justify-between items-center">
                  <span className="flex gap-2 items-center">
                    <ShoppingCart size={17} />
                    Cart items
                  </span>
                  <b>{cartCount}</b>
                </div>
                <button
                  type="button"
                  onClick={checkout}
                  disabled={cartCount === 0 || checkingOut}
                  className="mt-3 w-full rounded-xl bg-neutral-950 text-white py-3 text-sm font-bold disabled:opacity-40"
                >
                  {checkingOut ? "Processing..." : "Checkout"}
                </button>
                {checkoutMessage && (
                  <p className="mt-3 text-sm text-neutral-700 break-words">{checkoutMessage}</p>
                )}
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