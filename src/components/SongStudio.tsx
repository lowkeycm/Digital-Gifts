"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  giftTemplates,
  giftScenes,
  giftScene,
  type GiftScene,
  giftTemplate,
  type GiftTemplate,
} from "@/lib/gift-templates";
import { useStudioPreviewDraft } from "./StudioPreviewDraft";
import { useRouter } from "next/navigation";
import { GiftShare } from "./GiftShare";
import { GiftUpload } from "./GiftUpload";
import { MediaFilePicker } from "./MediaFilePicker";
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
  giftTemplate?: GiftTemplate;
  giftScene?: GiftScene;
  giftSharedAt?: string | null;
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
  const preview = useStudioPreviewDraft();
  const [storedState, setStoredState] = useState<StudioState | null>(
      demonstration ?? null,
    ),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const [storedStep, setStoredStep] = useState(
      ["listen", "prepare", "share"].includes(initialStep)
        ? initialStep
        : "listen",
    ),
    [activeTrack, setActiveTrack] = useState<string | null>(null);
  const state = demonstration && preview ? preview.draft.state : storedState;
  const setState = demonstration && preview ? preview.setState : setStoredState;
  const step = demonstration && preview ? preview.draft.step : storedStep;
  const setStep = demonstration && preview ? preview.setStep : setStoredStep;
  const [playRequest, setPlayRequest] = useState(0);
  const [message, setMessage] = useState<string | null>(null),
    [savedMessage, setSavedMessage] = useState(false);
  const [rating, setRating] = useState(""),
    [comments, setComments] = useState(""),
    [mayContact, setMayContact] = useState(false),
    [feedback, setFeedback] = useState(false);
  const [polling, setPolling] = useState(true);
  const demoPhoto = preview?.photoUrl ?? null;
  const initialized = useRef(false);
  useEffect(() => {
    if (!demonstration || !preview?.ready || initialized.current) return;
    const timer = setTimeout(() => {
      initialized.current = true;
      preview.setState((s) =>
        s ? { ...s, checkout: demonstration.checkout } : s,
      );
      if (initialStep !== "listen") preview.setStep(initialStep);
    }, 0);
    return () => clearTimeout(timer);
  }, [demonstration, preview, initialStep]);
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
      setStoredState(b);
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
                ...(extra.template !== undefined
                  ? { giftTemplate: giftTemplate(extra.template) }
                  : {}),
                ...(extra.scene !== undefined
                  ? { giftScene: giftScene(extra.scene) }
                  : {}),
                ...(extra.shared
                  ? { giftSharedAt: new Date().toISOString() }
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
        await preview?.flush();
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
  if (!state || (demonstration && !preview?.ready))
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
    (step === "listen"
      ? state.tracks.find((t) => t.id === activeTrack)
      : undefined) ??
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
          Design preview · Sample audio · No charges.{" "}
          <a href="/studio-preview?view=checkout">See checkout</a>{" "}
          <a href="/studio-preview">See purchased studio</a>
          {preview?.error && <p role="alert">{preview.error}</p>}
        </div>
      )}
      <div className="studio-welcome">
        <div>
          <span className="studio-kicker">YOUR SONG / PRIVATE STUDIO</span>
          <h1>
            For {state.recipientName}
            <span>.</span>
          </h1>
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
          {(state.giftSharedAt || state.giftGivenAt) && !previewOnly && (
            <a className="studio-after-link" href="#after-the-gift">
              Reactions & feedback <StudioIcon name="arrow" size={16} />
            </a>
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
              playRequest={playRequest}
            />
            <div className="studio-workbench" ref={workbench}>
              {currentStep === "listen" && (
                <section className="workbench-panel">
                  <span className="studio-kicker">
                    {previewOnly
                      ? "YOUR SONG PREVIEWS"
                      : "01 / LISTEN & CHOOSE"}
                  </span>
                  <h2>Choose a melody.</h2>
                  <p>
                    Same lyrics. Two melodies.
                    {previewOnly ? " Listen to the 60-second previews." : ""}
                  </p>
                  <div className="version-list" aria-label="Song versions">
                    {state.tracks.map((t, i) => (
                      <button
                        key={t.id}
                        className={`version-row ${track.id === t.id ? "is-active" : ""}`}
                        aria-pressed={track.id === t.id}
                        onClick={() => {
                          setActiveTrack(t.id);
                          setPlayRequest((n) => n + 1);
                        }}
                      >
                        <span className="version-number">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="version-name">
                          <strong>{t.title}</strong>
                          <small>
                            {revisions.some((j) => j.id === t.jobId)
                              ? "Revised rendition"
                              : `Melody ${i + 1}`}
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
                  <h2>Personalize their gift.</h2>
                  {demonstration ? (
                    <MediaFilePicker
                        label={demoPhoto ? "Change your photo" : "Add a favorite photo"}
                        accept="image/*"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          if (!f.size || f.size > 8 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(f.type)) {
                            setError("Choose a JPG, PNG or WebP photo up to 8 MB.");
                            return;
                          }
                          setError("");
                          await preview?.setPhoto(f);
                        }}
                      />
                  ) : (
                    <GiftUpload
                      songId={id}
                      accessKey={accessKey}
                      kind="photo"
                      assetId={state.giftPhotoId}
                      onSaved={refresh}
                    />
                  )}
                  {demonstration && demoPhoto && (
                    <button
                      className="studio-text-button"
                      onClick={() => void preview?.setPhoto(null)}
                    >
                      Remove photo
                    </button>
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
                  <fieldset className="gift-template-picker gift-scene-picker">
                    <legend>Choose an experience</legend>
                    <div>
                      {giftScenes.map((scene) => (
                        <button
                          key={scene.id}
                          type="button"
                          aria-pressed={giftScene(state.giftScene) === scene.id}
                          disabled={busy}
                          onClick={() =>
                            void action("/api/song-gift", { scene: scene.id })
                          }
                        >
                          <span
                            className="template-swatch"
                            style={{
                              backgroundImage: `url(/images/gift-template-${scene.id}-record.webp)`,
                            }}
                          />
                          <strong>{scene.name}</strong>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset className="gift-template-picker gift-presentation-picker">
                    <legend>Choose a presentation</legend>
                    <div>
                      {giftTemplates.map((template) => (
                        <button
                          key={template.id}
                          type="button"
                          aria-pressed={
                            giftTemplate(state.giftTemplate) === template.id
                          }
                          onClick={() =>
                            void action("/api/song-gift", {
                              template: template.id,
                            })
                          }
                          disabled={busy}
                        >
                          <span
                            className="template-swatch"
                            style={{
                              backgroundImage: `url(/images/gift-template-${giftScene(state.giftScene)}-${template.id}.webp)`,
                            }}
                            aria-hidden="true"
                          />
                          <strong>{template.name}</strong>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <form
                    id="gift-message-form"
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
                        if (demonstration)
                          setState((s) =>
                            s ? { ...s, giftMessage: e.target.value } : s,
                          );
                        setSavedMessage(false);
                      }}
                      placeholder="Write your note..."
                    />
                  </form>
                  {(state.keepsake?.available || demonstration) && (
                    <a
                      className="keepsake-teaser"
                      onClick={async (e) => {
                        e.preventDefault();
                        if (busy) return;
                        if (
                          await action("/api/song-gift", {
                            message: message ?? state.giftMessage ?? "",
                          })
                        ) {
                          router.push(
                            demonstration
                              ? "/studio-preview/keepsake"
                              : `/song/${id}/keepsake?key=${accessKey}`,
                          );
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
                        <span className="studio-kicker">OPTIONAL ADD-ON</span>
                        <h3>
                          {state.keepsake?.paid
                            ? "Your lyric keepsake"
                            : "Add a lyric print"}
                        </h3>
                        <p>
                          {state.keepsake?.paid
                            ? "Open your printable keepsake."
                            : "Personalized 8 × 10 PDF · $9"}
                        </p>
                        <strong>
                          {state.keepsake?.paid
                            ? "Download your keepsake"
                            : "Preview the print"}{" "}
                          <span aria-hidden="true">↗</span>
                        </strong>
                      </div>
                    </a>
                  )}
                  <button
                    className="studio-button studio-button-main"
                    form="gift-message-form"
                    disabled={busy}
                  >
                    {busy ? "Saving..." : "Continue to sharing"}
                    <StudioIcon name="arrow" size={18} />
                  </button>
                  {savedMessage && <p role="status">Your note is saved.</p>}
                </section>
              )}
              {currentStep === "share" && (
                <section className="workbench-panel">
                  <span className="studio-kicker">03 / GIVE YOUR GIFT</span>
                  <h2>Your gift is ready.</h2>
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
                  <Link
                    className="studio-button studio-button-main"
                    href={previewPath}
                  >
                    Open their gift page
                    <StudioIcon name="arrow" size={18} />
                  </Link>
                  <GiftShare
                    giftPath={
                      demonstration
                        ? "/studio-preview/gift"
                        : `/gift/${id}?key=${state.giftToken}`
                    }
                    recipient={state.recipientName}
                    onShareAction={() =>
                      void action("/api/song-gift", { shared: true })
                    }
                  />
                  {(state.giftSharedAt || state.giftGivenAt) && (
                    <p className="gift-followup">
                      After they listen,{" "}
                      <a href="#after-the-gift">share a reaction or feedback</a>
                      .
                    </p>
                  )}
                  <div className="given-gift">
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
                        : "I’ve sent the gift"}
                    </button>
                  </div>
                </section>
              )}
            </div>
          </div>
          {!previewOnly &&
            currentStep === "listen" &&
            originals.some((j) => j.status === "complete") && (
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
      {(state.giftSharedAt || state.giftGivenAt) && !previewOnly && (
        <section className="after-gifting" id="after-the-gift">
          <div className="after-gifting-intro">
            <span className="studio-kicker">AFTER THE GIFT</span>
            <h2>Reactions & feedback</h2>
            <p>
              After they’ve listened, share their reaction or tell us how it
              went. You can return here from the top of your studio.
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
      {!demonstration && (
        <StudioAccess
          songId={id}
          accessKey={accessKey}
          emailEnabled={state.emailEnabled ?? false}
        />
      )}
    </div>
  );
}
