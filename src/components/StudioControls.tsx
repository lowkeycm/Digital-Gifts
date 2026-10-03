"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function StudioControls({
  action = "logout",
  jobId,
}: {
  action?: "logout" | "sync";
  jobId?: string;
}) {
  const [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
          const r = await fetch("/api/studio", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ action, jobId }),
          });
          const b = await r.json();
          if (!r.ok) throw new Error(b.error);
          router.refresh();
        } catch (e) {
          setError(e instanceof Error ? e.message : "Try again.");
        } finally {
          setBusy(false);
        }
      }}
    >
      <button className="pill" disabled={busy}>
        {busy
          ? "Working..."
          : action === "logout"
              ? "Sign out"
              : "Check provider status"}
      </button>
      {error && (
        <p role="alert" className="error-copy">
          {error}
        </p>
      )}
    </form>
  );
}
