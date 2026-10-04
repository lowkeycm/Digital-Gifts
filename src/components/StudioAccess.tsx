"use client";
import { useEffect, useState } from "react";
import { StudioIcon } from "./StudioIcon";
export function StudioAccess({
  songId,
  accessKey,
  emailEnabled,
}: {
  songId: string;
  accessKey: string;
  emailEnabled: boolean;
}) {
  const [saved, setSaved] = useState(false),
    [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false);
  useEffect(() => {
    let active = true;
    void fetch("/api/my-songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songId, accessToken: accessKey }),
    })
      .then((r) => {
        if (active) setSaved(r.ok);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [songId, accessKey]);
  function saveLink() {
    const link = new URL(`/song/${songId}`, location.origin);
    link.searchParams.set("key", accessKey);
    const a = document.createElement("a");
    const url = URL.createObjectURL(
      new Blob(
        [
          `YOUR SONG\nYour private studio\n\n${link}\n\nKeep this link private. It opens your songs and editing tools. Use the gift link inside your studio to share with the recipient.\n`,
        ],
        { type: "text/plain" },
      ),
    );
    a.href = url;
    a.download = "Your-Song-Private-Access.txt";
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Private access file downloaded. Keep it somewhere safe.");
  }
  return (
    <div className="studio-access">
      <div>
        <StudioIcon name="music" size={19} />
        <span>
          <strong>Your studio, whenever you need it.</strong>
          <small>
            {saved
              ? "Saved in My songs on this browser."
              : "Keep your private link so you can return."}
          </small>
        </span>
      </div>
      <div className="access-actions">
        {emailEnabled && (
          <button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              setStatus("");
              try {
                const r = await fetch("/api/my-songs/access", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ songId, accessToken: accessKey }),
                });
                const b = await r.json();
                setStatus(
                  r.ok
                    ? "A private sign-in link is on its way to the email used for this song."
                    : b.error,
                );
              } catch {
                setStatus("Email couldn’t send. Save your private link below.");
              } finally {
                setBusy(false);
              }
            }}
          >
            Email me access
          </button>
        )}
        <button onClick={saveLink}>Save private access</button>
      </div>
      {status && <p role="status">{status}</p>}
    </div>
  );
}
