"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function StudioControls({
  action = "login",
  jobId,
}: {
  action?: "login" | "logout" | "sync";
  jobId?: string;
}) {
  const [password, setPassword] = useState(""),
    [error, setError] = useState(""),
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
            body: JSON.stringify({ action, password, jobId }),
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
      {action === "login" && (
        <div className="field">
          <label htmlFor="studio-password">Studio password</label>
          <input
            id="studio-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}
      <button className="pill" disabled={busy}>
        {busy
          ? "Working..."
          : action === "login"
            ? "Open studio"
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
