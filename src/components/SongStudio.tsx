"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { GiftShare } from "./GiftShare";
import { GiftUpload } from "./GiftUpload";
import { RevisionForm } from "./RevisionForm";

type Job = {
  id: string;
  kind: "original" | "revision";
  status: string;
  error: string | null;
  createdAt: string;
};
type Track = {
  id: string;
  jobId: string;
  title: string;
  lyrics: string;
  duration: number | null;
};
type State = {
  recipientName: string;
  genre: string;
  occasion: string;
  giftToken: string;
  selectedTrackId: string | null;
  giftPhotoId: string | null;
  reactionAssetId: string | null;
  jobs: Job[];
  tracks: Track[];
  feedbackSaved: boolean;
};
export function SongStudio({
  id,
  accessKey,
}: {
  id: string;
  accessKey: string;
}) {
  const [state, setState] = useState<State | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [copy, setCopy] = useState("");
  const [rating, setRating] = useState("5"),
    [comments, setComments] = useState(""),
    [mayContact, setMayContact] = useState(false),
    [feedback, setFeedback] = useState(false);
  const [polling, setPolling] = useState(true);
  const started = useRef(0);
  const refresh = useCallback(async () => {
    try {
      const r = await fetch(`/api/songs/${id}`, {
        headers: { "x-song-key": accessKey },
        cache: "no-store",
      });
      const b = await r.json();
      if (!r.ok) throw new Error(b.error);
      setState(b);
      setError("");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "We could not check your song. Refresh to try again.",
      );
    }
  }, [id, accessKey]);
  useEffect(() => {
    started.current = Date.now();
    const timer = setTimeout(() => void refresh(), 0);
    return () => clearTimeout(timer);
  }, [refresh]);
  const pending = state?.jobs.some(
    (j) => !["complete", "failed"].includes(j.status),
  );
  useEffect(() => {
    if (!polling || (!pending && state)) return;
    const timer = setInterval(() => {
      if (Date.now() - started.current > 15 * 60 * 1000) {
        setPolling(false);
        return;
      }
      void refresh();
    }, 10000);
    return () => clearInterval(timer);
  }, [refresh, pending, state, polling]);
  async function action(path: string, extra: Record<string, unknown>) {
    setBusy(true);
    setError("");
    try {
      const r = await fetch(path, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ songId: id, accessToken: accessKey, ...extra }),
      });
      const b = await r.json();
      if (!r.ok) throw new Error(b.error);
      await refresh();
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again.");
      return false;
    } finally {
      setBusy(false);
    }
  }
  async function copyPrivateLink() {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopy("Private link copied. Keep this one for your songs and edits.");
    } catch {
      setCopy("Copy the link from your browser’s address bar to save this page.");
    }
  }
  if (!state)
    return (
      <div className="card">
        <h1>Your song studio</h1>
        <p role="status">{error || "Opening your private song page..."}</p>
        {error && (
          <button className="pill" onClick={() => void refresh()}>
            Try again
          </button>
        )}
      </div>
    );
  const originals = state.jobs.filter((j) => j.kind === "original"),
    revisions = state.jobs.filter((j) => j.kind === "revision");
  const latest = [originals.at(-1), revisions.at(-1)].filter((j): j is Job =>
    Boolean(j),
  );
  return (
    <>
      <div className="delivery-heading">
        <span className="status">YOUR SONG / PRIVATE STUDIO</span>
        <button className="ghost" onClick={() => void copyPrivateLink()}>
          Save my private link
        </button>
      </div>
      <h1 className="delivery-title">For {state.recipientName}.</h1>
      <p className="lede delivery-lede">
        Your story, made into music. Listen to each version and keep the one
        that feels right.
      </p>
      <p className="help">
        Save this private link to return. It lets you manage the song; choose
        Send your gift below when sharing with the recipient.
      </p>
      {copy && <p role="status">{copy}</p>}
      {error && (
        <p className="error-copy" role="alert">
          {error}
        </p>
      )}
      {latest.map(
        (job) =>
          job.status !== "complete" && (
            <div className="card generation-status" key={job.id} role="status">
              <span className="eyebrow">
                {job.kind === "revision" ? "Your revision" : "Your song"}
              </span>
              <h2>
                {job.status === "failed"
                  ? "That attempt didn’t finish."
                  : job.status === "uncertain"
                    ? "Confirming your request."
                    : "A little time. A very personal song."}
              </h2>
              <p>
                {job.status === "failed"
                  ? "Your story is saved. You can retry without writing it again."
                  : job.status === "uncertain"
                    ? "We’re checking whether the music service accepted your request. We won’t start a duplicate song. Your story is saved; you can return using your private link to check its progress."
                    : "The music service is working on it. This can take several minutes. Your finished tracks will appear here."}
              </p>
              {job.status === "failed" && (
                <button
                  disabled={busy}
                  className="pill primary"
                  onClick={() =>
                    void action("/api/song-retry", { kind: job.kind })
                  }
                >
                  Try this generation again
                </button>
              )}
              {job.error === "sync_retry_needed" && (
                <p>
                  We’re saving your audio. Your next refresh will try again.
                </p>
              )}
            </div>
          ),
      )}
      {!polling && pending && (
        <div className="card">
          <p>
            This is taking longer than expected. Your request is still saved.
          </p>
          <button
            className="pill"
            onClick={() => {
              started.current = Date.now();
              setPolling(true);
              void refresh();
            }}
          >
            Check again
          </button>
        </div>
      )}
      <div className="studio-tracks">
        {state.tracks.map((t, i) => (
          <article
            className={`studio-track ${state.selectedTrackId === t.id ? "is-gift-choice" : ""}`}
            key={t.id}
          >
            <div className="studio-record" aria-hidden="true">
              <span>{state.recipientName.slice(0, 1)}</span>
            </div>
            <div>
              <span className="eyebrow">
                {revisions.some((j) => j.id === t.jobId)
                  ? "Revised rendition"
                  : "Original"}{" "}
                / Version {i + 1}
              </span>
              <h2>{t.title}</h2>
              <audio
                controls
                preload="none"
                onPlay={(e) =>
                  document.querySelectorAll("audio").forEach((a) => {
                    if (a !== e.currentTarget) a.pause();
                  })
                }
                src={`/api/songs/${id}/audio?key=${accessKey}&track=${t.id}`}
              >
                Your browser does not support audio playback.
              </audio>
              <a
                className="pill"
                href={`/api/songs/${id}/audio?key=${accessKey}&track=${t.id}&download=1`}
              >
                Download MP3
              </a>
              <button
                className="pill gift-choice"
                type="button"
                aria-pressed={state.selectedTrackId === t.id}
                disabled={busy}
                onClick={() => void action("/api/song-gift", { trackId: t.id })}
              >
                {state.selectedTrackId === t.id
                  ? "Selected for their gift"
                  : "Choose this version for their gift"}
              </button>
              {t.lyrics && (
                <details>
                  <summary>Read the lyrics</summary>
                  <p className="song-lyrics">{t.lyrics}</p>
                </details>
              )}
            </div>
          </article>
        ))}
      </div>
      {state.tracks.length > 0 && (
        <section id="gift-preparation" className="gift-preparation card">
          <span className="eyebrow">Make it theirs</span>
          <h2>Your gift, ready to give.</h2>
          <p>
            {state.selectedTrackId
              ? "Their gift page plays only your selected version. All your other versions stay here. Changing your selection updates the same gift link."
              : "Listen above and choose the version you want them to hear. Then add a photo if you like, preview their gift, and share the link."}
          </p>
          <GiftUpload
            songId={id}
            accessKey={accessKey}
            kind="photo"
            assetId={state.giftPhotoId}
            onSaved={refresh}
          />
          {state.giftPhotoId && (
            <button
              type="button"
              className="ghost"
              disabled={busy}
              onClick={() =>
                void action("/api/song-gift", { removePhoto: true })
              }
            >
              Remove photo from gift
            </button>
          )}
          {state.selectedTrackId && (
            <>
              <a className="pill gift-preview-link" href={`/song/${id}/preview?key=${accessKey}`}>
                Preview & send your gift <span aria-hidden="true">↗</span>
              </a>
              <GiftShare giftPath={`/gift/${id}?key=${state.giftToken}`} recipient={state.recipientName} />
            </>
          )}
          {!state.selectedTrackId && (
            <p className="help">
              Choose a song version above to unlock the gift link.
            </p>
          )}
        </section>
      )}
      {originals.some((j) => j.status === "complete") && (
        <RevisionForm
          songId={id}
          accessToken={accessKey}
          alreadyRequested={Boolean(revisions.length)}
          onSubmitted={refresh}
        />
      )}
      {state.tracks.length > 0 && (
        <div className="card reaction-upload-card">
          <GiftUpload
            songId={id}
            accessKey={accessKey}
            kind="reaction"
            assetId={state.reactionAssetId}
            onSaved={refresh}
          />
        </div>
      )}
      {state.tracks.length > 0 && (
        <form
          className="card beta-feedback"
          onSubmit={async (e) => {
            e.preventDefault();
            if (
              await action("/api/song-feedback", {
                rating: Number(rating),
                comments,
                mayContact,
              })
            )
              setFeedback(true);
          }}
        >
          <span className="eyebrow">Your feedback</span>
          <h2>Did it feel like them?</h2>
          <p>
            The honest version helps us most. Tell us what landed and what
            missed.
          </p>
          <div className="field">
            <label htmlFor="rating">How personal did the song feel?</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="5">5 / It felt like us</option>
              <option value="4">4 / Mostly personal</option>
              <option value="3">3 / A mix</option>
              <option value="2">2 / Too generic</option>
              <option value="1">1 / Missed the mark</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="feedback">Your feedback (optional)</label>
            <textarea
              id="feedback"
              maxLength={3000}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
          <label className="beta-consent">
            <input
              type="checkbox"
              checked={mayContact}
              onChange={(e) => setMayContact(e.target.checked)}
            />
            <span>
              You may contact me about sharing my reaction. Ask me before
              publishing anything.
            </span>
          </label>
          <button className="pill primary" disabled={busy}>
            {feedback || state.feedbackSaved
              ? "Update my feedback"
              : "Send my feedback"}
          </button>
          {feedback && (
            <p role="status">
              Saved. Thank you for sharing your feedback.
            </p>
          )}
        </form>
      )}
    </>
  );
}
