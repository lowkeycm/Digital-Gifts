"use client";
import { useState } from "react";
export function SongCheckout({ id, accessKey, mode, onPaid }: { id: string; accessKey: string; mode: "test" | "live"; onPaid: () => void }) {
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  async function checkout() {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ songId: id, accessToken: accessKey }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Checkout could not open. Please try again.");
      if (body.paid) { onPaid(); setBusy(false); }
      else if (typeof body.url === "string" && new URL(body.url).hostname === "checkout.stripe.com") window.location.assign(body.url);
      else throw new Error("Checkout could not open. Please try again.");
    } catch (e) { setError(e instanceof Error ? e.message : "Checkout could not open. Please try again."); setBusy(false); }
  }
  return <section className="card song-offer">
    <span className="eyebrow">Your Song</span><h2>Your story is saved.</h2>
    <p>Complete checkout to turn it into music. You’ll get two original versions, three revisions, MP3 downloads and a private gift page.</p>
    <div className="price">$29</div><p className="help">One payment. Three revisions included.</p>
    {mode === "test" && <p className="help">Private Stripe test checkout. No real charge. Music generation still uses Kie credits.</p>}
    <button className="pill primary" type="button" disabled={busy} onClick={() => void checkout()}>{busy ? "Opening secure checkout..." : "Continue to secure checkout"}</button>
    {error && <p role="alert" className="error-copy">{error}</p>}
    <p className="help">Already paid? <button className="ghost" type="button" onClick={onPaid}>Check my payment</button></p>
  </section>;
}
