"use client";

import { FormEvent, useState } from "react";
import { INCLUDED_REVISIONS } from "@/lib/offer";

export function RevisionForm({
  songId,
  accessToken,
  used = 0,
  pending = false,
  failed = false,
  notesLimit = 500,
  onSubmitted,
}: {
  songId: string;
  accessToken: string;
  used?: number;
  pending?: boolean;
  failed?: boolean;
  notesLimit?: number;
  onSubmitted?: () => void;
}) {
  const [type, setType] = useState("Fix a detail");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);
  const [requestId] = useState(() => crypto.randomUUID());
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
          requestId,
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

  if (sent || pending || failed || used >= INCLUDED_REVISIONS) {
    return (
      <div className="card revision-success">
        <span className="status">{used} / {INCLUDED_REVISIONS} revisions used</span>
        <h3>{failed ? "Retry your unfinished revision above." : used >= INCLUDED_REVISIONS && !pending && !sent ? "All three revisions are yours to keep." : "Your new rendition is on its way."}</h3>
        <p>
          {pending || sent ? "Follow its progress above. " : ""}Your originals and every finished revision stay available.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card revision-card">
      <div>
        <span className="eyebrow">{INCLUDED_REVISIONS - used} {INCLUDED_REVISIONS - used === 1 ? "revision" : "revisions"} remaining</span>
        <h3>Want to change something?</h3>
        <p>
          Tell us what missed. We’ll carry forward your earlier corrections and
          make a new rendition from your story and these notes. The melody and delivery may change too.
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
          maxLength={Math.max(0, Math.min(450, notesLimit - type.length - 2))}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="It says we met in 2018, but we met in 2017..."
        />
        <p className="help">{notes.length} / {Math.max(0, Math.min(450, notesLimit - type.length - 2))} characters</p>
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
