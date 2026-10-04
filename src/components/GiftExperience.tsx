"use client";
import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { giftTemplate, type GiftTemplate } from "@/lib/gift-templates";
import { giftTheme } from "@/lib/gift-themes";
import { GiftTurntable } from "./GiftTurntable";
import { StudioIcon } from "./StudioIcon";

const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

export function GiftExperience({
  recipient,
  occasion,
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
    theme = giftTheme(occasion);
  const audio = useRef<HTMLAudioElement>(null),
    seekId = useId();
  const [playing, setPlaying] = useState(false),
    [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0),
    [duration, setDuration] = useState(0);
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
      setError("Your song couldn’t play. Tap play to try again.");
    }
  }
  return (
    <div
      className={`gift-world gift-world--${theme.id} gift-page gift-page--${layout} ${photoUrl ? "with-photo" : "without-photo"}`}
    >
      <div
        className={`gift-scenery scenery--${theme.motif}`}
        aria-hidden="true"
      >
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <svg viewBox="0 0 500 800" className="gift-branch">
          <path d="M60 810 Q320 410 200 20 M170 610 Q20 520 70 430 Q190 450 170 610 M230 470 Q410 440 390 310 Q250 310 230 470 M235 310 Q100 230 140 120 Q250 150 235 310 M220 170 Q360 130 310 30 Q220 60 220 170" />
        </svg>
      </div>
      <main id="main-content" className="gift-world-main gift-composition">
        <section className="gift-listening-room">
          <div className="gift-dedication">
            <div className="gift-address">
              <h1>
                For <em>{recipient}</em>
              </h1>
            </div>
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
            {message && (
              <div className="gift-note">
                <p>{message}</p>
              </div>
            )}
          </div>
          <div className={`gift-scene ${playing ? "is-playing" : ""}`}>
            <div className="gift-scene-light" aria-hidden="true" />
            <div className="gift-sleeve" aria-hidden="true">
              <div className="gift-cover-art">
                <span>{title}</span>
                <div className="sleeve-orbit" />
              </div>
              <div className="sleeve-caption">
                <span>YOUR SONG</span>
                <strong>{recipient}</strong>
              </div>
            </div>
            <GiftTurntable
              recipient={recipient}
              playing={playing}
              onToggle={() => void toggle()}
            />
          </div>
        </section>
        <section
          className="gift-track-card gift-song"
          aria-label="Your song player"
        >
          <h2>{title}</h2>
          <div className="gift-player-controls">
            <audio
              ref={audio}
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
              onTimeUpdate={(e) => setElapsed(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => {
                if (Number.isFinite(e.currentTarget.duration))
                  setDuration(e.currentTarget.duration);
              }}
              onError={() => {
                setPlaying(false);
                setError(
                  "The song could not load. Refresh or try the MP3 download.",
                );
              }}
            />
            <div className="gift-transport">
              <button
                className="gift-transport-play"
                aria-label={playing ? "Pause song" : "Play song"}
                onClick={() => void toggle()}
              >
                <StudioIcon name={playing ? "pause" : "play"} size={22} />
              </button>
              <div className="gift-progress">
                <label className="visually-hidden" htmlFor={seekId}>
                  Song position
                </label>
                <input
                  id={seekId}
                  type="range"
                  min={0}
                  max={duration || 1}
                  step="0.1"
                  value={Math.min(elapsed, duration || 1)}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (audio.current && duration) {
                      audio.current.currentTime = value;
                      setElapsed(value);
                    }
                  }}
                  style={
                    {
                      "--progress": `${duration ? (elapsed / duration) * 100 : 0}%`,
                    } as React.CSSProperties
                  }
                />
                <div className="gift-time">
                  <span>{clock(elapsed)}</span>
                  <span>{clock(duration)}</span>
                </div>
              </div>
            </div>
            {error && <p role="alert">{error}</p>}
          </div>
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
        </section>
        <footer className="gift-page-footer">
          <Link href="/">
            Your Song <span>by The Gift Smith</span>
          </Link>
        </footer>
      </main>
    </div>
  );
}
