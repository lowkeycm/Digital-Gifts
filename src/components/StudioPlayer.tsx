"use client";
import { useEffect, useRef, useState } from "react";
import { StudioIcon } from "./StudioIcon";

export type StudioTrack = {
  id: string;
  jobId: string;
  title: string;
  lyrics: string;
  duration: number | null;
};
const time = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function StudioPlayer({
  track,
  src,
  recipient,
  occasion,
  previewOnly,
  version,
  photoUrl,
  playRequest = 0,
}: {
  track: StudioTrack;
  src: string;
  recipient: string;
  occasion: string;
  previewOnly: boolean;
  version: number;
  photoUrl: string | null;
  playRequest?: number;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false),
    [elapsed, setElapsed] = useState(0),
    [duration, setDuration] = useState(track.duration ?? 0);
  const [volume, setVolume] = useState(1),
    [error, setError] = useState("");
  useEffect(() => {
    if (playRequest > 0) {
      void audio.current
        ?.play()
        .catch(() => setError("Tap play to start this melody."));
    }
  }, [playRequest]);
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
    <section
      className={`studio-player-room ${playing ? "is-playing" : ""}`}
      aria-label={`Listen to ${track.title}`}
    >
      <div className="room-topline">
        <span className="studio-kicker">THE LISTENING ROOM</span>
        <span className="room-status">
          <i />{" "}
          {playing
            ? "Now playing"
            : previewOnly
              ? "60-second preview"
              : "Ready to play"}
        </span>
      </div>
      <div className="album-stage" aria-hidden="true">
        <div className="album-shadow" />
        <div className="studio-vinyl">
          <div className="studio-record-label">
            <span>YOUR SONG</span>
            <strong>{String(version).padStart(2, "0")}</strong>
          </div>
        </div>
        <div className={`studio-album-sleeve ${photoUrl ? "has-photo" : ""}`}>
          {photoUrl && (
            <div
              className="sleeve-photo"
              style={{ backgroundImage: `url("${photoUrl}")` }}
            />
          )}
          <div className="sleeve-lines" />
          <span className="sleeve-imprint">
            YOUR SONG / PERSONAL COLLECTION
          </span>
          <div className="sleeve-dedication">
            <span>Made for</span>
            <strong>{recipient}</strong>
            <small>{occasion}</small>
          </div>
        </div>
      </div>
      <div className="room-track">
        <h2>{track.title}</h2>
      </div>
      <audio
        ref={audio}
        preload="metadata"
        src={src}
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
          setError("Your song couldn’t load. Refresh this page to try again.");
        }}
      />
      <div className="studio-transport">
        <button
          className="transport-play"
          onClick={() => void toggle()}
          aria-label={playing ? "Pause song" : "Play song"}
        >
          <StudioIcon name={playing ? "pause" : "play"} size={25} />
        </button>
        <div className="transport-progress">
          <label className="visually-hidden" htmlFor={`seek-${track.id}`}>
            Song position
          </label>
          <input
            id={`seek-${track.id}`}
            type="range"
            min={0}
            max={duration || 1}
            step="0.1"
            value={Math.min(elapsed, duration || 1)}
            onChange={(e) => {
              if (audio.current) {
                audio.current.currentTime = Number(e.target.value);
                setElapsed(Number(e.target.value));
              }
            }}
            style={
              {
                "--progress": `${duration ? (elapsed / duration) * 100 : 0}%`,
              } as React.CSSProperties
            }
          />
          <div className="transport-time">
            <span>{time(elapsed)}</span>
            <span>{time(duration)}</span>
          </div>
        </div>
        <div className="transport-volume">
          <StudioIcon name="volume" size={18} />
          <input
            type="range"
            aria-label="Volume"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => {
              const v = Number(e.target.value);
              setVolume(v);
              if (audio.current) audio.current.volume = v;
            }}
          />
        </div>
      </div>
      {error && (
        <p role="alert" className="player-error">
          {error}
        </p>
      )}
      {!previewOnly && (
        <div className="room-secondary">
          <a href={`${src}${src.includes("?") ? "&" : "?"}download=1`} download>
            <StudioIcon name="download" size={16} />
            Download MP3
          </a>
          {track.lyrics && (
            <details>
              <summary>Read lyrics</summary>
              <p className="song-lyrics">{track.lyrics}</p>
            </details>
          )}
        </div>
      )}
    </section>
  );
}
