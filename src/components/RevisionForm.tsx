"use client";

import { FormEvent, useState } from "react";

export function RevisionForm({ songId, accessToken, alreadyRequested = false }: { songId: string; accessToken: string; alreadyRequested?: boolean }) {
  const [type, setType] = useState("Fix a detail");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(alreadyRequested);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/revisions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ songId, accessToken, type, notes }),
    });
    const body = await res.json();
    setBusy(false);
    if (res.ok) setSent(true);
    else setError(body.error || "We could not save that revision.");
  }

  if (sent) {
    return (
      <div className="card revision-success">
        <span className="status">REVISION SAVED</span>
        <h3>We have your correction.</h3>
        <p>The production version will send this instruction to the music provider while preserving the original song.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card revision-card">
      <div>
        <span className="eyebrow">One revision included</span>
        <h3>One thing off? Fix that thing.</h3>
        <p>Tell us what missed. You do not need to rewrite the whole song.</p>
      </div>
      <div className="field">
        <label>What needs changing?</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Fix a detail</option>
          <option>Change a lyric</option>
          <option>Make it more emotional</option>
          <option>Make it more upbeat</option>
          <option>Change the style</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field">
        <label>What should we change?</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="It says we met in 2018, but we met in 2017..." />
      </div>
      {error ? <p className="error-copy">{error}</p> : null}
      <button className="pill primary" disabled={busy || notes.length < 5}>{busy ? "Saving..." : "Request my revision"}</button>
    </form>
  );
}
