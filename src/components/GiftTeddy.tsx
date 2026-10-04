"use client";
import type { CSSProperties } from "react";

export function GiftTeddy({
  recipient,
  playing,
  onToggle,
}: {
  recipient: string;
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="gift-teddy gift-object"
      onClick={onToggle}
      aria-label={
        playing ? "Pause the teddy bear’s song" : "Play the teddy bear’s song"
      }
    >
      <span className="teddy-body" aria-hidden="true" />
      <span className="teddy-arm" aria-hidden="true" />
      <span
        className="teddy-name"
        aria-hidden="true"
        style={
          {
            "--name-scale": Math.min(1, Math.pow(14 / recipient.length, 0.8)),
          } as CSSProperties
        }
      >
        {recipient}
      </span>
    </button>
  );
}
