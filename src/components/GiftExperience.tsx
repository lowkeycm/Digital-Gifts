"use client";
import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { giftTheme } from "@/lib/gift-themes";
import { YourSongBrand } from "./YourSongBrand";
export function GiftExperience({
  recipient,
  occasion,
  title,
  lyrics,
  audioUrl,
  photoUrl,
}: {
  recipient: string;
  occasion: string;
  title: string;
  lyrics: string;
  audioUrl: string;
  photoUrl: string | null;
}) {
  const armId = useId();
  const theme = giftTheme(occasion),
    audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false),
    [error, setError] = useState("");
  async function toggle() {
    const player = audio.current;
    if (!player) return;
    if (player.paused) {
      try {
        setError("");
        await player.play();
      } catch {
        setError("Tap the audio player below to start your song.");
      }
    } else player.pause();
  }
  return (
    <div className={`gift-world gift-world--${theme.id}`}>
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
      <header className="gift-world-header">
        <YourSongBrand />
        <span>A gift with you in it.</span>
      </header>
      <main id="main-content" className="gift-world-main">
        <section className={`gift-listening-room ${photoUrl ? "has-memory" : ""}`}>
          <div className="gift-dedication">
            <span className="gift-occasion">{theme.label}</span>
            <h1>
              For <em>{recipient}.</em>
            </h1>
            <p>{theme.note}</p>
            {photoUrl ? (
              <a className="gift-memory" href={photoUrl} target="_blank" rel="noopener noreferrer" aria-label="Open the full gift photo">
                <Image src={photoUrl} alt={`A photo chosen for ${recipient}`} width={640} height={640} unoptimized />
                <span>A memory worth keeping. <small>Open photo ↗</small></span>
              </a>
            ) : (
              <div className="gift-handwritten">
                Made from the little things
                <br />
                that mean everything.
              </div>
            )}
          </div>
          <div className={`gift-scene ${playing ? "is-playing" : ""}`}>
            <div className="gift-scene-light" />
            {!photoUrl && (
              <div className="gift-sleeve">
                <div className="gift-cover-art">
                  <span>YOUR<br />SONG.</span>
                  <div className="sleeve-orbit" />
                </div>
                <div className="sleeve-caption">
                  <span>YOUR SONG</span>
                  <strong>{recipient}</strong>
                  <span>ONE OF A KIND</span>
                </div>
              </div>
            )}
            <div className="turntable">
              <div className="turntable-plinth" />
              <span className="turntable-maker">
                YOUR SONG <small>STORY PLAYER / 01</small>
              </span>
              <button
                className="gift-vinyl-button"
                type="button"
                aria-label={playing ? "Pause your song" : "Play your song"}
                onClick={() => void toggle()}
              >
                <span className="gift-vinyl">
                  <span className="vinyl-grooves" />
                  <span className="vinyl-label">
                    <small>A SONG FOR</small>
                    <strong>{recipient}</strong>
                    <small>YOUR STORY · YOUR SONG</small>
                    <i />
                  </span>
                </span>
                <span className="vinyl-glint" />
                <span className="record-action" aria-hidden="true">
                  {playing ? "Ⅱ" : "▶"}
                </span>
              </button>
              <div className="tonearm" aria-hidden="true">
                <svg viewBox="0 0 140 560" className="tonearm-assembly">
                  <defs>
                    <linearGradient id={`${armId}-metal`} x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0" stopColor="#555750" />
                      <stop offset=".3" stopColor="#c6c7b5" />
                      <stop offset=".55" stopColor="#f3efdb" />
                      <stop offset=".8" stopColor="#a2a38f" />
                      <stop offset="1" stopColor="#54594f" />
                    </linearGradient>
                    <radialGradient id={`${armId}-pivot`}>
                      <stop offset="0" stopColor="#e3dfcc" />
                      <stop offset=".35" stopColor="#8d9282" />
                      <stop offset=".65" stopColor="#4d554b" />
                      <stop offset="1" stopColor="#161e1d" />
                    </radialGradient>
                  </defs>
                  {/* One continuous arm, with its rotation pinned to the bearing. */}
                  <circle cx="70" cy="60" r="33" fill="#111b1d" />
                  <circle cx="70" cy="60" r="28" fill={`url(#${armId}-pivot)`} stroke="#949987" strokeWidth="2" />
                  <path d="M70 22 V387 Q70 414 54 437 L43 454" fill="none" stroke="#41483f" strokeWidth="14" strokeLinecap="round" />
                  <path d="M70 22 V387 Q70 414 54 437 L43 454" fill="none" stroke={`url(#${armId}-metal)`} strokeWidth="10" strokeLinecap="round" />
                  <rect x="50" y="8" width="40" height="32" rx="7" fill={`url(#${armId}-metal)`} stroke="#494e46" strokeWidth="2" />
                  <path d="M55 15 H85 M55 22 H85 M55 29 H85" stroke="#5c6257" strokeWidth="1" opacity=".6" />
                  <circle cx="70" cy="60" r="7" fill="#d2d0bb" stroke="#50574c" strokeWidth="3" />
                  <g transform="translate(43 452) rotate(26)">
                    <path d="M-15 -5 H15 L13 44 H-13 Z" fill={`url(#${armId}-metal)`} stroke="#555d55" strokeWidth="2" />
                    <path d="M-7 4 V27 M0 4 V27 M7 4 V27" stroke="#3c4743" strokeWidth="3" strokeLinecap="round" />
                    <path d="M14 4 H31 V-13" fill="none" stroke="#d4d5c2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="-10" y="37" width="20" height="21" rx="3" fill="#1e292c" stroke="#8c9387" strokeWidth="1.5" />
                    <path d="M0 56 V65" stroke="#e2dfbd" strokeWidth="3" />
                    <circle className="tonearm-stylus" cx="0" cy="65" r="2.5" fill="#e9d796" />
                  </g>
                </svg>
              </div>
              <div className="turntable-light" aria-hidden="true" />
              <span className="turntable-speed">33⅓</span>
            </div>
            <p className="gift-scene-caption">
              {playing
                ? "A moment, just for you."
                : "Press play. This one is yours."}
            </p>
          </div>
        </section>
        <section className="gift-track-card" aria-label="Your song player">
          <div>
            <span className="eyebrow">Your song</span>
            <h2>{title}</h2>
            <p>Made from a story only you could recognize.</p>
          </div>
          <div className="gift-player-controls">
            <audio
              ref={audio}
              controls
              preload="metadata"
              src={audioUrl}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onError={() => {
                setPlaying(false);
                setError(
                  "The song could not load. Refresh this page or try the MP3 download.",
                );
              }}
            />
            <div className="gift-player-links">
              <a href={`${audioUrl}&download=1`}>
                Keep the MP3 <span aria-hidden="true">↓</span>
              </a>
              <span>Yours to listen to, again and again.</span>
            </div>
            {error && <p role="alert">{error}</p>}
          </div>
        </section>
        {lyrics && (
          <details className="gift-lyrics">
            <summary>
              The words, just for you <span aria-hidden="true">+</span>
            </summary>
            <p className="song-lyrics">{lyrics}</p>
          </details>
        )}
        <footer className="gift-world-footer">
          <span>A real story. A very personal gift.</span>
          <Link href="/">
            Your Song by The Gift Smith
          </Link>
        </footer>
      </main>
    </div>
  );
}
