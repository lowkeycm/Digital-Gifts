"use client";

import { useRef, useState } from "react";

const tracks = [
  { title: "Ebony, I Love You", file: "ebony-i-love-you", duration: "4:05" },
  { title: "The Way I See You", file: "the-way-i-see-you", duration: "3:55" },
  { title: "Traci, My Rock", file: "traci-my-rock", duration: "4:30" },
];

export function SongSamples() {
  const players = useRef<(HTMLAudioElement | null)[]>([]);
  const [failed, setFailed] = useState<string[]>([]);

  return (
    <section id="samples" className="section shell sample-section" aria-labelledby="samples-heading">
      <div className="sample-intro">
        <span className="eyebrow">A little first listen</span>
        <h2 id="samples-heading">Some things sound<br /><em>better in a song.</em></h2>
        <p>Names. Memories. The things you mean but never quite say. Hear three examples of a story turned into music.</p>
        <span className="sample-caption">Three full songs · Listen all the way through</span>
      </div>
      <div className="sample-tracks">
        {tracks.map((track, index) => (
          <article className="sample-track" key={track.file}>
            <div className="sample-track-heading">
              <span className="track-number" aria-hidden="true">0{index + 1}</span>
              <h3 id={`track-${index}`}>{track.title}</h3>
              <span className="track-length">{track.duration}</span>
            </div>
            <audio
              ref={(element) => { players.current[index] = element; }}
              controls
              preload="none"
              aria-labelledby={`track-${index}`}
              src={`/audio/${track.file}.mp3`}
              onPlay={() => players.current.forEach((player, i) => { if (i !== index) player?.pause(); })}
              onError={() => setFailed((previous) => previous.includes(track.file) ? previous : [...previous, track.file])}
            />
            {failed.includes(track.file) && <p role="alert" className="sample-error">This player couldn’t load. <a href={`/audio/${track.file}.mp3`}>Open the sample directly</a>.</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
