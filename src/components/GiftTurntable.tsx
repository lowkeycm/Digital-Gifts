"use client";
import { useId } from "react";

// The original gift player: one continuous tonearm above a grooved vinyl platter.
export function GiftTurntable({
  recipient,
  playing,
  onToggle,
}: {
  recipient: string;
  playing: boolean;
  onToggle: () => void;
}) {
  const armId = useId();
  return (
    <div className="turntable">
      <div className="turntable-plinth" />
      <span className="turntable-maker">YOUR SONG</span>
      <button
        className="gift-vinyl-button"
        type="button"
        aria-label={playing ? "Pause your song" : "Play your song"}
        onClick={onToggle}
      >
        <span className="gift-vinyl">
          <span className="vinyl-grooves" />
          <span className="vinyl-label">
            <small>YOUR SONG</small>
            <strong>{recipient}</strong>

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
          <circle
            cx="70"
            cy="60"
            r="28"
            fill={`url(#${armId}-pivot)`}
            stroke="#949987"
            strokeWidth="2"
          />
          <path
            d="M70 22 V387 Q70 414 54 437 L43 454"
            fill="none"
            stroke="#41483f"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M70 22 V387 Q70 414 54 437 L43 454"
            fill="none"
            stroke={`url(#${armId}-metal)`}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <rect
            x="50"
            y="8"
            width="40"
            height="32"
            rx="7"
            fill={`url(#${armId}-metal)`}
            stroke="#494e46"
            strokeWidth="2"
          />
          <path
            d="M55 15 H85 M55 22 H85 M55 29 H85"
            stroke="#5c6257"
            strokeWidth="1"
            opacity=".6"
          />
          <circle
            cx="70"
            cy="60"
            r="7"
            fill="#d2d0bb"
            stroke="#50574c"
            strokeWidth="3"
          />
          <g transform="translate(43 452) rotate(26)">
            <path
              d="M-15 -5 H15 L13 44 H-13 Z"
              fill={`url(#${armId}-metal)`}
              stroke="#555d55"
              strokeWidth="2"
            />
            <path
              d="M-7 4 V27 M0 4 V27 M7 4 V27"
              stroke="#3c4743"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M14 4 H31 V-13"
              fill="none"
              stroke="#d4d5c2"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="-10"
              y="37"
              width="20"
              height="21"
              rx="3"
              fill="#1e292c"
              stroke="#8c9387"
              strokeWidth="1.5"
            />
            <path d="M0 56 V65" stroke="#e2dfbd" strokeWidth="3" />
            <circle
              className="tonearm-stylus"
              cx="0"
              cy="65"
              r="2.5"
              fill="#e9d796"
            />
          </g>
        </svg>
      </div>
      <div className="turntable-light" aria-hidden="true" />
      <span className="turntable-speed">33⅓</span>
    </div>
  );
}
