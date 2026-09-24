"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CheckoutButton({ songId, accessToken }: { songId: string; accessToken: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function checkout() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ songId, accessToken }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Checkout failed.");
      router.push(`/song/${songId}?key=${accessToken}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setBusy(false);
    }
  }

  return (
    <div>
      <button className="pill primary" onClick={checkout} disabled={busy}>
        {busy ? "Unlocking your demo..." : "Demo unlock full song · $29"}
      </button>
      {error ? <p className="error-copy">{error}</p> : null}
    </div>
  );
}
