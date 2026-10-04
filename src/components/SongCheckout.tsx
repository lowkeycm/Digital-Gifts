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
          <span className="studio-kicker">MAKE IT THEIRS</span>
          <h3>Keep the whole story.</h3>
        </div>
        <div className="purchase-price">
          $29<small>Introductory price</small>
        </div>
      </div>
      <ul>
        <li>
          <StudioIcon name="check" size={15} />
          Both full songs, ready to download
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
        {busy ? "Opening secure checkout..." : "Keep my songs"}
        <StudioIcon name="arrow" size={18} />
      </button>
      <p className="workbench-footnote">
        One payment. Both versions are yours.
      </p>
      {demonstration && (
        <p className="help">
          Preview only. This button shows the purchased studio without taking
          payment.
        </p>
      )}
      {mode === "test" && !demonstration && (
        <p className="help">Private Stripe test checkout. No real charge.</p>
      )}
      {error && (
        <p role="alert" className="error-copy">
          {error}
        </p>
      )}
      <button className="studio-text-button purchase-check" onClick={onPaid}>
        Already paid? Check my payment
      </button>
    </section>
  );
}
