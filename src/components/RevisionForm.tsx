"use client";

import { FormEvent, useState } from "react";

export function RevisionForm({
  songId,
  accessToken,
  alreadyRequested = false,
  onSubmitted,
}: {
  songId: string;
  accessToken: string;
  alreadyRequested?: boolean;
  onSubmitted?: () => void;
}) {
  const [type, setType] = useState("Fix a detail");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(alreadyRequested);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/revisions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          songId,
          accessToken,
          type,
          notes: `${type}: ${notes}`,
        }),
      });
      const body = await res.json();
      if (!res.ok)
        throw new Error(body.error || "We could not save that revision.");
      setSent(true);
      onSubmitted?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We could not save that revision. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="card revision-success">
        <span className="status">YOUR INCLUDED REVISION</span>
        <h3>Your new rendition is on this page.</h3>
        <p>
          Follow its progress above. Your original song stays available too.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card revision-card">
      <div>
        <span className="eyebrow">One revision included</span>
        <h3>Want to change something?</h3>
        <p>
          Tell us what missed. We’ll make a new rendition from your story and
          these notes. The melody and delivery may change too.
        </p>
      </div>
      <div className="field">
        <label htmlFor="revision-type">What needs changing?</label>
        <select
          id="revision-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Fix a detail</option>
          <option>Change a lyric</option>
          <option>Make it more emotional</option>
          <option>Make it more upbeat</option>
          <option>Change the style</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="revision-notes">What should we change?</label>
        <textarea
          id="revision-notes"
          maxLength={450}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="It says we met in 2018, but we met in 2017..."
        />
      </div>
      {error ? (
        <p role="alert" className="error-copy">
          {error}
        </p>
      ) : null}
      <button className="pill primary" disabled={busy || notes.length < 5}>
        {busy ? "Starting your revision..." : "Request my revision"}
      </button>
    </form>
  );
}
