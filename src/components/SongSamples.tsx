"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const tracks = [
  { title: "Ebony, I Love You", relationship: "Brother to Sister", cover: "brother-to-sister", file: "ebony-i-love-you", duration: "4:05" },
  { title: "The Way I See You", relationship: "Son to Mother", cover: "son-to-mother", file: "the-way-i-see-you", duration: "3:55" },
  { title: "Traci, My Rock", relationship: "Husband to Wife", cover: "husband-to-wife", file: "traci-my-rock", duration: "4:30" },
];

export function SongSamples() {
  const rail = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const players = useRef<(HTMLAudioElement | null)[]>([]);
  const drag = useRef({ down: false, x: 0, scroll: 0, moved: false });
  const [active, setActive] = useState(1);
  const [playing, setPlaying] = useState<number | null>(null);
  const [failed, setFailed] = useState<string[]>([]);

  function select(index: number, smooth = true) {
    const node = rail.current;
    const card = cards.current[index];
    if (!node || !card) return;
    node.scrollTo({
      left: card.offsetLeft - (node.clientWidth - card.offsetWidth) / 2,
      behavior: smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant",
    });
  }

  function togglePlayback(index: number) {
    const player = players.current[index];
    if (!player) return;
    // Center immediately so scroll selection cannot pause the clicked track in transit.
    select(index, false);
    setActive(index);
    if (!player.paused) {
      player.pause();
      return;
    }
    players.current.forEach((other, i) => { if (i !== index) other?.pause(); });
    // Keep play inside the click gesture for mobile browser permission.
    void player.play().then(() => {
      setFailed((previous) => previous.filter((file) => file !== tracks[index].file));
    }).catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setFailed((previous) => previous.includes(tracks[index].file) ? previous : [...previous, tracks[index].file]);
    });
  }

  useEffect(() => {
    const node = rail.current;
    if (!node) return;
    let frame = 0;
    function update() {
      if (!node) return;
      const center = node.scrollLeft + node.clientWidth / 2;
      let nearest = 0;
      let distance = Infinity;
      cards.current.forEach((card, index) => {
        if (!card) return;
        const offset = (card.offsetLeft + card.offsetWidth / 2 - center) / card.offsetWidth;
        const depth = Math.min(Math.abs(offset), 1.5);
        card.style.setProperty("--turn", `${Math.max(-1, Math.min(1, offset)) * -32}deg`);
        card.style.setProperty("--scale", `${1 - depth * 0.12}`);
        card.style.setProperty("--depth", `${-depth * 75}px`);
        if (Math.abs(offset) < distance) { nearest = index; distance = Math.abs(offset); }
      });
      setActive(nearest);
    }
    function onScroll() { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); }
    const observer = new ResizeObserver(onScroll);
    observer.observe(node);
    node.addEventListener("scroll", onScroll, { passive: true });
    select(1, false);
    update();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); node.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    players.current.forEach((player, index) => { if (index !== active) player?.pause(); });
  }, [active]);

  return (
    <section id="samples" className="section shell sample-section" aria-labelledby="samples-heading">
      <div className="sample-intro">
        <div>
          <span className="eyebrow">Stories on repeat</span>
          <h2 id="samples-heading">Some things sound<br /><em>better in a song.</em></h2>
        </div>
        <div className="sample-intro-copy">
          <p>For your sister. Your mother. Your person. Pick a story and hear what a personal song can feel like.</p>
          <span className="sample-caption">Three full songs · Yours to listen to</span>
        </div>
      </div>
      <div className="listening-room" role="region" aria-roledescription="carousel" aria-label="Full song collection">
        <div className="listening-room-top"><span>The listening room</span><span>YOUR SONG / VOL. 01</span></div>
        <div
          ref={rail}
          className="album-rail"
          tabIndex={0}
          aria-label="Browse songs. Swipe, drag, or use the left and right arrow keys."
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault(); select(Math.max(0, Math.min(tracks.length - 1, active + (event.key === "ArrowRight" ? 1 : -1))));
            } else if (event.key === "Home" || event.key === "End") { event.preventDefault(); select(event.key === "Home" ? 0 : tracks.length - 1); }
          }}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse" || event.button !== 0) return;
            drag.current = { down: true, x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
          }}
          onPointerMove={(event) => {
            if (!drag.current.down) return;
            const delta = event.clientX - drag.current.x;
            if (Math.abs(delta) > 6) {
              drag.current.moved = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              event.currentTarget.dataset.dragging = "true";
              event.currentTarget.scrollLeft = drag.current.scroll - delta;
            }
          }}
          onPointerUp={(event) => {
            if (!drag.current.down) return;
            drag.current.down = false;
            delete event.currentTarget.dataset.dragging;
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            if (drag.current.moved) select(active);
          }}
          onPointerCancel={(event) => { drag.current.down = false; delete event.currentTarget.dataset.dragging; }}
          onClickCapture={(event) => { if (drag.current.moved) { event.preventDefault(); event.stopPropagation(); drag.current.moved = false; } }}
        >
          {tracks.map((track, index) => (
            <button
              type="button" key={track.file} ref={(node) => { cards.current[index] = node; }}
              className="album-card" aria-label={`${playing === index ? "Pause" : "Play"} ${track.title}, ${track.relationship}`}
              data-selected={active === index} onClick={() => togglePlayback(index)}
              onFocus={() => select(index)}
            >
              <span className="album-sleeve">
                <Image src={`/images/album-${track.cover}.webp`} alt="" width={800} height={800} sizes="(max-width: 760px) 260px, 340px" draggable={false} />
                <span className="album-shade" />
                <span className="album-edition">YOUR SONG <span>0{index + 1}</span></span>
                <span className="album-cover-copy"><span>{track.relationship}</span><strong>{track.title}</strong></span>
                <span className="album-corner" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    {playing === index ? <path d="M6 4h4v16H6zm8 0h4v16h-4z" /> : <path d="M7 3.5v17L21 12z" />}
                  </svg>
                </span>
              </span>
              <span className="album-under"><strong>{track.relationship}</strong><span>Song 0{index + 1} · {track.duration}</span></span>
            </button>
          ))}
        </div>
        <div className="album-navigation">
          <button type="button" aria-label="Previous song" disabled={active === 0} onClick={() => select(active - 1)}>←</button>
          <span>Swipe or drag to explore <span aria-hidden="true">·</span> {active + 1} / {tracks.length}</span>
          <button type="button" aria-label="Next song" disabled={active === tracks.length - 1} onClick={() => select(active + 1)}>→</button>
        </div>
        <div className="album-player">
          <div className="album-now" aria-live="polite"><span>{playing === active ? "Now playing" : "Ready when you are"}</span><strong>{tracks[active].title}</strong><span>{tracks[active].relationship}</span></div>
          <div className="album-controls">
            {tracks.map((track, index) => (
              <div key={track.file} hidden={active !== index}>
                <audio ref={(node) => { players.current[index] = node; }} controls preload="none"
                  aria-label={`Listen to ${track.title}, ${track.relationship}`} src={`/audio/${track.file}.mp3`}
                  onPlay={() => { setPlaying(index); players.current.forEach((player, i) => { if (i !== index) player?.pause(); }); }}
                  onPause={() => setPlaying((current) => current === index ? null : current)}
                  onEnded={() => setPlaying(null)}
                  onError={() => setFailed((previous) => previous.includes(track.file) ? previous : [...previous, track.file])}
                />
                {failed.includes(track.file) && <p role="alert" className="sample-error">This player couldn’t load. <a href={`/audio/${track.file}.mp3`}>Open the full song</a>.</p>}
              </div>
            ))}
            <span className="album-full">Full song · {tracks[active].duration} · No signup needed</span>
          </div>
        </div>
        <p className="album-art-note">Illustrative cover art. Full-length song examples.</p>
      </div>
    </section>
  );
}
