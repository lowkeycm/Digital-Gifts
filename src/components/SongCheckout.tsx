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
    <span className="eyebrow">Make it theirs</span><h2>Keep the whole song.</h2>
    <p>Unlock both full versions you just heard, MP3 downloads, three revisions and a personal gift page to send to them.</p>
    <div className="price">$29</div><p className="help">One payment. Three revisions included.</p>
    {mode === "test" && <p className="help">Private Stripe test checkout. No real charge.</p>}
    <button className="pill primary" type="button" disabled={busy} onClick={() => void checkout()}>{busy ? "Opening secure checkout..." : "Unlock my full songs"}</button>
    {error && <p role="alert" className="error-copy">{error}</p>}
    <p className="help">Already paid? <button className="ghost" type="button" onClick={onPaid}>Check my payment</button></p>
  </section>;
}
