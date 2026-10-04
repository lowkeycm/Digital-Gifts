"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function CustomerAccess({ tokenHash }: { tokenHash?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState(""),
    [busy, setBusy] = useState(false),
    [status, setStatus] = useState(""),
    [error, setError] = useState(false);
  return (
    <form
      className="customer-access-form"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setStatus("");
        setError(false);
        try {
          const r = await fetch(
            tokenHash ? "/api/my-songs/confirm" : "/api/my-songs/access",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(tokenHash ? { tokenHash } : { email }),
            },
          );
          const b = await r.json();
          if (!r.ok) throw new Error(b.error);
          if (tokenHash) {
            router.replace("/my-songs");
            router.refresh();
          } else setStatus(b.message);
        } catch (e) {
          setError(true);
          setStatus(e instanceof Error ? e.message : "Please try again.");
        } finally {
          setBusy(false);
        }
      }}
    >
      {!tokenHash && (
        <>
          <label htmlFor="customer-email">
            The email you used for your song
          </label>
          <input
            id="customer-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </>
      )}
      <button className="studio-button studio-button-main" disabled={busy}>
        {busy
          ? "One moment..."
          : tokenHash
            ? "Open My songs"
            : "Email my sign-in link"}
      </button>
      {status && <p role={error ? "alert" : "status"}>{status}</p>}
    </form>
  );
}
export function ForgetSongs() {
  const [busy, setBusy] = useState(false);
  return (
    <button
      className="studio-text-button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          const r = await fetch("/api/my-songs", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: "{}",
          });
          if (r.ok) location.reload();
        } finally {
          setBusy(false);
        }
      }}
    >
      Sign out & forget this device
    </button>
  );
}
