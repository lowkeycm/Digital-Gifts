"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function KeepsakePurchase({
  id,
  accessKey,
  demonstration = false,
}: {
  id: string;
  accessKey: string;
  demonstration?: boolean;
}) {
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const router = useRouter();
  return (
    <>
      <button
        className="studio-button studio-button-main"
        disabled={busy || demonstration}
        onClick={async () => {
          setBusy(true);
          setError("");
          try {
            const r = await fetch("/api/keepsake-checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ songId: id, accessToken: accessKey }),
            });
            const b = await r.json();
            if (!r.ok) throw new Error(b.error);
            if (b.paid) {
              router.refresh();
              setBusy(false);
            } else if (
              typeof b.url === "string" &&
              new URL(b.url).hostname === "checkout.stripe.com"
            )
              location.assign(b.url);
            else throw new Error("Checkout couldn’t open. Please try again.");
          } catch (e) {
            setError(e instanceof Error ? e.message : "Please try again.");
            setBusy(false);
          }
        }}
      >
        {demonstration
          ? "Design preview · no purchase"
          : busy
            ? "Opening secure checkout..."
            : "Add my lyric keepsake · $9"}
      </button>
      {error && (
        <p role="alert" className="error-copy">
          {error}
        </p>
      )}
    </>
  );
}
