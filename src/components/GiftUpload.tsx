"use client";
import { useEffect, useRef, useState } from "react";
import type { Upload } from "tus-js-client";
type Prepared = {
  assetId: string;
  path: string;
  bucket: string;
  token: string;
  endpoint: string;
  ready: boolean;
};
export function GiftUpload({
  songId,
  accessKey,
  kind,
  assetId,
  onSaved,
}: {
  songId: string;
  accessKey: string;
  kind: "photo" | "reaction";
  assetId: string | null;
  onSaved: () => Promise<void>;
}) {
  const [file, setFile] = useState<File | null>(null),
    [consent, setConsent] = useState(false),
    [phase, setPhase] = useState("idle"),
    [progress, setProgress] = useState(0),
    [error, setError] = useState("");
  const requestId = useRef(""),
    prepared = useRef<Prepared | null>(null),
    uploaded = useRef(false),
    active = useRef<Upload | null>(null);
  const busy = ["preparing", "uploading", "saving"].includes(phase),
    photo = kind === "photo";
  useEffect(
    () => () => {
      void active.current?.abort();
    },
    [],
  );
  async function post(body: Record<string, unknown>) {
    const r = await fetch("/api/song-uploads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songId, accessToken: accessKey, ...body }),
    });
    const b = await r.json();
    if (!r.ok) throw new Error(b.error || "We could not save the upload.");
    return b;
  }
  async function upload() {
    if (!file || !consent || busy) return;
    setError("");
    try {
      setPhase("preparing");
      if (!prepared.current)
        prepared.current = await post({
          action: "prepare",
          requestId: requestId.current,
          kind,
          mime: file.type,
          size: file.size,
          consent,
        });
      const p = prepared.current!;
      if (!uploaded.current && !p.ready) {
        setPhase("uploading");
        const { Upload } = await import("tus-js-client");
        await new Promise<void>((resolve, reject) => {
          const task = new Upload(file, {
            endpoint: p.endpoint,
            headers: { "x-signature": p.token },
            metadata: {
              bucketName: p.bucket,
              objectName: p.path,
              contentType: file.type,
              cacheControl: "3600",
            },
            chunkSize: 6 * 1024 * 1024,
            retryDelays: [0, 2000, 5000, 10000],
            uploadDataDuringCreation: true,
            removeFingerprintOnSuccess: true,
            onProgress: (sent, total) =>
              setProgress(Math.round((sent / total) * 100)),
            onError: (failure) => {
              // Never log signed URLs, request headers or upload tokens.
              const status = failure.originalResponse?.getStatus() ?? 0;
              const stage = failure.originalRequest ? "transfer" : "file-read";
              console.warn("gift_upload_failed", {
                status,
                stage,
                reason: failure.message.split(", originated from request")[0].replace(/https?:\/\/\S+/g, "[redacted]").slice(0, 250),
              });
              reject(new Error("Upload interrupted. Keep this page open and try again."));
            },
            onSuccess: () => resolve(),
          });
          active.current = task;
          void task
            .findPreviousUploads()
            .then((previous) => {
              if (previous.length) task.resumeFromPreviousUpload(previous[0]);
              task.start();
            })
            .catch(reject);
        });
        uploaded.current = true;
      }
      setPhase("saving");
      await post({ action: "complete", assetId: p.assetId });
      await onSaved();
      setPhase("done");
      setFile(null);
      setConsent(false);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Upload failed. Please try again.",
      );
      setPhase("error");
    }
  }
  const src = assetId
    ? `/api/songs/${songId}/media?key=${accessKey}&asset=${assetId}`
    : null;
  return (
    <section
      className="gift-upload"
      aria-label={photo ? "Gift photo upload" : "Reaction video upload"}
    >
      <div className="upload-heading">
        <span className="eyebrow">
          {photo ? "The finishing touch" : "The moment they heard it"}
        </span>
        <h3>
          {photo ? "Put a memory on the cover." : "Upload their reaction."}
        </h3>
      </div>
      <p>
        {photo
          ? "Add a favorite photo. It will appear on the recipient’s gift page."
          : "Choose a video from your phone or computer. Only you and our team can see the upload."}
      </p>
      {src &&
        (photo ? (
          <div
            className="uploaded-photo"
            style={{ backgroundImage: `url("${src}")` }}
            role="img"
            aria-label="Your uploaded gift photo"
          />
        ) : (
          <video
            className="reaction-preview"
            controls
            preload="metadata"
            src={src}
          />
        ))}
      {!photo && src && (
        <a className="quiet-link" href={`${src}&download=1`}>
          Download uploaded video
        </a>
      )}
      <label className="upload-picker">
        <span>
          {assetId
            ? photo
              ? "Choose a different photo"
              : "Choose a different video"
            : photo
              ? "Choose a photo"
              : "Choose a video"}
        </span>
        <input
          type="file"
          aria-label={photo ? "Gift photo" : "Reaction video"}
          accept={
            photo
              ? "image/jpeg,image/png,image/webp"
              : "video/mp4,video/quicktime,video/webm"
          }
          disabled={busy}
          onChange={(e) => {
            const f = e.target.files?.[0];
            setError("");
            setPhase("idle");
            setFile(null);
            prepared.current = null;
            uploaded.current = false;
            setProgress(0);
            requestId.current = crypto.randomUUID();
            if (!f) return;
            const types = photo
              ? ["image/jpeg", "image/png", "image/webp"]
              : ["video/mp4", "video/quicktime", "video/webm"];
            if (
              !types.includes(f.type) ||
              f.size > (photo ? 8 : 50) * 1024 * 1024 ||
              !f.size
            ) {
              setError(
                photo
                  ? "Choose a JPG, PNG or WebP photo up to 8 MB."
                  : "Choose an MP4, MOV or WebM video up to 50 MB.",
              );
              return;
            }
            setFile(f);
          }}
        />
      </label>
      <p className="help">
        {photo
          ? "JPG, PNG or WebP · up to 8 MB."
          : "MP4, MOV or WebM · up to 50 MB. Short clips work best. Some MOV files may need to be downloaded to play."}
      </p>
      {file && (
        <>
          <p className="upload-filename">
            {file.name} · {(file.size / 1048576).toFixed(1)} MB
          </p>
          <label className="beta-consent">
            <input
              type="checkbox"
              checked={consent}
              disabled={busy}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>
              {photo
                ? "I have permission to use this photo on the gift page."
                : "I have permission from the people in this video to upload it for private review. This does not give permission to publish it."}
            </span>
          </label>
          <button
            type="button"
            className="pill primary"
            disabled={!consent || busy}
            onClick={() => void upload()}
          >
            {busy
              ? phase === "uploading"
                ? `Uploading ${progress}%`
                : phase === "saving"
                  ? "Saving your upload..."
                  : "Preparing upload..."
              : phase === "error"
                ? "Try upload again"
                : photo
                  ? "Save gift photo"
                  : "Upload reaction video"}
          </button>
        </>
      )}
      {busy && (
        <progress
          value={
            phase === "uploading" ? progress : phase === "saving" ? 100 : 0
          }
          max={100}
          aria-label="Upload progress"
        />
      )}
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      {phase === "done" && (
        <p role="status">
          {photo
            ? "Photo saved to your gift page."
            : "Video saved for private review. Thank you for sharing the moment."}
        </p>
      )}
    </section>
  );
}
