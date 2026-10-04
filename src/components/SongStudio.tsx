"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GiftShare } from "./GiftShare";
import { GiftUpload } from "./GiftUpload";
import { RevisionForm } from "./RevisionForm";
import { SongCheckout } from "./SongCheckout";
import { StudioPlayer, type StudioTrack } from "./StudioPlayer";
import { StudioIcon } from "./StudioIcon";
import { StudioAccess } from "./StudioAccess";

type Job = {
  id: string;
  kind: "original" | "revision";
  status: string;
  error: string | null;
  createdAt: string;
  revisionNumber?: number;
};
export type StudioState = {
  recipientName: string;
  genre: string;
  occasion: string;
  giftToken: string | null;
  selectedTrackId: string | null;
  giftPhotoId: string | null;
  reactionAssetId: string | null;
  giftMessage?: string;
  giftGivenAt?: string | null;
  jobs: Job[];
  tracks: StudioTrack[];
  feedbackSaved: boolean;
  revisionNotesLimit?: number;
  emailEnabled?: boolean;
  keepsake?: { available: boolean; paid: boolean };
  checkout?: {
    mode: "free" | "test" | "live";
    status: string;
    previewReady?: boolean;
  };
};
export function SongStudio({
  id,
  accessKey,
  initialStep = "listen",
  demonstration,
}: {
  id: string;
  accessKey: string;
  initialStep?: string;
  demonstration?: StudioState;
}) {
  const router = useRouter();
  const [state, setState] = useState<StudioState | null>(demonstration ?? null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const [step, setStep] = useState(
      ["listen", "prepare", "share"].includes(initialStep)
        ? initialStep
        : "listen",
    ),
    [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null),
    [savedMessage, setSavedMessage] = useState(false);
  const [rating, setRating] = useState(""),
    [comments, setComments] = useState(""),
    [mayContact, setMayContact] = useState(false),
    [feedback, setFeedback] = useState(false);
  const [polling, setPolling] = useState(true),
    [demoPhoto, setDemoPhoto] = useState<string | null>(null);
  const started = useRef(0),
    workbench = useRef<HTMLDivElement>(null),
    previousStep = useRef(step);
  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    if (window.matchMedia("(max-width:760px)").matches) {
      workbench.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion:reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    }
  }, [step]);
  const refresh = useCallback(async () => {
    if (demonstration) return;
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
  }, [id, accessKey, demonstration]);
  useEffect(() => {
    started.current = Date.now();
    const timer = setTimeout(() => void refresh(), 0);
    return () => clearTimeout(timer);
  }, [refresh]);
  const pending =
    !demonstration &&
    (state?.checkout?.status === "pending" ||
      state?.jobs.some((j) => !["complete", "failed"].includes(j.status)));
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
  useEffect(
    () => () => {
      if (demoPhoto) URL.revokeObjectURL(demoPhoto);
    },
    [demoPhoto],
  );
  async function action(path: string, extra: Record<string, unknown>) {
    setBusy(true);
    setError("");
    try {
      if (demonstration) {
        setState((s) =>
          s
            ? {
                ...s,
                ...(extra.trackId
                  ? { selectedTrackId: String(extra.trackId) }
                  : {}),
                ...(extra.message !== undefined
                  ? { giftMessage: String(extra.message) }
                  : {}),
                ...(extra.given !== undefined
                  ? {
                      giftGivenAt: extra.given
                        ? new Date().toISOString()
                        : null,
                    }
                  : {}),
                ...(path === "/api/song-feedback"
                  ? { feedbackSaved: true }
                  : {}),
              }
            : s,
        );
        return true;
      }
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
  if (!state)
    return (
      <div className="studio-loading">
        <span className="studio-kicker">YOUR PRIVATE STUDIO</span>
        <h1>A song with your story in it.</h1>
        <p role="status">{error || "Opening your songs..."}</p>
        {error && (
          <button className="studio-button" onClick={() => void refresh()}>
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
  const previewOnly =
    state.checkout?.mode !== "free" && state.checkout?.status === "pending";
  const track =
    state.tracks.find((t) => t.id === activeTrack) ??
    state.tracks.find((t) => t.id === state.selectedTrackId) ??
    state.tracks[0];
  const selected = state.tracks.find((t) => t.id === state.selectedTrackId);
  const used = Math.max(0, ...revisions.map((j) => j.revisionNumber ?? 1));
  const currentStep =
    previewOnly || (!selected && step !== "listen") ? "listen" : step;
  const photoUrl = demonstration
    ? demoPhoto
    : state.giftPhotoId
      ? `/api/songs/${id}/media?key=${accessKey}&asset=${state.giftPhotoId}`
      : null;
  const audioUrl = demonstration
    ? previewOnly
      ? `/audio/studio-preview-${(state.tracks.indexOf(track) % 2) + 1}.mp3`
      : state.tracks.indexOf(track) % 2
        ? "/audio/traci-my-rock.mp3"
        : "/audio/the-way-i-see-you.mp3"
    : track
      ? `/api/songs/${id}/audio?key=${accessKey}&track=${track.id}`
      : "";
  const previewPath = demonstration
    ? "/studio-preview/gift"
    : `/song/${id}/preview?key=${accessKey}`;
  return (
    <div className="personal-studio">
      {demonstration && (
        <div className="studio-demo-notice">
          Design preview with sample songs. No purchases or customer changes are
          made here. <a href="/studio-preview?view=checkout">See checkout</a>{" "}
          <a href="/studio-preview">See purchased studio</a>
        </div>
      )}
      <div className="studio-welcome">
        <div>
          <span className="studio-kicker">YOUR SONG / PRIVATE STUDIO</span>
          <h1>
            For {state.recipientName}
            <span>.</span>
          </h1>
          <p>
            {previewOnly
              ? "Your story is in the music. Take your first listen."
              : "Your songs are yours to keep. Let’s get your gift ready."}
          </p>
        </div>
        {!previewOnly && state.tracks.length > 0 && (
          <div className="ownership-seal">
            <StudioIcon name="check" size={16} />
            <span>
              {state.checkout?.status === "paid"
                ? "Purchase confirmed"
                : "Your collection"}
              <small>Full songs · Downloads · 3 revisions</small>
            </span>
          </div>
        )}
      </div>
      {error && (
        <p className="studio-error" role="alert">
          {error}
        </p>
      )}
      {latest
        .filter((j) => j.status !== "complete")
        .map((job) => (
          <div key={job.id} className="studio-generation" role="status">
            <span className="studio-kicker">
              {job.kind === "revision" ? "YOUR REVISION" : "YOUR SONG"}
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
                ? "Your story and preferences are saved. Try again below."
                : job.status === "uncertain"
                  ? "We’re checking whether your request was accepted. Your story is saved."
                  : "Your music is being made. This can take several minutes. Your songs will appear here."}
            </p>
            {job.status === "failed" && (
              <button
                className="studio-button"
                disabled={busy}
                onClick={() =>
                  void action("/api/song-retry", { kind: job.kind })
                }
              >
                Try this generation again
              </button>
            )}
          </div>
        ))}
      {!polling && pending && (
        <div className="studio-generation">
          <p>Your request is still saved. Check again for the latest update.</p>
          <button
            className="studio-button"
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
      {track && (
        <>
          {!previewOnly && (
            <nav className="studio-steps" aria-label="Prepare your gift">
              {[
                { id: "listen", label: "Listen & choose" },
                { id: "prepare", label: "Make it theirs" },
                { id: "share", label: "Give your gift" },
              ].map((s, i) => (
                <button
                  key={s.id}
                  aria-current={currentStep === s.id ? "step" : undefined}
                  disabled={busy || (i > 0 && !selected)}
                  onClick={async () => {
                    if (
                      currentStep === "prepare" &&
                      s.id !== "prepare" &&
                      !(await action("/api/song-gift", {
                        message: message ?? state.giftMessage ?? "",
                      }))
                    )
                      return;
                    setStep(s.id);
                  }}
                >
                  <span>
                    {selected && i === 0 ? (
                      <StudioIcon name="check" size={15} />
                    ) : (
                      `0${i + 1}`
                    )}
                  </span>
                  {s.label}
                </button>
              ))}
            </nav>
          )}
          <div className="studio-workspace">
            <StudioPlayer
              key={`${track.id}-${previewOnly ? "preview" : "full"}`}
              track={track}
              src={audioUrl}
              recipient={state.recipientName}
              occasion={state.occasion}
              previewOnly={previewOnly}
              version={state.tracks.indexOf(track) + 1}
              photoUrl={photoUrl}
            />
            <div className="studio-workbench" ref={workbench}>
              {currentStep === "listen" && (
                <section className="workbench-panel">
                  <span className="studio-kicker">
                    {previewOnly
                      ? "TWO WAYS TO TELL YOUR STORY"
                      : "01 / LISTEN & CHOOSE"}
                  </span>
                  <h2>
                    Which one feels
                    <br />
                    like them?
                  </h2>
                  <p>
                    {previewOnly
                      ? "Hear both previews. Your purchase keeps both full versions."
                      : "Listen to both. Choose the one you want them to hear. Every version stays in your collection."}
                  </p>
                  <div className="version-list" aria-label="Song versions">
                    {state.tracks.map((t, i) => (
                      <button
                        key={t.id}
                        className={`version-row ${track.id === t.id ? "is-active" : ""}`}
                        aria-pressed={track.id === t.id}
                        onClick={() => setActiveTrack(t.id)}
                      >
                        <span className="version-number">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="version-name">
                          <strong>{t.title}</strong>
                          <small>
                            {revisions.some((j) => j.id === t.jobId)
                              ? "Revised rendition"
                              : "Original version"}
                            {state.selectedTrackId === t.id
                              ? " · Gift choice"
                              : ""}
                          </small>
                        </span>
                        <StudioIcon
                          name={
                            state.selectedTrackId === t.id ? "check" : "play"
                          }
                          size={17}
                        />
                      </button>
                    ))}
                  </div>
                  {!previewOnly && (
                    <>
                      <button
                        className="studio-button studio-button-main"
                        disabled={busy}
                        onClick={async () => {
                          if (
                            await action("/api/song-gift", {
                              trackId: track.id,
                            })
                          )
                            setStep("prepare");
                        }}
                      >
                        {busy
                          ? "Saving your choice..."
                          : selected?.id === track.id
                            ? "Prepare their gift"
                            : "Give this version"}
                        <StudioIcon name="arrow" size={18} />
                      </button>
                      <p className="workbench-footnote">
                        You keep every version. They hear your favorite.
                      </p>
                    </>
                  )}
                  {previewOnly && state.checkout?.previewReady && (
                    <SongCheckout
                      id={id}
                      accessKey={accessKey}
                      mode={state.checkout.mode as "test" | "live"}
                      demonstration={Boolean(demonstration)}
                      onPaid={() => {
                        if (demonstration) {
                          setState((s) =>
                            s
                              ? {
                                  ...s,
                                  checkout: { ...s.checkout!, status: "paid" },
                                }
                              : s,
                          );
                          return;
                        }
                        started.current = Date.now();
                        setPolling(true);
                        void refresh();
                      }}
                    />
                  )}
                  {previewOnly && !state.checkout?.previewReady && (
                    <p role="status">
                      We’re getting both previews ready for you.
                    </p>
                  )}
                </section>
              )}
              {currentStep === "prepare" && (
                <section className="workbench-panel" id="gift-preparation">
                  <span className="studio-kicker">02 / MAKE IT THEIRS</span>
                  <h2>A little more you.</h2>
                  <p>
                    A favorite photo. A few words from the heart. Both are
                    optional.
                  </p>
                  {demonstration ? (
                    <label className="demo-photo-picker">
                      {demoPhoto ? "Change your photo" : "Add a favorite photo"}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) setDemoPhoto(URL.createObjectURL(f));
                        }}
                      />
                    </label>
                  ) : (
                    <GiftUpload
                      songId={id}
                      accessKey={accessKey}
                      kind="photo"
                      assetId={state.giftPhotoId}
                      onSaved={refresh}
                    />
                  )}
                  {state.giftPhotoId && !demonstration && (
                    <button
                      className="studio-text-button"
                      disabled={busy}
                      onClick={() =>
                        void action("/api/song-gift", { removePhoto: true })
                      }
                    >
                      Remove photo
                    </button>
                  )}
                  <form
                    className="studio-message"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (
                        await action("/api/song-gift", {
                          message: message ?? state.giftMessage ?? "",
                        })
                      ) {
                        setSavedMessage(true);
                        setStep("share");
                      }
                    }}
                  >
                    <label htmlFor="gift-message">
                      A note from you <span>(optional)</span>
                    </label>
                    <textarea
                      id="gift-message"
                      rows={3}
                      maxLength={600}
                      value={message ?? state.giftMessage ?? ""}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        setSavedMessage(false);
                      }}
                      placeholder="What you want them to know before they press play..."
                    />
                    <button
                      className="studio-button studio-button-main"
                      disabled={busy}
                    >
                      {busy ? "Saving..." : "Get my gift ready"}
                      <StudioIcon name="arrow" size={18} />
                    </button>
                    {savedMessage && <p role="status">Your note is saved.</p>}
                  </form>
                  {(state.keepsake?.available || demonstration) && (
                    <a
                      className="keepsake-teaser"
                      onClick={async (e) => {
                        if (demonstration) return;
                        e.preventDefault();
                        if (busy) return;
                        if (
                          await action("/api/song-gift", {
                            message: message ?? state.giftMessage ?? "",
                          })
                        ) {
                          router.push(`/song/${id}/keepsake?key=${accessKey}`);
                        }
                      }}
                      href={
                        demonstration
                          ? "/studio-preview/keepsake"
                          : `/song/${id}/keepsake?key=${accessKey}`
                      }
                    >
                      <div className="mini-print" aria-hidden="true">
                        <span>For {state.recipientName}</span>
                        <i />
                        <i />
                        <i />
                        <i />
                        <small>YOUR SONG</small>
                      </div>
                      <div>
                        <span className="studio-kicker">
                          A LITTLE SOMETHING TO KEEP
                        </span>
                        <h3>
                          {state.keepsake?.paid
                            ? "Your lyric keepsake"
                            : "Their song, in print."}
                        </h3>
                        <p>
                          {state.keepsake?.paid
                            ? "Open your printable keepsake."
                            : "A personalized 8 × 10 lyric print. Add it for $9."}
                        </p>
                        <strong>
                          {state.keepsake?.paid
                            ? "Download your keepsake"
                            : "See your keepsake"}{" "}
                          <span aria-hidden="true">↗</span>
                        </strong>
                      </div>
                    </a>
                  )}
                </section>
              )}
              {currentStep === "share" && (
                <section className="workbench-panel">
                  <span className="studio-kicker">03 / GIVE YOUR GIFT</span>
                  <h2>
                    Ready for their
                    <br />
                    first listen.
                  </h2>
                  <p>
                    Their gift page plays your chosen song. Your other versions
                    and editing tools stay private.
                  </p>
                  <div className="gift-summary">
                    <div className="gift-summary-record" aria-hidden="true">
                      <StudioIcon name="music" size={25} />
                    </div>
                    <div>
                      <small>
                        CHOSEN FOR {state.recipientName.toUpperCase()}
                      </small>
                      <strong>{selected?.title}</strong>
                      <span>
                        {state.giftPhotoId || demoPhoto
                          ? "Photo added"
                          : "Personal song page"}
                        {state.giftMessage ? " · Personal note added" : ""}
                      </span>
                    </div>
                  </div>
                  <a
                    className="studio-button studio-button-main"
                    href={previewPath}
                  >
                    Preview their gift
                    <StudioIcon name="arrow" size={18} />
                  </a>
                  {demonstration ? (
                    <p className="workbench-footnote">
                      The real studio creates a private recipient link here.
                    </p>
                  ) : (
                    <GiftShare
                      giftPath={`/gift/${id}?key=${state.giftToken}`}
                      recipient={state.recipientName}
                    />
                  )}
                  <div className="given-gift">
                    <p>
                      {state.giftGivenAt
                        ? "Gift given. We hope it was a moment worth keeping."
                        : "Come back after you’ve given it."}
                    </p>
                    <button
                      className="studio-text-button"
                      disabled={busy}
                      onClick={() =>
                        void action("/api/song-gift", {
                          given: !state.giftGivenAt,
                        })
                      }
                    >
                      {state.giftGivenAt
                        ? "I haven’t given it yet"
                        : "I’ve given the gift"}
                    </button>
                  </div>
                </section>
              )}
            </div>
          </div>
          {!previewOnly && originals.some((j) => j.status === "complete") && (
            <details className="studio-revision">
              <summary>
                <span>Something not quite right?</span>
                <span>
                  Request a revision{" "}
                  <small>{Math.max(0, 3 - used)} remaining</small>
                  <b aria-hidden="true">+</b>
                </span>
              </summary>
              {demonstration ? (
                <div className="studio-demo-revision">
                  <h3>Tell us what needs changing.</h3>
                  <p>
                    Your three included revisions make a new rendition. The
                    melody and delivery may change too.
                  </p>
                  <label>
                    Revision notes
                    <textarea placeholder="It says 2018, but we met in 2017..." />
                  </label>
                  <p>This preview doesn’t send generation requests.</p>
                </div>
              ) : (
                <RevisionForm
                  key={`revision-${revisions.at(-1)?.id ?? "first"}-${revisions.at(-1)?.status ?? "ready"}`}
                  songId={id}
                  accessToken={accessKey}
                  used={used}
                  pending={revisions.some(
                    (j) => !["complete", "failed"].includes(j.status),
                  )}
                  failed={revisions.at(-1)?.status === "failed"}
                  notesLimit={state.revisionNotesLimit}
                  onSubmitted={() => {
                    started.current = Date.now();
                    setPolling(true);
                    void refresh();
                  }}
                />
              )}
            </details>
          )}
        </>
      )}
      {!demonstration && (
        <StudioAccess
          songId={id}
          accessKey={accessKey}
          emailEnabled={state.emailEnabled ?? false}
        />
      )}
      {state.giftGivenAt && !previewOnly && (
        <section className="after-gifting">
          <div className="after-gifting-intro">
            <span className="studio-kicker">AFTER THE GIFT</span>
            <h2>How did it feel?</h2>
            <p>
              If you’d like to tell us, we’d love to hear. This part is entirely
              up to you.
            </p>
            <a className="studio-button" href="/create">
              Make another song
              <StudioIcon name="arrow" size={17} />
            </a>
          </div>
          <div>
            <details>
              <summary>
                Share your feedback <span aria-hidden="true">+</span>
              </summary>
              <form
                className="studio-feedback"
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
                <label htmlFor="rating">How personal did the song feel?</label>
                <select
                  id="rating"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="" disabled>
                    Choose a rating
                  </option>
                  <option value="5">5 / It felt like us</option>
                  <option value="4">4 / Mostly personal</option>
                  <option value="3">3 / A mix</option>
                  <option value="2">2 / Too generic</option>
                  <option value="1">1 / Missed the mark</option>
                </select>
                <label htmlFor="feedback">
                  Anything you’d like us to know? (optional)
                </label>
                <textarea
                  id="feedback"
                  maxLength={3000}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
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
                <button className="studio-button" disabled={busy}>
                  {state.feedbackSaved ? "Update feedback" : "Send feedback"}
                </button>
                {feedback && <p role="status">Saved. Thank you for sharing.</p>}
              </form>
            </details>
            <details>
              <summary>
                Upload a reaction, if you captured one{" "}
                <span aria-hidden="true">+</span>
              </summary>
              {demonstration ? (
                <p>In your studio, an optional private upload appears here.</p>
              ) : (
                <GiftUpload
                  songId={id}
                  accessKey={accessKey}
                  kind="reaction"
                  assetId={state.reactionAssetId}
                  onSaved={refresh}
                />
              )}
            </details>
          </div>
        </section>
      )}
    </div>
  );
}
