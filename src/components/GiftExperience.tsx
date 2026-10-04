"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { giftTemplate, type GiftTemplate } from "@/lib/gift-templates";
import { StudioIcon } from "./StudioIcon";

export function GiftExperience({
  recipient,
  title,
  lyrics,
  audioUrl,
  photoUrl,
  message,
  template,
}: {
  recipient: string;
  occasion: string;
  title: string;
  lyrics: string;
  audioUrl: string;
  photoUrl: string | null;
  message?: string;
  template?: GiftTemplate;
}) {
  const layout = giftTemplate(template),
    audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false),
    [error, setError] = useState("");
  async function toggle() {
    if (!audio.current) return;
    if (!audio.current.paused) {
      audio.current.pause();
      return;
    }
    try {
      setError("");
      await audio.current.play();
    } catch {
      setError("Tap the audio player below to start your song.");
    }
  }
  return (
    <div
      className={`gift-page gift-page--${layout} ${photoUrl ? "with-photo" : "without-photo"}`}
    >
      <main id="main-content" className="gift-composition">
        <div className="gift-address">
          <h1>
            For <span>{recipient}</span>
          </h1>
        </div>
        <div className="gift-artwork">
          {photoUrl && (
            <a
              className="gift-photo"
              href={photoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the full gift photo"
            >
              <Image
                src={photoUrl}
                alt={`A photo chosen for ${recipient}`}
                width={900}
                height={1000}
                unoptimized
              />
            </a>
          )}
          {(layout === "record" || !photoUrl) && (
            <button
              className={`gift-record ${playing ? "is-playing" : ""}`}
              aria-label={playing ? "Pause your song" : "Play your song"}
              onClick={() => void toggle()}
            >
              <span className="gift-record-disc">
                <span className="gift-record-center">
                  <small>YOUR SONG</small>
                  <strong>{recipient}</strong>
                  <i />
                </span>
              </span>
              <span className="gift-record-control">
                <StudioIcon name={playing ? "pause" : "play"} size={24} />
              </span>
            </button>
          )}
        </div>
        <div className="gift-content">
          {message && (
            <div className="gift-note">
              <p>{message}</p>
            </div>
          )}
          <section className="gift-song" aria-label="Your song player">
            <h2>{title}</h2>
            <audio
              ref={audio}
              controls
              preload="metadata"
              src={audioUrl}
              onPlay={(e) => {
                document.querySelectorAll("audio").forEach((a) => {
                  if (a !== e.currentTarget) a.pause();
                });
                setPlaying(true);
              }}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onError={() => {
                setPlaying(false);
                setError(
                  "The song could not load. Refresh or try the MP3 download.",
                );
              }}
            />
            <div className="gift-song-actions">
              <a
                href={`${audioUrl}${audioUrl.includes("?") ? "&" : "?"}download=1`}
                download
              >
                <StudioIcon name="download" size={15} />
                Download MP3
              </a>
              {lyrics && (
                <details>
                  <summary>Read lyrics</summary>
                  <p className="song-lyrics">{lyrics}</p>
                </details>
              )}
            </div>
            {error && <p role="alert">{error}</p>}
          </section>
        </div>
      </main>
      <footer className="gift-page-footer">
        <Link href="/">The Gift Smith</Link>
      </footer>
    </div>
  );
}
