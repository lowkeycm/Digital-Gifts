"use client";
import { useRef, useState } from "react";
import { giftTheme } from "@/lib/gift-themes";
import { GiftBrand } from "./GiftBrand";
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
        <GiftBrand />
        <span>A gift with you in it.</span>
      </header>
      <main id="main-content" className="gift-world-main">
        <section className="gift-listening-room">
          <div className="gift-dedication">
            <span className="gift-occasion">{theme.label}</span>
            <h1>
              For <em>{recipient}.</em>
            </h1>
            <p>{theme.note}</p>
            <div className="gift-handwritten">
              Made from the little things
              <br />
              that mean everything.
            </div>
          </div>
          <div className={`gift-scene ${playing ? "is-playing" : ""}`}>
            <div className="gift-scene-light" />
            <div className={`gift-sleeve ${photoUrl ? "has-photo" : ""}`}>
              {photoUrl ? (
                <div
                  className="gift-cover-photo"
                  role="img"
                  aria-label={`A photo chosen for ${recipient}`}
                  style={{ backgroundImage: `url("${photoUrl}")` }}
                />
              ) : (
                <div className="gift-cover-art">
                  <span>
                    YOUR
                    <br />
                    SONG.
                  </span>
                  <div className="sleeve-orbit" />
                </div>
              )}
              <div className="sleeve-caption">
                <span>THE GIFT SMITH</span>
                <strong>{recipient}</strong>
                <span>ONE OF A KIND</span>
              </div>
            </div>
            <div className="turntable">
              <div className="turntable-plinth" />
              <span className="turntable-maker">
                THE GIFT SMITH <small>STORY PLAYER / 01</small>
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
                <i />
                <b />
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
          <a href="https://www.yourgiftsmith.com/your-song">
            Made with The Gift Smith
          </a>
        </footer>
      </main>
    </div>
  );
}
