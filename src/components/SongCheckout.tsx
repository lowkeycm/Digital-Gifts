"use client";
import { useState } from "react";
import { StudioIcon } from "./StudioIcon";
export function SongCheckout({
  id,
  accessKey,
  mode,
  onPaid,
  demonstration = false,
}: {
  id: string;
  accessKey: string;
  mode: "test" | "live";
  onPaid: () => void;
  demonstration?: boolean;
}) {
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function checkout() {
    if (demonstration) {
      onPaid();
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ songId: id, accessToken: accessKey }),
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(
          body.error || "Checkout could not open. Please try again.",
        );
      if (body.paid) {
        onPaid();
        setBusy(false);
      } else if (
        typeof body.url === "string" &&
        new URL(body.url).hostname === "checkout.stripe.com"
      )
        window.location.assign(body.url);
      else throw new Error("Checkout could not open. Please try again.");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Checkout could not open. Please try again.",
      );
      setBusy(false);
    }
  }
  return (
    <section className="studio-purchase">
      <div className="purchase-heading">
        <div>
          <h3>The complete song gift</h3>
        </div>
        <div className="purchase-price">
          <del aria-label="Regular price 59 dollars">$59</del>
          <span className="intro-price">
            <strong>$29</strong>
            <small>Introductory</small>
          </span>
        </div>
      </div>
      <ul>
        <li>
          <StudioIcon name="check" size={15} />
          Both melodies, full-length MP3s
        </li>
        <li>
          <StudioIcon name="check" size={15} />
          Three revisions to get it right
        </li>
        <li>
          <StudioIcon name="check" size={15} />A gift page with your photo and
          note
        </li>
      </ul>
      <button
        className="studio-button studio-button-main"
        disabled={busy}
        onClick={() => void checkout()}
      >
        {busy ? "Opening secure checkout..." : "Unlock their song · $29"}
        <StudioIcon name="arrow" size={18} />
      </button>
      {demonstration && <p className="help">Preview checkout. No charge.</p>}
      {mode === "test" && !demonstration && (
        <p className="help">Private Stripe test checkout. No real charge.</p>
      )}
      {error && (
        <p role="alert" className="error-copy">
          {error}
        </p>
      )}
    </section>
  );
}
